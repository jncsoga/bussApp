package com.bussapp.web.repository.search;

import com.bussapp.web.domain.Ruta;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Ruta} entity.
 */
public interface RutaSearchRepository extends ElasticsearchRepository<Ruta, Long> {
}
