package com.example.CureMap.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PredictionResult {
    @Id @GeneratedValue
    @Column
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ElementCollection
    @CollectionTable(name = "suspicious_disease", joinColumns = @JoinColumn(name = "prediction_result_id"))
    private List<SuspiciousDisease> suspiciousDiseases = new ArrayList<>();

    private String antibioticName; //예측에 사용된 항생제 이름

    private Double successProbability; // 치료 성공 확률
    private Double mortalityRisk;  // 사망 위험도
    private Double sideEffectRisk; // 부작용 발생 확률
    private Integer predictedLengthOfStay; // 예측된 입원 기간 (단위: 일)

    @OneToMany(mappedBy = "predictionResult", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AntibioticRecommendation> recommendations = new ArrayList<>();

    @OneToMany(mappedBy = "predictionResult", cascade = CascadeType.ALL)
    private List<DiseasePrediction> diseasePredictions;

    @OneToMany(mappedBy = "predictionResult", cascade = CascadeType.ALL)
    private List<OutcomeSimulation> outcomeSimulations;


}
