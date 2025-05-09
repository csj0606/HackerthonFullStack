package com.example.CureMap.dto.CurrentMedication;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurrentMedicationRequestDto {
    private Long PatientId;
    private String medicationName;
}
