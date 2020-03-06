package com.bussapp.web.web.rest;

import com.bussapp.web.BussAppWebApp;
import com.bussapp.web.domain.Ruta;
import com.bussapp.web.repository.RutaRepository;
import com.bussapp.web.repository.search.RutaSearchRepository;
import com.bussapp.web.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import static com.bussapp.web.web.rest.TestUtil.sameInstant;
import static com.bussapp.web.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RutaResource} REST controller.
 */
@SpringBootTest(classes = BussAppWebApp.class)
public class RutaResourceIT {

    private static final Integer DEFAULT_LUGARES_DISPONIBLES = 1;
    private static final Integer UPDATED_LUGARES_DISPONIBLES = 2;

    private static final ZonedDateTime DEFAULT_INICIO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_INICIO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private RutaRepository rutaRepository;

    /**
     * This repository is mocked in the com.bussapp.web.repository.search test package.
     *
     * @see com.bussapp.web.repository.search.RutaSearchRepositoryMockConfiguration
     */
    @Autowired
    private RutaSearchRepository mockRutaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRutaMockMvc;

    private Ruta ruta;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RutaResource rutaResource = new RutaResource(rutaRepository, mockRutaSearchRepository);
        this.restRutaMockMvc = MockMvcBuilders.standaloneSetup(rutaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ruta createEntity(EntityManager em) {
        Ruta ruta = new Ruta()
            .lugaresDisponibles(DEFAULT_LUGARES_DISPONIBLES)
            .inicio(DEFAULT_INICIO);
        return ruta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ruta createUpdatedEntity(EntityManager em) {
        Ruta ruta = new Ruta()
            .lugaresDisponibles(UPDATED_LUGARES_DISPONIBLES)
            .inicio(UPDATED_INICIO);
        return ruta;
    }

    @BeforeEach
    public void initTest() {
        ruta = createEntity(em);
    }

    @Test
    @Transactional
    public void createRuta() throws Exception {
        int databaseSizeBeforeCreate = rutaRepository.findAll().size();

        // Create the Ruta
        restRutaMockMvc.perform(post("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ruta)))
            .andExpect(status().isCreated());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeCreate + 1);
        Ruta testRuta = rutaList.get(rutaList.size() - 1);
        assertThat(testRuta.getLugaresDisponibles()).isEqualTo(DEFAULT_LUGARES_DISPONIBLES);
        assertThat(testRuta.getInicio()).isEqualTo(DEFAULT_INICIO);

        // Validate the Ruta in Elasticsearch
        verify(mockRutaSearchRepository, times(1)).save(testRuta);
    }

    @Test
    @Transactional
    public void createRutaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rutaRepository.findAll().size();

        // Create the Ruta with an existing ID
        ruta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRutaMockMvc.perform(post("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ruta)))
            .andExpect(status().isBadRequest());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeCreate);

        // Validate the Ruta in Elasticsearch
        verify(mockRutaSearchRepository, times(0)).save(ruta);
    }


    @Test
    @Transactional
    public void getAllRutas() throws Exception {
        // Initialize the database
        rutaRepository.saveAndFlush(ruta);

        // Get all the rutaList
        restRutaMockMvc.perform(get("/api/rutas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ruta.getId().intValue())))
            .andExpect(jsonPath("$.[*].lugaresDisponibles").value(hasItem(DEFAULT_LUGARES_DISPONIBLES)))
            .andExpect(jsonPath("$.[*].inicio").value(hasItem(sameInstant(DEFAULT_INICIO))));
    }
    
    @Test
    @Transactional
    public void getRuta() throws Exception {
        // Initialize the database
        rutaRepository.saveAndFlush(ruta);

        // Get the ruta
        restRutaMockMvc.perform(get("/api/rutas/{id}", ruta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ruta.getId().intValue()))
            .andExpect(jsonPath("$.lugaresDisponibles").value(DEFAULT_LUGARES_DISPONIBLES))
            .andExpect(jsonPath("$.inicio").value(sameInstant(DEFAULT_INICIO)));
    }

    @Test
    @Transactional
    public void getNonExistingRuta() throws Exception {
        // Get the ruta
        restRutaMockMvc.perform(get("/api/rutas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRuta() throws Exception {
        // Initialize the database
        rutaRepository.saveAndFlush(ruta);

        int databaseSizeBeforeUpdate = rutaRepository.findAll().size();

        // Update the ruta
        Ruta updatedRuta = rutaRepository.findById(ruta.getId()).get();
        // Disconnect from session so that the updates on updatedRuta are not directly saved in db
        em.detach(updatedRuta);
        updatedRuta
            .lugaresDisponibles(UPDATED_LUGARES_DISPONIBLES)
            .inicio(UPDATED_INICIO);

        restRutaMockMvc.perform(put("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRuta)))
            .andExpect(status().isOk());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeUpdate);
        Ruta testRuta = rutaList.get(rutaList.size() - 1);
        assertThat(testRuta.getLugaresDisponibles()).isEqualTo(UPDATED_LUGARES_DISPONIBLES);
        assertThat(testRuta.getInicio()).isEqualTo(UPDATED_INICIO);

        // Validate the Ruta in Elasticsearch
        verify(mockRutaSearchRepository, times(1)).save(testRuta);
    }

    @Test
    @Transactional
    public void updateNonExistingRuta() throws Exception {
        int databaseSizeBeforeUpdate = rutaRepository.findAll().size();

        // Create the Ruta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRutaMockMvc.perform(put("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ruta)))
            .andExpect(status().isBadRequest());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Ruta in Elasticsearch
        verify(mockRutaSearchRepository, times(0)).save(ruta);
    }

    @Test
    @Transactional
    public void deleteRuta() throws Exception {
        // Initialize the database
        rutaRepository.saveAndFlush(ruta);

        int databaseSizeBeforeDelete = rutaRepository.findAll().size();

        // Delete the ruta
        restRutaMockMvc.perform(delete("/api/rutas/{id}", ruta.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Ruta in Elasticsearch
        verify(mockRutaSearchRepository, times(1)).deleteById(ruta.getId());
    }

    @Test
    @Transactional
    public void searchRuta() throws Exception {
        // Initialize the database
        rutaRepository.saveAndFlush(ruta);
        when(mockRutaSearchRepository.search(queryStringQuery("id:" + ruta.getId())))
            .thenReturn(Collections.singletonList(ruta));
        // Search the ruta
        restRutaMockMvc.perform(get("/api/_search/rutas?query=id:" + ruta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ruta.getId().intValue())))
            .andExpect(jsonPath("$.[*].lugaresDisponibles").value(hasItem(DEFAULT_LUGARES_DISPONIBLES)))
            .andExpect(jsonPath("$.[*].inicio").value(hasItem(sameInstant(DEFAULT_INICIO))));
    }
}
