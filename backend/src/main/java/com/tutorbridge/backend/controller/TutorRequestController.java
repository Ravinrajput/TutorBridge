package com.tutorbridge.backend.controller;

import com.tutorbridge.backend.model.TutorRequest;
import com.tutorbridge.backend.service.TutorRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/request-tutor")
public class TutorRequestController {

    private final TutorRequestService service;

    public TutorRequestController(TutorRequestService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TutorRequest> submitRequest(@RequestBody TutorRequest request) {
        return ResponseEntity.ok(service.saveRequest(request));
    }

    @GetMapping
    public ResponseEntity<List<TutorRequest>> getAllRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }

    // ✅ ADMIN: Assign Teacher
    @PutMapping("/{id}/assign")
    public ResponseEntity<TutorRequest> assignTeacher(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        return ResponseEntity.ok(
                service.assignTeacher(id, body.get("teacherName"))
        );
    }

    // ✅ START TUITION
    @PutMapping("/{id}/start")
    public ResponseEntity<TutorRequest> startTuition(@PathVariable Long id) {
        return ResponseEntity.ok(service.startTuition(id));
    }

    // ✅ COMPLETE TUITION
    @PutMapping("/{id}/complete")
    public ResponseEntity<TutorRequest> completeTuition(@PathVariable Long id) {
        return ResponseEntity.ok(service.completeTuition(id));
    }
}
