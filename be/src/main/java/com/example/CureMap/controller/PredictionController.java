package com.example.CureMap.controller;

import com.example.CureMap.dto.AntibioticRecommendation.AntibioticRecommendationResponseDto;
import com.example.CureMap.dto.predictionResult.DiseasePredictionResponseDto;
import com.example.CureMap.dto.predictionResult.OutcomeSimulationResponseDto;
import com.example.CureMap.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patients/{id}/predictions")
public class PredictionController {
    private final PredictionService predictionService;

    @GetMapping("/suspected-diseases")
    public List<DiseasePredictionResponseDto> getSuspectedDiseases(@PathVariable Long id) {
        return predictionService.predictDiseases(id).stream()
                .map(DiseasePredictionResponseDto::new) // DTO 변환
                .collect(Collectors.toList());
    }

    @GetMapping("/antibiotics")
    public List<AntibioticRecommendationResponseDto> getAntibioticRecommendations(@PathVariable Long id) {
        return predictionService.recommendAntibiotics(id).stream()
                .map(AntibioticRecommendationResponseDto::new) // DTO 변환
                .collect(Collectors.toList());
    }

    @GetMapping("/outcomes")
    public OutcomeSimulationResponseDto getOutcomeSimulation(@PathVariable Long id) {
        return new OutcomeSimulationResponseDto(predictionService.simulateOutcome(id));
    }

    @PostMapping
    public ResponseEntity<String> savePredictions(@PathVariable Long id) {
        predictionService.savePredictionResult(id);
        return ResponseEntity.ok("예측 결과 저장 완료");
    }
}
