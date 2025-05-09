package com.example.CureMap.dto.labResult;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LabResultRequestDto {

    private Long patientId;
    private String specimenName;         // 검체명 (예: 소변, 혈액)
    private String mainTestName;         // 검사명 (예: 요검사, 혈액 검사)
    private String mainTestResult;       // 수치결과내용 (예: WBC 15,000)
    private String subTestName;          // 부검사명 (예: Protein)
    private String subTestResult;        // 부검사 결과내용 (예: Negative)
}
