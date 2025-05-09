package com.example.CureMap.dto.predictionResult;

import com.example.CureMap.domain.OutcomeSimulation;
import lombok.Getter;

@Getter
public class OutcomeSimulationResponseDto {

    private Long id;
    // 성공 확률
    private String label;           // 예: "1개월 후", "2개월 후"
    private Double recoveryRate;    // 회복률 예측 값 (%)
    private Double resistanceRisk;

    public OutcomeSimulationResponseDto(OutcomeSimulation outcomeSimulation){
        this.id = outcomeSimulation.getId();
        this.label = outcomeSimulation.getLabel();
        this.recoveryRate = outcomeSimulation.getRecoveryRate();
        this.resistanceRisk = outcomeSimulation.getResistanceRisk();
    }

}
