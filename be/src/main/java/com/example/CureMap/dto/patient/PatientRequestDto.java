package com.example.CureMap.dto.patient;

import com.example.CureMap.domain.UnderlyingDisease;
import lombok.Getter;

import java.util.List;

@Getter
public class PatientRequestDto {
    private String hospitalId;
    private String ageGroup;
    private String gender;

    private List<UnderlyingDisease> underlyingDiseases;
    private Boolean recentlyHospitalized;
    private List<String> antibiotics;
    private List<String> medicationNames;

}
