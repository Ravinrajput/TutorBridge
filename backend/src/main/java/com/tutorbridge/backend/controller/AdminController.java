package com.tutorbridge.backend.controller;

import com.tutorbridge.backend.model.TutorRequest;
import com.tutorbridge.backend.service.TutorRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final TutorRequestService service;

    public AdminController(TutorRequestService service) {
        this.service = service;
    }

    // 🔹 Admin: View all tutor requests
    @GetMapping("/requests")
    public ResponseEntity<List<TutorRequest>> getAllRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }

    // 🔹 Admin: Assign teacher
    @PutMapping("/assign-teacher/{requestId}")
    public ResponseEntity<TutorRequest> assignTeacher(
            @PathVariable Long requestId,
            @RequestParam String teacherName
    ) {
        return ResponseEntity.ok(
                service.assignTeacher(requestId, teacherName)
        );
    }
}
