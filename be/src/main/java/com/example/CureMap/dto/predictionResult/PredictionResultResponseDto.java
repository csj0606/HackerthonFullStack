package com.example.CureMap.dto.predictionResult;

import com.example.CureMap.domain.PredictionResult;
import com.example.CureMap.dto.AntibioticRecommendation.AntibioticRecommendationResponseDto;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class PredictionResultResponseDto {
    private Long id;
    private String antibioticName;
    private Double successProbability;
    private Double mortalityRisk;
    private Double sideEffectRisk;
    private Integer predictedLengthOfStay; // 예측된 입원 기간
    private List<AntibioticRecommendationResponseDto> recommendations;

    public PredictionResultResponseDto(PredictionResult entity) {
        this.id = entity.getId();
        this.antibioticName = entity.getAntibioticName();
        this.successProbability = entity.getSuccessProbability();
        this.mortalityRisk = entity.getMortalityRisk();
        this.sideEffectRisk = entity.getSideEffectRisk();
        this.predictedLengthOfStay = entity.getPredictedLengthOfStay();
        this.recommendations = entity.getRecommendations().stream()
                .map(AntibioticRecommendationResponseDto::new)
                .collect(Collectors.toList());
    }
}
