package com.tutorbridge.backend.controller;

import com.tutorbridge.backend.model.Admin;
import com.tutorbridge.backend.repository.AdminRepository;
import com.tutorbridge.backend.service.OtpService;
import com.tutorbridge.backend.service.TwilioSmsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/auth")
public class AdminAuthController {

    private final AdminRepository adminRepository;
    private final OtpService otpService;
    private final TwilioSmsService smsService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AdminAuthController(AdminRepository adminRepository,
                               OtpService otpService,
                               TwilioSmsService smsService) {
        this.adminRepository = adminRepository;
        this.otpService = otpService;
        this.smsService = smsService;
    }

    // STEP 1: Email + Password login
    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");

        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid password"));
        }

        // Generate OTP
        String otp = otpService.generateOtp(admin.getPhone());
        smsService.sendOtp(admin.getPhone(), otp);

        return ResponseEntity.ok(Map.of(
                "userId", admin.getId(),
                "role", "ADMIN",
                "phone", admin.getPhone(),
                "message", "OTP sent"
        ));
    }

    // STEP 2: Verify OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {
        String phone = req.get("phone");
        String otp = req.get("otp");

        if (!otpService.validateOtp(phone, otp)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid OTP"));
        }

        Admin admin = adminRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return ResponseEntity.ok(Map.of(
                "userId", admin.getId(),
                "email", admin.getEmail(),
                "role", "ADMIN",
                "message", "Login successful"
        ));
    }
}
