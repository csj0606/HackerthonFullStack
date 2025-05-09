package com.example.CureMap.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class DiseasePrediction {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    private String diseaseName;         // 질병 이름
    private Double confidence;         // 예측 확률 (%)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prediction_result_id")
    private PredictionResult predictionResult;
}
