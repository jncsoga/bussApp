package com.bussapp.web.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link TransporteSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TransporteSearchRepositoryMockConfiguration {

    @MockBean
    private TransporteSearchRepository mockTransporteSearchRepository;

}
