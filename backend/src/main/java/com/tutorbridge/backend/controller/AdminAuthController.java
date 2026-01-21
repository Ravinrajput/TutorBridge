package com.tutorbridge.backend.controller;

import com.tutorbridge.backend.model.User;
import com.tutorbridge.backend.repository.UserRepository;
import com.tutorbridge.backend.service.OtpService;
import com.tutorbridge.backend.service.TwilioSmsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin
public class AdminAuthController {

    private final UserRepository userRepository;
    private final OtpService otpService;
    private final TwilioSmsService smsService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AdminAuthController(
            UserRepository userRepository,
            OtpService otpService,
            TwilioSmsService smsService
    ) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.smsService = smsService;
    }

    // STEP 1: Email + Password
    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid password"));
        }

        // Send OTP to admin phone
        String otp = otpService.generateOtp(admin.getPhone());
        smsService.sendOtp(admin.getPhone(), otp);

        return ResponseEntity.ok(Map.of(
                "message", "OTP sent",
                "phone", admin.getPhone()
        ));
    }

    // STEP 2: OTP verify
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyAdminOtp(@RequestBody Map<String, String> req) {
        String phone = req.get("phone");
        String otp = req.get("otp");

        if (!otpService.validateOtp(phone, otp)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid OTP"));
        }

        User admin = userRepository.findByPhone(phone).orElseThrow();

        return ResponseEntity.ok(Map.of(
                "id", admin.getId(),
                "email", admin.getEmail(),
                "role", admin.getRole()
        ));
    }
}
