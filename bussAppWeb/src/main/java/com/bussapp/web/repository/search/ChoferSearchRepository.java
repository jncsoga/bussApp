package com.bussapp.web.repository.search;

import com.bussapp.web.domain.Chofer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Chofer} entity.
 */
public interface ChoferSearchRepository extends ElasticsearchRepository<Chofer, Long> {
}
