package com.bussapp.web.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.bussapp.web.web.rest.TestUtil;

public class TransporteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transporte.class);
        Transporte transporte1 = new Transporte();
        transporte1.setId(1L);
        Transporte transporte2 = new Transporte();
        transporte2.setId(transporte1.getId());
        assertThat(transporte1).isEqualTo(transporte2);
        transporte2.setId(2L);
        assertThat(transporte1).isNotEqualTo(transporte2);
        transporte1.setId(null);
        assertThat(transporte1).isNotEqualTo(transporte2);
    }
}
