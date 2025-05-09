package com.example.CureMap.service;

import com.example.CureMap.domain.AgeGroup;
import com.example.CureMap.domain.Patient;
import com.example.CureMap.dto.patient.PatientRequestDto;
import com.example.CureMap.dto.patient.PatientResponseDto;
import com.example.CureMap.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public Long createPatient(PatientRequestDto dto) {
        Patient patient = Patient.builder()
                .name(dto.getName())
                .ageGroup(AgeGroup.valueOf(dto.getAgeGroup()))
                .gender(dto.getGender())
                .birthDate(dto.getBirthDate())
                .underlyingDiseases(dto.getUnderlyingDiseases())
                .registrationDate(dto.getRegistrationDate())
                .status(dto.getStatus())
                .visitType(dto.getVisitType())
                .recentlyHospitalized(dto.getRecentlyHospitalized())
                .build();

        return patientRepository.save(patient).getId();
    }

    public PatientResponseDto getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("환자를 찾을 수 없습니다."));

        return new PatientResponseDto(patient);
    }
}
