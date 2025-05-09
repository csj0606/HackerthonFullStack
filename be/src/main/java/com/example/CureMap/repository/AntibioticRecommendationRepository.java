package com.example.CureMap.repository;

import com.example.CureMap.domain.AntibioticRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AntibioticRecommendationRepository extends JpaRepository<AntibioticRecommendation, Long> {
    List<AntibioticRecommendation> findByPredictionResultId(Long predictionResultId);
}
