package com.bussapp.web.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ChoferSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ChoferSearchRepositoryMockConfiguration {

    @MockBean
    private ChoferSearchRepository mockChoferSearchRepository;

}
