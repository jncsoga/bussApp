package com.bussapp.web.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.bussapp.web.web.rest.TestUtil;

public class RutaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ruta.class);
        Ruta ruta1 = new Ruta();
        ruta1.setId(1L);
        Ruta ruta2 = new Ruta();
        ruta2.setId(ruta1.getId());
        assertThat(ruta1).isEqualTo(ruta2);
        ruta2.setId(2L);
        assertThat(ruta1).isNotEqualTo(ruta2);
        ruta1.setId(null);
        assertThat(ruta1).isNotEqualTo(ruta2);
    }
}
