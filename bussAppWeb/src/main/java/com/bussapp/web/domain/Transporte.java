package com.bussapp.web.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Transporte.
 */
@Entity
@Table(name = "transporte")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "transporte")
public class Transporte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "lugares")
    private Integer lugares;

    @Column(name = "marca")
    private String marca;

    @Column(name = "sub_marca")
    private String subMarca;

    @Column(name = "no_serie")
    private String noSerie;

    @Column(name = "placas")
    private String placas;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLugares() {
        return lugares;
    }

    public Transporte lugares(Integer lugares) {
        this.lugares = lugares;
        return this;
    }

    public void setLugares(Integer lugares) {
        this.lugares = lugares;
    }

    public String getMarca() {
        return marca;
    }

    public Transporte marca(String marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getSubMarca() {
        return subMarca;
    }

    public Transporte subMarca(String subMarca) {
        this.subMarca = subMarca;
        return this;
    }

    public void setSubMarca(String subMarca) {
        this.subMarca = subMarca;
    }

    public String getNoSerie() {
        return noSerie;
    }

    public Transporte noSerie(String noSerie) {
        this.noSerie = noSerie;
        return this;
    }

    public void setNoSerie(String noSerie) {
        this.noSerie = noSerie;
    }

    public String getPlacas() {
        return placas;
    }

    public Transporte placas(String placas) {
        this.placas = placas;
        return this;
    }

    public void setPlacas(String placas) {
        this.placas = placas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transporte)) {
            return false;
        }
        return id != null && id.equals(((Transporte) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Transporte{" +
            "id=" + getId() +
            ", lugares=" + getLugares() +
            ", marca='" + getMarca() + "'" +
            ", subMarca='" + getSubMarca() + "'" +
            ", noSerie='" + getNoSerie() + "'" +
            ", placas='" + getPlacas() + "'" +
            "}";
    }
}
