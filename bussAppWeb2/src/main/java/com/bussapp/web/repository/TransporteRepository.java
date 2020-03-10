package com.bussapp.web.repository;

import com.bussapp.web.domain.Transporte;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Transporte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransporteRepository extends JpaRepository<Transporte, Long> {

}
