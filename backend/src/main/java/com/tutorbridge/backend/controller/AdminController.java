package com.tutorbridge.backend.controller;

import com.tutorbridge.backend.model.Admin;
import com.tutorbridge.backend.model.TutorRequest;
import com.tutorbridge.backend.repository.AdminRepository;
import com.tutorbridge.backend.service.TutorRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final TutorRequestService tutorRequestService;
    private final AdminRepository adminRepository;

    public AdminController(TutorRequestService tutorRequestService,
                           AdminRepository adminRepository) {
        this.tutorRequestService = tutorRequestService;
        this.adminRepository = adminRepository;
    }

    // View all tutor requests (adminId required)
    @GetMapping("/requests")
    public ResponseEntity<?> getAllRequests(@RequestParam Long adminId) {
        Optional<Admin> adminOpt = adminRepository.findById(adminId);
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(403).body("Unauthorized: Admin not found");
        }

        List<TutorRequest> requests = tutorRequestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    // Assign teacher (adminId required)
    @PutMapping("/assign-teacher/{requestId}")
    public ResponseEntity<?> assignTeacher(
            @RequestParam Long adminId,
            @PathVariable Long requestId,
            @RequestParam String teacherName
    ) {
        Optional<Admin> adminOpt = adminRepository.findById(adminId);
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(403).body("Unauthorized: Admin not found");
        }

        TutorRequest updatedRequest = tutorRequestService.assignTeacher(requestId, teacherName);
        return ResponseEntity.ok(updatedRequest);
    }
}
