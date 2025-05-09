package com.example.CureMap.repository;

import com.example.CureMap.domain.PredictionResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PredictionResultRepository extends JpaRepository<PredictionResult, Long> {
    Optional<PredictionResult> findByPatientId(Long patientId);
}
