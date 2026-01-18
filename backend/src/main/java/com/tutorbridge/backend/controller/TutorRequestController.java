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

    // ✅ User: submit tutor request
    @PostMapping
    public ResponseEntity<TutorRequest> submitRequest(
            @Valid @RequestBody TutorRequest request) {
        return ResponseEntity.ok(service.saveRequest(request));
    }

    // ✅ Admin: get all requests
    @GetMapping
    public ResponseEntity<List<TutorRequest>> getAllRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }

    // ✅ User: my requests
    @GetMapping("/my-requests")
    public ResponseEntity<List<TutorRequest>> getMyRequests(
            @RequestParam String phone) {
        return ResponseEntity.ok(service.getRequestsByPhone(phone));
    }

    // ✅ ADMIN: ASSIGN TEACHER (THIS WAS MISSING ❌)
    @PutMapping("/{id}/assign")
    public ResponseEntity<TutorRequest> assignTeacher(
            @PathVariable Long id,
            @RequestParam String teacherName
    ) {
        return ResponseEntity.ok(service.assignTeacher(id, teacherName));
    }

    // Admin: start tuition
    @PutMapping("/{id}/start")
    public ResponseEntity<TutorRequest> startTuition(
            @PathVariable Long id) {
        return ResponseEntity.ok(service.startTuition(id));
    }

    // Admin: complete tuition
    @PutMapping("/{id}/complete")
    public ResponseEntity<TutorRequest> completeTuition(
            @PathVariable Long id) {
        return ResponseEntity.ok(service.completeTuition(id));
    }
    
}
