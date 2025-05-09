package com.example.CureMap.controller;

import com.example.CureMap.dto.vitals.VitalsRequestDto;
import com.example.CureMap.dto.vitals.VitalsResponseDto;
import com.example.CureMap.service.VitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patients/{id}/vitals")
public class VitalController {

    private final VitalService vitalsService;

    @PostMapping
    public ResponseEntity<VitalsResponseDto> saveVitals(@PathVariable Long id, @RequestBody VitalsRequestDto dto) {
        dto.setPatientId(id);
        VitalsResponseDto response = vitalsService.saveVitals(dto);
        return ResponseEntity.ok(response);
    }

}
