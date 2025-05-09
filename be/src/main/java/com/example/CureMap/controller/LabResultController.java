package com.example.CureMap.controller;

import com.example.CureMap.dto.labResult.LabResultRequestDto;
import com.example.CureMap.dto.labResult.LabResultResponseDto;
import com.example.CureMap.service.LabResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients/{id}/lab-result")
@RequiredArgsConstructor
public class LabResultController {

    private final LabResultService labResultService;

    @PostMapping
    public ResponseEntity<LabResultResponseDto> createLabResult(@PathVariable Long id, @RequestBody LabResultRequestDto dto){
        dto.setPatientId(id);
        LabResultResponseDto response = labResultService.createLabResult(dto);
        return ResponseEntity.ok(response);
    }
}
