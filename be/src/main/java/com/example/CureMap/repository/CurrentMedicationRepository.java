package com.example.CureMap.repository;

import com.example.CureMap.domain.CurrentMedication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CurrentMedicationRepository extends JpaRepository<CurrentMedication, Long> {
    List<CurrentMedication> findByPatientId(Long patientId);
}
