package com.bussapp.web.web.rest;

import com.bussapp.web.BussAppWeb2App;
import com.bussapp.web.domain.Chofer;
import com.bussapp.web.repository.ChoferRepository;
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
 * Integration tests for the {@link ChoferResource} REST controller.
 */
@SpringBootTest(classes = BussAppWeb2App.class)
public class ChoferResourceIT {

    private static final Integer DEFAULT_USUARIO = 1;
    private static final Integer UPDATED_USUARIO = 2;

    @Autowired
    private ChoferRepository choferRepository;

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

    private MockMvc restChoferMockMvc;

    private Chofer chofer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChoferResource choferResource = new ChoferResource(choferRepository);
        this.restChoferMockMvc = MockMvcBuilders.standaloneSetup(choferResource)
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
    public static Chofer createEntity(EntityManager em) {
        Chofer chofer = new Chofer()
            .usuario(DEFAULT_USUARIO);
        return chofer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chofer createUpdatedEntity(EntityManager em) {
        Chofer chofer = new Chofer()
            .usuario(UPDATED_USUARIO);
        return chofer;
    }

    @BeforeEach
    public void initTest() {
        chofer = createEntity(em);
    }

    @Test
    @Transactional
    public void createChofer() throws Exception {
        int databaseSizeBeforeCreate = choferRepository.findAll().size();

        // Create the Chofer
        restChoferMockMvc.perform(post("/api/chofers")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isCreated());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeCreate + 1);
        Chofer testChofer = choferList.get(choferList.size() - 1);
        assertThat(testChofer.getUsuario()).isEqualTo(DEFAULT_USUARIO);
    }

    @Test
    @Transactional
    public void createChoferWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = choferRepository.findAll().size();

        // Create the Chofer with an existing ID
        chofer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChoferMockMvc.perform(post("/api/chofers")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isBadRequest());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllChofers() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        // Get all the choferList
        restChoferMockMvc.perform(get("/api/chofers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chofer.getId().intValue())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO)));
    }
    
    @Test
    @Transactional
    public void getChofer() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        // Get the chofer
        restChoferMockMvc.perform(get("/api/chofers/{id}", chofer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chofer.getId().intValue()))
            .andExpect(jsonPath("$.usuario").value(DEFAULT_USUARIO));
    }

    @Test
    @Transactional
    public void getNonExistingChofer() throws Exception {
        // Get the chofer
        restChoferMockMvc.perform(get("/api/chofers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChofer() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        int databaseSizeBeforeUpdate = choferRepository.findAll().size();

        // Update the chofer
        Chofer updatedChofer = choferRepository.findById(chofer.getId()).get();
        // Disconnect from session so that the updates on updatedChofer are not directly saved in db
        em.detach(updatedChofer);
        updatedChofer
            .usuario(UPDATED_USUARIO);

        restChoferMockMvc.perform(put("/api/chofers")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedChofer)))
            .andExpect(status().isOk());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
        Chofer testChofer = choferList.get(choferList.size() - 1);
        assertThat(testChofer.getUsuario()).isEqualTo(UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void updateNonExistingChofer() throws Exception {
        int databaseSizeBeforeUpdate = choferRepository.findAll().size();

        // Create the Chofer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChoferMockMvc.perform(put("/api/chofers")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isBadRequest());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChofer() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        int databaseSizeBeforeDelete = choferRepository.findAll().size();

        // Delete the chofer
        restChoferMockMvc.perform(delete("/api/chofers/{id}", chofer.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
