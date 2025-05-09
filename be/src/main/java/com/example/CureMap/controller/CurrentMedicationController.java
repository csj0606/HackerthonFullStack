package com.example.CureMap.controller;

import com.example.CureMap.dto.CurrentMedication.CurrentMedicationRequestDto;
import com.example.CureMap.dto.CurrentMedication.CurrentMedicationResponseDto;
import com.example.CureMap.service.CurrentMedicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patients/{id}/medications")
public class CurrentMedicationController {
    private final CurrentMedicationService currentMedicationService;

    @PostMapping
    public ResponseEntity<String> create(@PathVariable Long id, @RequestBody CurrentMedicationRequestDto dto) {
        dto.setPatientId(id);
        currentMedicationService.saveCurrentMedication(dto);
        return ResponseEntity.ok("복용 중인 약이 저장되었습니다.");
    }

    @GetMapping
    public List<CurrentMedicationResponseDto> get(@PathVariable Long id) {
        return currentMedicationService.getMedicationsByPatientId(id);
    }
}
