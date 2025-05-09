package com.example.CureMap.service;

import com.example.CureMap.domain.AntibioticHistory;
import com.example.CureMap.domain.Patient;
import com.example.CureMap.dto.antibioticHistory.AntibioticHistoryRequestDto;
import com.example.CureMap.dto.antibioticHistory.AntibioticHistoryResponseDto;
import com.example.CureMap.repository.AntibioticHistoryRepository;
import com.example.CureMap.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AntibioticHistoryService {

    private final AntibioticHistoryRepository historyRepository;
    private final PatientRepository patientRepository;

    /**
     * 항생제 복용 이력을 저장합니다.
     */
    public Long saveAntibioticHistory(AntibioticHistoryRequestDto dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new IllegalArgumentException("환자를 찾을 수 없습니다."));

        AntibioticHistory history = AntibioticHistory.builder()
                .patient(patient)
                .antibioticName(dto.getAntibioticName())
                .build();

        return historyRepository.save(history).getId();
    }

    /**
     * 특정 환자의 항생제 이력을 조회합니다.
     */
    public List<AntibioticHistoryResponseDto> getHistoryByPatientId(Long patientId) {
        List<AntibioticHistory> histories = historyRepository.findByPatientId(patientId);
        return histories.stream()
                .map(AntibioticHistoryResponseDto::new)
                .collect(Collectors.toList());
    }
}
