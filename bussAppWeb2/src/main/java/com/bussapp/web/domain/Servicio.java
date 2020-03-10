package com.bussapp.web.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Servicio.
 */
@Entity
@Table(name = "servicio")
public class Servicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    @Column(name = "lugares")
    private Integer lugares;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFecha() {
        return fecha;
    }

    public Servicio fecha(ZonedDateTime fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public Integer getLugares() {
        return lugares;
    }

    public Servicio lugares(Integer lugares) {
        this.lugares = lugares;
        return this;
    }

    public void setLugares(Integer lugares) {
        this.lugares = lugares;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Servicio)) {
            return false;
        }
        return id != null && id.equals(((Servicio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Servicio{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", lugares=" + getLugares() +
            "}";
    }
}
