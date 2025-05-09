package com.example.CureMap.controller;

import com.example.CureMap.dto.AntibioticRecommendation.AntibioticRecommendationResponseDto;
import com.example.CureMap.service.AntibioticRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class AntibioticRecommendationController {
    private final AntibioticRecommendationService recommendationService;

    @GetMapping("/{predictionResultID}")
    public List<AntibioticRecommendationResponseDto> getRecommendations(@PathVariable Long predictionResltId) {
        return recommendationService.getRecommendationsByPredictionResult(predictionResltId);
    }
}
