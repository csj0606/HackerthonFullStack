package com.example.CureMap.dto.vitals;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class VitalsRequestDto {
    private Long patientId;
    private Double temperature;
    private Integer heartRate;
    private Integer respiratoryRate;
    private Integer systolicBP;
    private Integer diastolicBP;
}
