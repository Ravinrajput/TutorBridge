package com.tutorbridge.backend.controller;

import com.tutorbridge.backend.model.Role;
import com.tutorbridge.backend.model.User;
import com.tutorbridge.backend.repository.UserRepository;
import com.tutorbridge.backend.service.OtpService;
import com.tutorbridge.backend.service.TwilioSmsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final OtpService otpService;
    private final TwilioSmsService smsService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(
            OtpService otpService,
            TwilioSmsService smsService,
            UserRepository userRepository
    ) {
        this.otpService = otpService;
        this.smsService = smsService;
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // initialize here
    }

    // 1️⃣ SEND OTP
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> req) {
        String phone = req.get("phone");

        if (phone == null || phone.length() != 10) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid phone"));
        }

        String otp = otpService.generateOtp(phone);
        smsService.sendOtp(phone, otp);

        return ResponseEntity.ok(Map.of("message", "OTP sent"));
    }

    // 2️⃣ VERIFY OTP + LOGIN (for normal users)
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {
        String phone = req.get("phone");
        String otp = req.get("otp");

        if (!otpService.validateOtp(phone, otp)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid OTP"));
        }

        // Find or create user
        User user = userRepository.findByPhone(phone)
                .orElseGet(() -> {
                    User u = new User(phone, "", Role.USER); // default role USER
                    return userRepository.save(u);
                });

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "userId", user.getId(),
                "phone", user.getPhone(),
                "role", user.getRole().name()
        ));
    }

    // 3️⃣ ADMIN LOGIN (email + password)
    @PostMapping("/admin-login")
public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> req) {
    String email = req.get("email");
    String password = req.get("password");

    if (email == null || password == null) {
        return ResponseEntity.badRequest()
                .body(Map.of("message", "Email and password required"));
    }

    User admin = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Admin not found"));

    if (admin.getRole() != Role.ADMIN) {
        return ResponseEntity.status(403)
                .body(Map.of("message", "Not an admin account"));
    }

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    if (!encoder.matches(password, admin.getPassword())) {
        return ResponseEntity.status(401)
                .body(Map.of("message", "Invalid password"));
    }

    return ResponseEntity.ok(Map.of(
            "message", "Admin login successful",
            "userId", admin.getId(),
            "role", admin.getRole().name()
    ));
}

}
