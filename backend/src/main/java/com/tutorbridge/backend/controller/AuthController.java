package com.tutorbridge.backend.controller;

import com.tutorbridge.backend.model.User;
import com.tutorbridge.backend.repository.UserRepository;
import com.tutorbridge.backend.service.OtpService;
import com.tutorbridge.backend.service.TwilioSmsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final OtpService otpService;
    private final TwilioSmsService smsService;
    private final UserRepository userRepository;

    public AuthController(
            OtpService otpService,
            TwilioSmsService smsService,
            UserRepository userRepository
    ) {
        this.otpService = otpService;
        this.smsService = smsService;
        this.userRepository = userRepository;
    }

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

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {
        String phone = req.get("phone");
        String otp = req.get("otp");

        if (!otpService.validateOtp(phone, otp)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid OTP"));
        }

        User user = userRepository.findByPhone(phone)
                .orElseGet(() -> userRepository.save(new User(phone)));

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "userId", user.getId()
        ));
    }
}
