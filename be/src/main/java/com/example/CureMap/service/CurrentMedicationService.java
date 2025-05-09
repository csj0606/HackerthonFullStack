package com.example.CureMap.service;

import com.example.CureMap.domain.CurrentMedication;
import com.example.CureMap.domain.Patient;
import com.example.CureMap.dto.CurrentMedication.CurrentMedicationRequestDto;
import com.example.CureMap.dto.CurrentMedication.CurrentMedicationResponseDto;
import com.example.CureMap.repository.CurrentMedicationRepository;
import com.example.CureMap.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CurrentMedicationService {

    private final CurrentMedicationRepository currentMedicationRepository;
    private final PatientRepository patientRepository;

    public Long saveCurrentMedication(CurrentMedicationRequestDto dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new IllegalArgumentException("환자를 찾을 수 없습니다."));

        CurrentMedication medication = CurrentMedication.builder()
                .medicationName(dto.getMedicationName())
                .patient(patient)
                .build();

        return currentMedicationRepository.save(medication).getId();
    }

    public List<CurrentMedicationResponseDto> getMedicationsByPatientId(Long patientId) {
        return currentMedicationRepository.findByPatientId(patientId).stream()
                .map(CurrentMedicationResponseDto::new)
                .collect(Collectors.toList());
    }

}
