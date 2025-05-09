package com.example.CureMap.service;

import com.example.CureMap.domain.Patient;
import com.example.CureMap.domain.Vitals;
import com.example.CureMap.dto.vitals.VitalsRequestDto;
import com.example.CureMap.dto.vitals.VitalsResponseDto;
import com.example.CureMap.repository.PatientRepository;
import com.example.CureMap.repository.VitalsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VitalService {
    private final VitalsRepository vitalsRepository;
    private final PatientRepository patientRepository;

    public VitalsResponseDto saveVitals(VitalsRequestDto dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new IllegalArgumentException("환자를 찾을 수 없습니다."));

        Vitals vitals = Vitals.builder()
                .patient(patient)
                .heartRate(dto.getHeartRate())
                .respiratoryRate(dto.getRespiratoryRate())
                .temperature(dto.getTemperature())
                .systolicBP(dto.getSystolicBP())
                .diastolicBP(dto.getDiastolicBP())
                .build();

        Vitals saved = vitalsRepository.save(vitals);
        return new VitalsResponseDto(saved);
    }
}
