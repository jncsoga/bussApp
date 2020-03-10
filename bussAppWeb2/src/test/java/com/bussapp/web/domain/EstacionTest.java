package com.bussapp.web.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.bussapp.web.web.rest.TestUtil;

public class EstacionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Estacion.class);
        Estacion estacion1 = new Estacion();
        estacion1.setId(1L);
        Estacion estacion2 = new Estacion();
        estacion2.setId(estacion1.getId());
        assertThat(estacion1).isEqualTo(estacion2);
        estacion2.setId(2L);
        assertThat(estacion1).isNotEqualTo(estacion2);
        estacion1.setId(null);
        assertThat(estacion1).isNotEqualTo(estacion2);
    }
}
