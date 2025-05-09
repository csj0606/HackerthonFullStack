package com.example.CureMap.controller;

import com.example.CureMap.dto.patient.PatientRequestDto;
import com.example.CureMap.dto.patient.PatientResponseDto;
import com.example.CureMap.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patients")
public class PatientController {
    private final PatientService patientService;

    @PostMapping
    public ResponseEntity<Long> create(@RequestBody PatientRequestDto dto) {
        Long id = patientService.createPatient(dto);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/{id}")
    public PatientResponseDto get(@PathVariable Long id){
        return patientService.getPatientById(id);
    }
}
