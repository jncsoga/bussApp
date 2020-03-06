package com.bussapp.web.repository.search;

import com.bussapp.web.domain.Transporte;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Transporte} entity.
 */
public interface TransporteSearchRepository extends ElasticsearchRepository<Transporte, Long> {
}
