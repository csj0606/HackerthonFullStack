package com.example.CureMap.dto.antibioticHistory;

import com.example.CureMap.domain.AntibioticHistory;
import lombok.Getter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Getter
public class AntibioticHistoryResponseDto {
    private Long id;
    private String antibioticName;

    public AntibioticHistoryResponseDto(AntibioticHistory entity) {
        this.id = entity.getId();
        this.antibioticName = entity.getAntibioticName();
    }
}
