package com.bussapp.web.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link RutaSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class RutaSearchRepositoryMockConfiguration {

    @MockBean
    private RutaSearchRepository mockRutaSearchRepository;

}
