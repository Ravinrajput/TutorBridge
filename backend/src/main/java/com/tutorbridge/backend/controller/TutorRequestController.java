package com.tutorbridge.backend.controller;

import com.tutorbridge.backend.model.TutorRequest;
import com.tutorbridge.backend.service.TutorRequestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/request-tutor")
@CrossOrigin(origins = "*")
public class TutorRequestController {

    private final TutorRequestService service;

    public TutorRequestController(TutorRequestService service) {
        this.service = service;
    }

    // Submit a tutor request
    @PostMapping
    public ResponseEntity<?> submitRequest(@Valid @RequestBody TutorRequest request) {
        return ResponseEntity.ok(service.saveRequest(request));
    }

    // Get all tutor requests
    @GetMapping
    public ResponseEntity<List<TutorRequest>> getAllRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }
}
