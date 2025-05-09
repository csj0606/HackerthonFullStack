package com.example.CureMap.dto.CurrentMedication;

import com.example.CureMap.domain.CurrentMedication;
import lombok.Getter;

@Getter
public class CurrentMedicationResponseDto {
    private Long id;
    private String medicationName;

    public CurrentMedicationResponseDto(CurrentMedication entity){
        this.id = entity.getId();;
        this.medicationName = entity.getMedicationName();
    }
}
