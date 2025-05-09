package com.example.CureMap.dto.patient;

import com.example.CureMap.domain.PatientStatus;
import com.example.CureMap.domain.VisitType;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class PatientRequestDto {
    private String name;
    private String ageGroup;
    private String gender;
    private LocalDate birthDate;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    private VisitType visitType;
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    private List<String> underlyingDiseases;
    private LocalDate registrationDate;
    private PatientStatus status;
    private Boolean recentlyHospitalized;

}
