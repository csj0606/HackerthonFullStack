package com.example.CureMap.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vitals {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    private Double temperature; // 체온
    private Integer heartRate; // 맥박
    private Integer respiratoryRate; // 호흡수
    private Integer systolicBP; // 수축기 혈압
    private Integer diastolicBP; // 이완기 혈압
}
