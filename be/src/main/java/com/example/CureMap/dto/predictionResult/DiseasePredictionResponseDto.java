package com.example.CureMap.dto.predictionResult;

import com.example.CureMap.domain.DiseasePrediction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class DiseasePredictionResponseDto {
    private Long id;
    private String diseaseName;
    private Double confidence; // 확률

    public DiseasePredictionResponseDto(DiseasePrediction diseasePrediction) {
        this.id = diseasePrediction.getId();
        this.diseaseName = diseasePrediction.getDiseaseName();
        this.confidence = diseasePrediction.getConfidence();
    }
}
