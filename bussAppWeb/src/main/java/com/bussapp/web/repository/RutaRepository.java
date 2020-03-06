package com.bussapp.web.repository;

import com.bussapp.web.domain.Ruta;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Ruta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RutaRepository extends JpaRepository<Ruta, Long> {

}
