package com.bussapp.web.repository.search;

import com.bussapp.web.domain.Estacion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Estacion} entity.
 */
public interface EstacionSearchRepository extends ElasticsearchRepository<Estacion, Long> {
}
