package com.example.CureMap.service;

import com.example.CureMap.domain.*;
import com.example.CureMap.dto.predictionResult.PredictionResultResponseDto;
import com.example.CureMap.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final DiseasePredictionRepository diseasePredictionRepository;
    private final AntibioticRecommendationRepository antibioticRecommendationRepository;
    private final OutcomeSimulationRepository outcomeSimulationRepository;
    private final PredictionResultRepository predictionResultRepository;
    private final PatientRepository patientRepository;

    public List<DiseasePrediction> predictDiseases(Long patientId) {
        Patient patient = getPatient(patientId);

        // 실제 AI 예측 로직을 이곳에 넣을 수 있습니다.
        // 예시로 임시 데이터 넣음
        DiseasePrediction d1 = DiseasePrediction.builder()
                .diseaseName("폐렴")
                .confidence(0.87)
                .patient(patient)
                .build();

        DiseasePrediction d2 = DiseasePrediction.builder()
                .diseaseName("기관지염")
                .confidence(0.72)
                .patient(patient)
                .build();

        DiseasePrediction d3 = DiseasePrediction.builder()
                .diseaseName("천식")
                .confidence(0.65)
                .patient(patient)
                .build();

        // 저장 및 반환
        return diseasePredictionRepository.saveAll(List.of(d1, d2, d3));
    }

    /**
     * 항생제 추천 예측
     */
    public List<AntibioticRecommendation> recommendAntibiotics(Long patientId) {
        Patient patient = getPatient(patientId);

        AntibioticRecommendation a1 = AntibioticRecommendation.builder()
                .antibioticName("Amoxicillin")
                .recommandRank(1)
                .successRate(90.0)
                .resistanceRisk(10.0)
                .totalScore(95.0)
                .patient(patient)
                .build();

        // 저장 및 반환
        return antibioticRecommendationRepository.saveAll(List.of(a1));
    }

    /**
     * 예후 시뮬레이션
     */
    public OutcomeSimulation simulateOutcome(Long patientId) {
        Patient patient = getPatient(patientId);

        OutcomeSimulation sim = OutcomeSimulation.builder()
                .patient(patient)
                .label("회복까지 약 5일 예상") // 이 부분은 예시로 임시 데이터를 넣은 것
                .recoveryRate(92.3) // 실제 예측 값을 여기에 넣어야 합니다.
                .resistanceRisk(10.5)               // resistanceRisk 지정
                .predictionResult(null)  // predictionResult 지정 (필요시)
                .build();

        // 저장 및 반환
        return outcomeSimulationRepository.save(sim);
    }

    /**
     * 전체 예측 결과 저장
     */
    public void savePredictionResult(Long patientId) {
        Patient patient = getPatient(patientId);

        // 의심 질환 예측, 항생제 추천, 예후 시뮬레이션 실행
        List<DiseasePrediction> diseases = predictDiseases(patientId);
        List<AntibioticRecommendation> antibiotics = recommendAntibiotics(patientId);
        OutcomeSimulation simulation = simulateOutcome(patientId);  // 단일 OutcomeSimulation 객체 반환
        List<OutcomeSimulation> simulations = List.of(simulation); // OutcomeSimulation을 리스트로 감쌈

        // 결과를 PredictionResult에 저장
        PredictionResult result = PredictionResult.builder()
                .patient(patient)
                .diseasePredictions(diseases)
                .recommendations(antibiotics)
                .outcomeSimulations(simulations)
                .build();

        // 저장s
        predictionResultRepository.save(result);
    }

    /**
     * 예측 결과 조회
     */
    public PredictionResultResponseDto getPredictionResult(Long patientId) {
        PredictionResult result = predictionResultRepository.findByPatientId(patientId)
                .orElseThrow(() -> new RuntimeException("Prediction result not found for patient id: " + patientId));

        return new PredictionResultResponseDto(result);
    }

    /**
     * 환자 조회 (Helper method)
     */
    private Patient getPatient(Long patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("환자를 찾을 수 없습니다."));
    }
}
