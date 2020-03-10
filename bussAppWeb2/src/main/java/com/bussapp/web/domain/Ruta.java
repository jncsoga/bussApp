package com.bussapp.web.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Ruta.
 */
@Entity
@Table(name = "ruta")
public class Ruta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "lugares_disponibles")
    private Integer lugaresDisponibles;

    @Column(name = "inicio")
    private ZonedDateTime inicio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLugaresDisponibles() {
        return lugaresDisponibles;
    }

    public Ruta lugaresDisponibles(Integer lugaresDisponibles) {
        this.lugaresDisponibles = lugaresDisponibles;
        return this;
    }

    public void setLugaresDisponibles(Integer lugaresDisponibles) {
        this.lugaresDisponibles = lugaresDisponibles;
    }

    public ZonedDateTime getInicio() {
        return inicio;
    }

    public Ruta inicio(ZonedDateTime inicio) {
        this.inicio = inicio;
        return this;
    }

    public void setInicio(ZonedDateTime inicio) {
        this.inicio = inicio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ruta)) {
            return false;
        }
        return id != null && id.equals(((Ruta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Ruta{" +
            "id=" + getId() +
            ", lugaresDisponibles=" + getLugaresDisponibles() +
            ", inicio='" + getInicio() + "'" +
            "}";
    }
}
