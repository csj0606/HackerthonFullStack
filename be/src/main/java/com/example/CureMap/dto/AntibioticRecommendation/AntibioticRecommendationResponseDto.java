package com.example.CureMap.dto.AntibioticRecommendation;

import com.example.CureMap.domain.AntibioticRecommendation;
import lombok.Getter;

// 클라이언트에게 응답할 때 사용하는 DTO (Entity → DTO 변환용)
@Getter
public class AntibioticRecommendationResponseDto {
    private Long id;
    private String antibioticName;
    private Integer recommandRank;
    private Double successRate;
    private Double resistanceRisk;
    private String sideEffectNote;
    private Double totalScore;
    private String rationale;

    public AntibioticRecommendationResponseDto(AntibioticRecommendation entity) {
        this.id = entity.getId();
        this.antibioticName = entity.getAntibioticName();
        this.recommandRank = entity.getRecommandRank();
        this.successRate = entity.getSuccessRate();
        this.resistanceRisk = entity.getResistanceRisk();
        this.sideEffectNote = entity.getSideEffectNote();
        this.totalScore = entity.getTotalScore();
        this.rationale = entity.getRationale();
    }
}
