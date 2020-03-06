package com.bussapp.web.web.rest;

import com.bussapp.web.domain.Estacion;
import com.bussapp.web.repository.EstacionRepository;
import com.bussapp.web.repository.search.EstacionSearchRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.bussapp.web.domain.Estacion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EstacionResource {

    private final Logger log = LoggerFactory.getLogger(EstacionResource.class);

    private static final String ENTITY_NAME = "estacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstacionRepository estacionRepository;

    private final EstacionSearchRepository estacionSearchRepository;

    public EstacionResource(EstacionRepository estacionRepository, EstacionSearchRepository estacionSearchRepository) {
        this.estacionRepository = estacionRepository;
        this.estacionSearchRepository = estacionSearchRepository;
    }

    /**
     * {@code POST  /estacions} : Create a new estacion.
     *
     * @param estacion the estacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estacion, or with status {@code 400 (Bad Request)} if the estacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estacions")
    public ResponseEntity<Estacion> createEstacion(@RequestBody Estacion estacion) throws URISyntaxException {
        log.debug("REST request to save Estacion : {}", estacion);
        if (estacion.getId() != null) {
            throw new BadRequestAlertException("A new estacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Estacion result = estacionRepository.save(estacion);
        estacionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/estacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estacions} : Updates an existing estacion.
     *
     * @param estacion the estacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estacion,
     * or with status {@code 400 (Bad Request)} if the estacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estacions")
    public ResponseEntity<Estacion> updateEstacion(@RequestBody Estacion estacion) throws URISyntaxException {
        log.debug("REST request to update Estacion : {}", estacion);
        if (estacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Estacion result = estacionRepository.save(estacion);
        estacionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estacions} : get all the estacions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estacions in body.
     */
    @GetMapping("/estacions")
    public List<Estacion> getAllEstacions() {
        log.debug("REST request to get all Estacions");
        return estacionRepository.findAll();
    }

    /**
     * {@code GET  /estacions/:id} : get the "id" estacion.
     *
     * @param id the id of the estacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estacions/{id}")
    public ResponseEntity<Estacion> getEstacion(@PathVariable Long id) {
        log.debug("REST request to get Estacion : {}", id);
        Optional<Estacion> estacion = estacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estacion);
    }

    /**
     * {@code DELETE  /estacions/:id} : delete the "id" estacion.
     *
     * @param id the id of the estacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estacions/{id}")
    public ResponseEntity<Void> deleteEstacion(@PathVariable Long id) {
        log.debug("REST request to delete Estacion : {}", id);
        estacionRepository.deleteById(id);
        estacionSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/estacions?query=:query} : search for the estacion corresponding
     * to the query.
     *
     * @param query the query of the estacion search.
     * @return the result of the search.
     */
    @GetMapping("/_search/estacions")
    public List<Estacion> searchEstacions(@RequestParam String query) {
        log.debug("REST request to search Estacions for query {}", query);
        return StreamSupport
            .stream(estacionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
