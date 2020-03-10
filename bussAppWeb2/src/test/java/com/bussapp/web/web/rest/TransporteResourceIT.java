package com.bussapp.web.web.rest;

import com.bussapp.web.BussAppWeb2App;
import com.bussapp.web.domain.Transporte;
import com.bussapp.web.repository.TransporteRepository;
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
import java.util.List;

import static com.bussapp.web.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TransporteResource} REST controller.
 */
@SpringBootTest(classes = BussAppWeb2App.class)
public class TransporteResourceIT {

    private static final Integer DEFAULT_LUGARES = 1;
    private static final Integer UPDATED_LUGARES = 2;

    private static final String DEFAULT_MARCA = "AAAAAAAAAA";
    private static final String UPDATED_MARCA = "BBBBBBBBBB";

    private static final String DEFAULT_SUB_MARCA = "AAAAAAAAAA";
    private static final String UPDATED_SUB_MARCA = "BBBBBBBBBB";

    private static final String DEFAULT_NO_SERIE = "AAAAAAAAAA";
    private static final String UPDATED_NO_SERIE = "BBBBBBBBBB";

    private static final String DEFAULT_PLACAS = "AAAAAAAAAA";
    private static final String UPDATED_PLACAS = "BBBBBBBBBB";

    @Autowired
    private TransporteRepository transporteRepository;

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

    private MockMvc restTransporteMockMvc;

    private Transporte transporte;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransporteResource transporteResource = new TransporteResource(transporteRepository);
        this.restTransporteMockMvc = MockMvcBuilders.standaloneSetup(transporteResource)
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
    public static Transporte createEntity(EntityManager em) {
        Transporte transporte = new Transporte()
            .lugares(DEFAULT_LUGARES)
            .marca(DEFAULT_MARCA)
            .subMarca(DEFAULT_SUB_MARCA)
            .noSerie(DEFAULT_NO_SERIE)
            .placas(DEFAULT_PLACAS);
        return transporte;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Transporte createUpdatedEntity(EntityManager em) {
        Transporte transporte = new Transporte()
            .lugares(UPDATED_LUGARES)
            .marca(UPDATED_MARCA)
            .subMarca(UPDATED_SUB_MARCA)
            .noSerie(UPDATED_NO_SERIE)
            .placas(UPDATED_PLACAS);
        return transporte;
    }

    @BeforeEach
    public void initTest() {
        transporte = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransporte() throws Exception {
        int databaseSizeBeforeCreate = transporteRepository.findAll().size();

        // Create the Transporte
        restTransporteMockMvc.perform(post("/api/transportes")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transporte)))
            .andExpect(status().isCreated());

        // Validate the Transporte in the database
        List<Transporte> transporteList = transporteRepository.findAll();
        assertThat(transporteList).hasSize(databaseSizeBeforeCreate + 1);
        Transporte testTransporte = transporteList.get(transporteList.size() - 1);
        assertThat(testTransporte.getLugares()).isEqualTo(DEFAULT_LUGARES);
        assertThat(testTransporte.getMarca()).isEqualTo(DEFAULT_MARCA);
        assertThat(testTransporte.getSubMarca()).isEqualTo(DEFAULT_SUB_MARCA);
        assertThat(testTransporte.getNoSerie()).isEqualTo(DEFAULT_NO_SERIE);
        assertThat(testTransporte.getPlacas()).isEqualTo(DEFAULT_PLACAS);
    }

    @Test
    @Transactional
    public void createTransporteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transporteRepository.findAll().size();

        // Create the Transporte with an existing ID
        transporte.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransporteMockMvc.perform(post("/api/transportes")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transporte)))
            .andExpect(status().isBadRequest());

        // Validate the Transporte in the database
        List<Transporte> transporteList = transporteRepository.findAll();
        assertThat(transporteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTransportes() throws Exception {
        // Initialize the database
        transporteRepository.saveAndFlush(transporte);

        // Get all the transporteList
        restTransporteMockMvc.perform(get("/api/transportes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transporte.getId().intValue())))
            .andExpect(jsonPath("$.[*].lugares").value(hasItem(DEFAULT_LUGARES)))
            .andExpect(jsonPath("$.[*].marca").value(hasItem(DEFAULT_MARCA)))
            .andExpect(jsonPath("$.[*].subMarca").value(hasItem(DEFAULT_SUB_MARCA)))
            .andExpect(jsonPath("$.[*].noSerie").value(hasItem(DEFAULT_NO_SERIE)))
            .andExpect(jsonPath("$.[*].placas").value(hasItem(DEFAULT_PLACAS)));
    }
    
    @Test
    @Transactional
    public void getTransporte() throws Exception {
        // Initialize the database
        transporteRepository.saveAndFlush(transporte);

        // Get the transporte
        restTransporteMockMvc.perform(get("/api/transportes/{id}", transporte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(transporte.getId().intValue()))
            .andExpect(jsonPath("$.lugares").value(DEFAULT_LUGARES))
            .andExpect(jsonPath("$.marca").value(DEFAULT_MARCA))
            .andExpect(jsonPath("$.subMarca").value(DEFAULT_SUB_MARCA))
            .andExpect(jsonPath("$.noSerie").value(DEFAULT_NO_SERIE))
            .andExpect(jsonPath("$.placas").value(DEFAULT_PLACAS));
    }

    @Test
    @Transactional
    public void getNonExistingTransporte() throws Exception {
        // Get the transporte
        restTransporteMockMvc.perform(get("/api/transportes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransporte() throws Exception {
        // Initialize the database
        transporteRepository.saveAndFlush(transporte);

        int databaseSizeBeforeUpdate = transporteRepository.findAll().size();

        // Update the transporte
        Transporte updatedTransporte = transporteRepository.findById(transporte.getId()).get();
        // Disconnect from session so that the updates on updatedTransporte are not directly saved in db
        em.detach(updatedTransporte);
        updatedTransporte
            .lugares(UPDATED_LUGARES)
            .marca(UPDATED_MARCA)
            .subMarca(UPDATED_SUB_MARCA)
            .noSerie(UPDATED_NO_SERIE)
            .placas(UPDATED_PLACAS);

        restTransporteMockMvc.perform(put("/api/transportes")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransporte)))
            .andExpect(status().isOk());

        // Validate the Transporte in the database
        List<Transporte> transporteList = transporteRepository.findAll();
        assertThat(transporteList).hasSize(databaseSizeBeforeUpdate);
        Transporte testTransporte = transporteList.get(transporteList.size() - 1);
        assertThat(testTransporte.getLugares()).isEqualTo(UPDATED_LUGARES);
        assertThat(testTransporte.getMarca()).isEqualTo(UPDATED_MARCA);
        assertThat(testTransporte.getSubMarca()).isEqualTo(UPDATED_SUB_MARCA);
        assertThat(testTransporte.getNoSerie()).isEqualTo(UPDATED_NO_SERIE);
        assertThat(testTransporte.getPlacas()).isEqualTo(UPDATED_PLACAS);
    }

    @Test
    @Transactional
    public void updateNonExistingTransporte() throws Exception {
        int databaseSizeBeforeUpdate = transporteRepository.findAll().size();

        // Create the Transporte

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransporteMockMvc.perform(put("/api/transportes")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transporte)))
            .andExpect(status().isBadRequest());

        // Validate the Transporte in the database
        List<Transporte> transporteList = transporteRepository.findAll();
        assertThat(transporteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransporte() throws Exception {
        // Initialize the database
        transporteRepository.saveAndFlush(transporte);

        int databaseSizeBeforeDelete = transporteRepository.findAll().size();

        // Delete the transporte
        restTransporteMockMvc.perform(delete("/api/transportes/{id}", transporte.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Transporte> transporteList = transporteRepository.findAll();
        assertThat(transporteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
