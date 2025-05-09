package com.example.CureMap.service;

import com.example.CureMap.domain.AntibioticRecommendation;
import com.example.CureMap.dto.AntibioticRecommendation.AntibioticRecommendationResponseDto;
import com.example.CureMap.repository.AntibioticRecommendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AntibioticRecommendationService {
    private final AntibioticRecommendationRepository recommendationRepository;

    public List<AntibioticRecommendationResponseDto> getRecommendationsByPredictionResult(Long predictionResultId) {
        List<AntibioticRecommendation> list = recommendationRepository.findByPredictionResultId(predictionResultId);

        return list.stream()
                .map(AntibioticRecommendationResponseDto::new)
                .collect(Collectors.toList());
    }

}
