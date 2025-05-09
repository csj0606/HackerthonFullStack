package com.example.CureMap.repository;

import com.example.CureMap.domain.DiseasePrediction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiseasePredictionRepository extends JpaRepository<DiseasePrediction, Long> {
    List<DiseasePrediction> findByPatientId(Long patientId);
}
