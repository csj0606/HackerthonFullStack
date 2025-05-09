package com.example.CureMap.repository;

import com.example.CureMap.domain.Vitals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VitalsRepository extends JpaRepository<Vitals, Long> {
}
