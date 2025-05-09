package com.example.CureMap.repository;

import com.example.CureMap.domain.OutcomeSimulation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OutcomeSimulationRepository extends JpaRepository<OutcomeSimulation, Long> {
    Optional<OutcomeSimulation> findByPatientId(Long patientId);
}
