package com.bussapp.web.repository;

import com.bussapp.web.domain.Estacion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Estacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstacionRepository extends JpaRepository<Estacion, Long> {

}
