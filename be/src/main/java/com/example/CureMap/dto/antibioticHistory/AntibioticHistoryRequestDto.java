package com.example.CureMap.dto.antibioticHistory;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class AntibioticHistoryRequestDto {
    private Long patientId;
    private String antibioticName;
}
