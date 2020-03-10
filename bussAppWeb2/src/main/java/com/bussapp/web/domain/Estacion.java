package com.bussapp.web.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Estacion.
 */
@Entity
@Table(name = "estacion")
public class Estacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "geolocalizacion")
    private String geolocalizacion;

    @Column(name = "nombre")
    private String nombre;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGeolocalizacion() {
        return geolocalizacion;
    }

    public Estacion geolocalizacion(String geolocalizacion) {
        this.geolocalizacion = geolocalizacion;
        return this;
    }

    public void setGeolocalizacion(String geolocalizacion) {
        this.geolocalizacion = geolocalizacion;
    }

    public String getNombre() {
        return nombre;
    }

    public Estacion nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Estacion)) {
            return false;
        }
        return id != null && id.equals(((Estacion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Estacion{" +
            "id=" + getId() +
            ", geolocalizacion='" + getGeolocalizacion() + "'" +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
