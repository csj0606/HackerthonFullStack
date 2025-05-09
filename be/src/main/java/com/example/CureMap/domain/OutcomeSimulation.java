package com.example.CureMap.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OutcomeSimulation {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    private String label;           // 예: "1개월 후", "2개월 후"
    private Double recoveryRate;    // 회복률 예측 값 (%)
    private Double resistanceRisk;  // 내성 발생 예측 값 (%)


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prediction_result_id")
    private PredictionResult predictionResult;

}
