package com.bussapp.web.web.rest;

import com.bussapp.web.domain.Ruta;
import com.bussapp.web.repository.RutaRepository;
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
 * REST controller for managing {@link com.bussapp.web.domain.Ruta}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RutaResource {

    private final Logger log = LoggerFactory.getLogger(RutaResource.class);

    private static final String ENTITY_NAME = "ruta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RutaRepository rutaRepository;

    public RutaResource(RutaRepository rutaRepository) {
        this.rutaRepository = rutaRepository;
    }

    /**
     * {@code POST  /rutas} : Create a new ruta.
     *
     * @param ruta the ruta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ruta, or with status {@code 400 (Bad Request)} if the ruta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rutas")
    public ResponseEntity<Ruta> createRuta(@RequestBody Ruta ruta) throws URISyntaxException {
        log.debug("REST request to save Ruta : {}", ruta);
        if (ruta.getId() != null) {
            throw new BadRequestAlertException("A new ruta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ruta result = rutaRepository.save(ruta);
        return ResponseEntity.created(new URI("/api/rutas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rutas} : Updates an existing ruta.
     *
     * @param ruta the ruta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ruta,
     * or with status {@code 400 (Bad Request)} if the ruta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ruta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rutas")
    public ResponseEntity<Ruta> updateRuta(@RequestBody Ruta ruta) throws URISyntaxException {
        log.debug("REST request to update Ruta : {}", ruta);
        if (ruta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ruta result = rutaRepository.save(ruta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ruta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rutas} : get all the rutas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rutas in body.
     */
    @GetMapping("/rutas")
    public List<Ruta> getAllRutas() {
        log.debug("REST request to get all Rutas");
        return rutaRepository.findAll();
    }

    /**
     * {@code GET  /rutas/:id} : get the "id" ruta.
     *
     * @param id the id of the ruta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ruta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rutas/{id}")
    public ResponseEntity<Ruta> getRuta(@PathVariable Long id) {
        log.debug("REST request to get Ruta : {}", id);
        Optional<Ruta> ruta = rutaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ruta);
    }

    /**
     * {@code DELETE  /rutas/:id} : delete the "id" ruta.
     *
     * @param id the id of the ruta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rutas/{id}")
    public ResponseEntity<Void> deleteRuta(@PathVariable Long id) {
        log.debug("REST request to delete Ruta : {}", id);
        rutaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
