package com.example.CureMap.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AntibioticRecommendation {

    @Id @GeneratedValue
    @Column
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    private String antibioticName;     // 항생제 이름
    private Integer recommandRank;     // 추천 순위 (1, 2, 3위 등)

    private Double successRate;        // 치료 성공률 (%)
    private Double resistanceRisk;     // 내성 위험도 (%)
    private String sideEffectNote;     // 부작용 관련 요약 (예: "신독성 주의")

    private Double totalScore;         // 종합 점수 (AI 내부 스코어)

    private String rationale;          // 추천 이유 요약 (옵션)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prediction_result_id")
    private PredictionResult predictionResult;
}
