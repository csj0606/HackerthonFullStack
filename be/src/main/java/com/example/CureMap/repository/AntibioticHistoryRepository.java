package com.example.CureMap.repository;

import com.example.CureMap.domain.AntibioticHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AntibioticHistoryRepository extends JpaRepository<com.example.CureMap.domain.AntibioticHistory, Long> {
    List<AntibioticHistory> findByPatientId(Long patientId);
}
