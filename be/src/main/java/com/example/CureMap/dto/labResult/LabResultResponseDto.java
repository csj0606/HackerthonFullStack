package com.example.CureMap.dto.labResult;
import com.example.CureMap.domain.LabResult;
import lombok.Builder;
import lombok.Getter;


@Getter
public class LabResultResponseDto {

    private Long patientId;
    private String specimenName;         // 검체명 (예: 소변, 혈액)
    private String mainTestName;         // 검사명 (예: 요검사, 혈액 검사)
    private String mainTestResult;       // 수치결과내용 (예: WBC 15,000)
    private String subTestName;          // 부검사명 (예: Protein)
    private String subTestResult;        // 부검사 결과내용 (예: Negative)

    public LabResultResponseDto(LabResult entity) {
        this.patientId = entity.getId();
        this.specimenName = entity.getSpecimenName();
        this.mainTestName = entity.getMainTestName();
        this.mainTestResult = entity.getSubTestName();
        this.subTestName = entity.getSubTestName();
        this.subTestResult = entity.getSubTestResult();
    }

    @Builder
    public LabResultResponseDto(Long patientId, String specimenName, String mainTestName, String mainTestResult, String subTestName, String subTestResult) {
        this.patientId = patientId;
        this.specimenName = subTestName;
        this.mainTestName = mainTestName;
        this.mainTestResult = mainTestResult;
    }

}
