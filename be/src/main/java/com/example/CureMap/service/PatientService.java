package com.example.CureMap.service;

import com.example.CureMap.domain.AgeGroup;
import com.example.CureMap.domain.AntibioticHistory;
import com.example.CureMap.domain.CurrentMedication;
import com.example.CureMap.domain.Patient;
import com.example.CureMap.dto.patient.PatientRequestDto;
import com.example.CureMap.dto.patient.PatientResponseDto;
import com.example.CureMap.repository.AntibioticHistoryRepository;
import com.example.CureMap.repository.CurrentMedicationRepository;
import com.example.CureMap.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final AntibioticHistoryRepository antibioticHistoryRepository;
    private final CurrentMedicationRepository currentMedicationRepository;

    @Transactional
    public Long createPatient(PatientRequestDto dto) {
        // 1. 환자 저장
        Patient patient = Patient.builder()
                .hospitalId(dto.getHospitalId())
                .ageGroup(AgeGroup.valueOf(dto.getAgeGroup()))
                .gender(dto.getGender())
                .underlyingDiseases(dto.getUnderlyingDiseases())
                .recentlyHospitalized(dto.getRecentlyHospitalized())
                .build();

        patientRepository.save(patient);

        // 2. 항생제 복용 이력 저장
        List<String> antibioticNames = dto.getAntibiotics();
        if (antibioticNames != null) {
            for (String name : antibioticNames) {
                AntibioticHistory history = AntibioticHistory.builder()
                        .patient(patient)
                        .antibioticName(name)
                        .build();
                antibioticHistoryRepository.save(history);
            }
        }

        List<String> medicationNames = dto.getMedicationNames();
        if (medicationNames != null) {
            for (String name : medicationNames) {
                CurrentMedication medication = CurrentMedication.builder()
                        .patient(patient)
                        .medicationName(name)
                        .build();
                currentMedicationRepository.save(medication);
            }
        }

        return patient.getId();
    }

    public PatientResponseDto getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("환자를 찾을 수 없습니다."));

        return new PatientResponseDto(patient);
    }

}