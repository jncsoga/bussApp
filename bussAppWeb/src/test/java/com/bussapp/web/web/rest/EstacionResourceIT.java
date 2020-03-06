package com.bussapp.web.web.rest;

import com.bussapp.web.BussAppWebApp;
import com.bussapp.web.domain.Estacion;
import com.bussapp.web.repository.EstacionRepository;
import com.bussapp.web.repository.search.EstacionSearchRepository;
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
import java.util.Collections;
import java.util.List;

import static com.bussapp.web.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EstacionResource} REST controller.
 */
@SpringBootTest(classes = BussAppWebApp.class)
public class EstacionResourceIT {

    private static final String DEFAULT_GEOLOCALIZACION = "AAAAAAAAAA";
    private static final String UPDATED_GEOLOCALIZACION = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private EstacionRepository estacionRepository;

    /**
     * This repository is mocked in the com.bussapp.web.repository.search test package.
     *
     * @see com.bussapp.web.repository.search.EstacionSearchRepositoryMockConfiguration
     */
    @Autowired
    private EstacionSearchRepository mockEstacionSearchRepository;

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

    private MockMvc restEstacionMockMvc;

    private Estacion estacion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstacionResource estacionResource = new EstacionResource(estacionRepository, mockEstacionSearchRepository);
        this.restEstacionMockMvc = MockMvcBuilders.standaloneSetup(estacionResource)
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
    public static Estacion createEntity(EntityManager em) {
        Estacion estacion = new Estacion()
            .geolocalizacion(DEFAULT_GEOLOCALIZACION)
            .nombre(DEFAULT_NOMBRE);
        return estacion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estacion createUpdatedEntity(EntityManager em) {
        Estacion estacion = new Estacion()
            .geolocalizacion(UPDATED_GEOLOCALIZACION)
            .nombre(UPDATED_NOMBRE);
        return estacion;
    }

    @BeforeEach
    public void initTest() {
        estacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstacion() throws Exception {
        int databaseSizeBeforeCreate = estacionRepository.findAll().size();

        // Create the Estacion
        restEstacionMockMvc.perform(post("/api/estacions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estacion)))
            .andExpect(status().isCreated());

        // Validate the Estacion in the database
        List<Estacion> estacionList = estacionRepository.findAll();
        assertThat(estacionList).hasSize(databaseSizeBeforeCreate + 1);
        Estacion testEstacion = estacionList.get(estacionList.size() - 1);
        assertThat(testEstacion.getGeolocalizacion()).isEqualTo(DEFAULT_GEOLOCALIZACION);
        assertThat(testEstacion.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the Estacion in Elasticsearch
        verify(mockEstacionSearchRepository, times(1)).save(testEstacion);
    }

    @Test
    @Transactional
    public void createEstacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estacionRepository.findAll().size();

        // Create the Estacion with an existing ID
        estacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstacionMockMvc.perform(post("/api/estacions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estacion)))
            .andExpect(status().isBadRequest());

        // Validate the Estacion in the database
        List<Estacion> estacionList = estacionRepository.findAll();
        assertThat(estacionList).hasSize(databaseSizeBeforeCreate);

        // Validate the Estacion in Elasticsearch
        verify(mockEstacionSearchRepository, times(0)).save(estacion);
    }


    @Test
    @Transactional
    public void getAllEstacions() throws Exception {
        // Initialize the database
        estacionRepository.saveAndFlush(estacion);

        // Get all the estacionList
        restEstacionMockMvc.perform(get("/api/estacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].geolocalizacion").value(hasItem(DEFAULT_GEOLOCALIZACION)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getEstacion() throws Exception {
        // Initialize the database
        estacionRepository.saveAndFlush(estacion);

        // Get the estacion
        restEstacionMockMvc.perform(get("/api/estacions/{id}", estacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estacion.getId().intValue()))
            .andExpect(jsonPath("$.geolocalizacion").value(DEFAULT_GEOLOCALIZACION))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingEstacion() throws Exception {
        // Get the estacion
        restEstacionMockMvc.perform(get("/api/estacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstacion() throws Exception {
        // Initialize the database
        estacionRepository.saveAndFlush(estacion);

        int databaseSizeBeforeUpdate = estacionRepository.findAll().size();

        // Update the estacion
        Estacion updatedEstacion = estacionRepository.findById(estacion.getId()).get();
        // Disconnect from session so that the updates on updatedEstacion are not directly saved in db
        em.detach(updatedEstacion);
        updatedEstacion
            .geolocalizacion(UPDATED_GEOLOCALIZACION)
            .nombre(UPDATED_NOMBRE);

        restEstacionMockMvc.perform(put("/api/estacions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstacion)))
            .andExpect(status().isOk());

        // Validate the Estacion in the database
        List<Estacion> estacionList = estacionRepository.findAll();
        assertThat(estacionList).hasSize(databaseSizeBeforeUpdate);
        Estacion testEstacion = estacionList.get(estacionList.size() - 1);
        assertThat(testEstacion.getGeolocalizacion()).isEqualTo(UPDATED_GEOLOCALIZACION);
        assertThat(testEstacion.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the Estacion in Elasticsearch
        verify(mockEstacionSearchRepository, times(1)).save(testEstacion);
    }

    @Test
    @Transactional
    public void updateNonExistingEstacion() throws Exception {
        int databaseSizeBeforeUpdate = estacionRepository.findAll().size();

        // Create the Estacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstacionMockMvc.perform(put("/api/estacions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estacion)))
            .andExpect(status().isBadRequest());

        // Validate the Estacion in the database
        List<Estacion> estacionList = estacionRepository.findAll();
        assertThat(estacionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Estacion in Elasticsearch
        verify(mockEstacionSearchRepository, times(0)).save(estacion);
    }

    @Test
    @Transactional
    public void deleteEstacion() throws Exception {
        // Initialize the database
        estacionRepository.saveAndFlush(estacion);

        int databaseSizeBeforeDelete = estacionRepository.findAll().size();

        // Delete the estacion
        restEstacionMockMvc.perform(delete("/api/estacions/{id}", estacion.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Estacion> estacionList = estacionRepository.findAll();
        assertThat(estacionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Estacion in Elasticsearch
        verify(mockEstacionSearchRepository, times(1)).deleteById(estacion.getId());
    }

    @Test
    @Transactional
    public void searchEstacion() throws Exception {
        // Initialize the database
        estacionRepository.saveAndFlush(estacion);
        when(mockEstacionSearchRepository.search(queryStringQuery("id:" + estacion.getId())))
            .thenReturn(Collections.singletonList(estacion));
        // Search the estacion
        restEstacionMockMvc.perform(get("/api/_search/estacions?query=id:" + estacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].geolocalizacion").value(hasItem(DEFAULT_GEOLOCALIZACION)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
}
