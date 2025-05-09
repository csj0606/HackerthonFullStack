package com.example.CureMap.dto.vitals;

import com.example.CureMap.domain.Vitals;
import lombok.Getter;

@Getter
public class VitalsResponseDto {
    private Long id;
    private Long patientId;
    private Integer heartRate;
    private Integer respiratoryRate;
    private Double temperature;
    private Integer systolicBP;
    private Integer diastolicBP;

    public VitalsResponseDto(Vitals entity) {
        this.id = entity.getId();
        this.patientId = entity.getPatient().getId();
        this.heartRate = entity.getHeartRate();
        this.respiratoryRate = entity.getRespiratoryRate();
        this.temperature = entity.getTemperature();
        this.systolicBP = entity.getSystolicBP();
        this.diastolicBP = entity.getDiastolicBP();
    }
}
