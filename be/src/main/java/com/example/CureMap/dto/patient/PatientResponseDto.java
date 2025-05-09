package com.example.CureMap.dto.patient;

import com.example.CureMap.domain.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter

@AllArgsConstructor
public class PatientResponseDto {
    private Long id;
    private String name;
    private AgeGroup ageGroup;
    private String gender;
    private LocalDate birthDate;
    private VisitType visitType;
    private List<UnderlyingDisease> underlyingDiseases;
    private LocalDate registrationDate;
    private PatientStatus status;
    private Boolean recentlyHospitalized;

    @Builder
    public PatientResponseDto(Patient patient) {
        this.id = patient.getId();
        this.name = patient.getName();
        this.ageGroup = patient.getAgeGroup();
        this.gender = patient.getGender();
        this.birthDate = patient.getBirthDate();
        this.visitType = patient.getVisitType();
        this.underlyingDiseases = patient.getUnderlyingDiseases();
        this.registrationDate = patient.getRegistrationDate();
        this.status = patient.getStatus();
        this.recentlyHospitalized = patient.getRecentlyHospitalized();
    }
}

