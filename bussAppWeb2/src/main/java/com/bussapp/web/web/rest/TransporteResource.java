package com.bussapp.web.web.rest;

import com.bussapp.web.domain.Transporte;
import com.bussapp.web.repository.TransporteRepository;
import com.bussapp.web.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.bussapp.web.domain.Transporte}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TransporteResource {

    private final Logger log = LoggerFactory.getLogger(TransporteResource.class);

    private static final String ENTITY_NAME = "transporte";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransporteRepository transporteRepository;

    public TransporteResource(TransporteRepository transporteRepository) {
        this.transporteRepository = transporteRepository;
    }

    /**
     * {@code POST  /transportes} : Create a new transporte.
     *
     * @param transporte the transporte to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transporte, or with status {@code 400 (Bad Request)} if the transporte has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transportes")
    public ResponseEntity<Transporte> createTransporte(@RequestBody Transporte transporte) throws URISyntaxException {
        log.debug("REST request to save Transporte : {}", transporte);
        if (transporte.getId() != null) {
            throw new BadRequestAlertException("A new transporte cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Transporte result = transporteRepository.save(transporte);
        return ResponseEntity.created(new URI("/api/transportes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /transportes} : Updates an existing transporte.
     *
     * @param transporte the transporte to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transporte,
     * or with status {@code 400 (Bad Request)} if the transporte is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transporte couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transportes")
    public ResponseEntity<Transporte> updateTransporte(@RequestBody Transporte transporte) throws URISyntaxException {
        log.debug("REST request to update Transporte : {}", transporte);
        if (transporte.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Transporte result = transporteRepository.save(transporte);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, transporte.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /transportes} : get all the transportes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transportes in body.
     */
    @GetMapping("/transportes")
    public List<Transporte> getAllTransportes() {
        log.debug("REST request to get all Transportes");
        return transporteRepository.findAll();
    }

    /**
     * {@code GET  /transportes/:id} : get the "id" transporte.
     *
     * @param id the id of the transporte to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transporte, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transportes/{id}")
    public ResponseEntity<Transporte> getTransporte(@PathVariable Long id) {
        log.debug("REST request to get Transporte : {}", id);
        Optional<Transporte> transporte = transporteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transporte);
    }

    /**
     * {@code DELETE  /transportes/:id} : delete the "id" transporte.
     *
     * @param id the id of the transporte to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transportes/{id}")
    public ResponseEntity<Void> deleteTransporte(@PathVariable Long id) {
        log.debug("REST request to delete Transporte : {}", id);
        transporteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
