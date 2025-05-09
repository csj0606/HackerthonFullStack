package com.example.CureMap.controller;

import com.example.CureMap.dto.antibioticHistory.AntibioticHistoryRequestDto;
import com.example.CureMap.dto.antibioticHistory.AntibioticHistoryResponseDto;
import com.example.CureMap.service.AntibioticHistoryService;
import com.example.CureMap.service.AntibioticRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patients/{id}/antibiotics")
public class AntibioticHistoryController {

    private final AntibioticHistoryService historyService;

    @GetMapping
    public ResponseEntity<List<AntibioticHistoryResponseDto>> getHistory(@PathVariable("id") Long patientId) {
        List<AntibioticHistoryResponseDto> result = historyService.getHistoryByPatientId(patientId);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<String> createHistory(@PathVariable("id") Long patientId,
                                                @RequestBody AntibioticHistoryRequestDto dto) {
        dto.setPatientId(patientId); // DTO에 환자 ID 주입
        historyService.saveAntibioticHistory(dto);  // 저장 로직 호출
        return ResponseEntity.ok("항생제 복용 이력이 저장되었습니다.");
    }

}
