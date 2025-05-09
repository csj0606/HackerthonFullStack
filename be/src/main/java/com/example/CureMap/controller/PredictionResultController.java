package com.example.CureMap.controller;

import com.example.CureMap.dto.predictionResult.PredictionResultResponseDto;
import com.example.CureMap.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/prediction-result")
public class PredictionResultController {

    private final PredictionService predictionService;

    // 📍 환자 ID를 통해 예측 결과 조회
    @GetMapping("/{patientId}")
    public PredictionResultResponseDto getPredictionResult(@PathVariable Long patientId) {
        return predictionService.getPredictionResult(patientId);
    }

}
