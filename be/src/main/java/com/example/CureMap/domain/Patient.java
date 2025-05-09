package com.example.CureMap.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder

public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long id;

    private String name;
    private String gender;
    private LocalDate birthDate;

    @Column(name = "recent_hospitalized")
    private Boolean recentlyHospitalized;

    @Enumerated(EnumType.STRING)
    private AgeGroup ageGroup;

    @Enumerated(EnumType.STRING)
    private VisitType visitType;

    @ElementCollection
    private List<String> underlyingDiseases;

    private LocalDate registrationDate;

    @Enumerated(EnumType.STRING)
    private PatientStatus status;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LabResult> labResults = new ArrayList<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AntibioticHistory> antibioticHistories = new ArrayList<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PredictionResult> predictionResults = new ArrayList<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AntibioticRecommendation> antibioticRecommendations = new ArrayList<>();

}
