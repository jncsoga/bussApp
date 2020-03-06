package com.bussapp.web.repository.search;

import com.bussapp.web.domain.Servicio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Servicio} entity.
 */
public interface ServicioSearchRepository extends ElasticsearchRepository<Servicio, Long> {
}
