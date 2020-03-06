package com.bussapp.web.repository;

import com.bussapp.web.domain.Chofer;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Chofer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChoferRepository extends JpaRepository<Chofer, Long> {

}
