package com.tutorbridge.backend.service;

import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final int OTP_EXPIRY_SECONDS = 300; // 5 minutes
    private final Map<String, OtpData> otpStore = new ConcurrentHashMap<>();

    public String generateOtp(String phone) {
        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        otpStore.put(phone, new OtpData(otp, Instant.now()));
        return otp;
    }

    public boolean validateOtp(String phone, String otp) {
        OtpData data = otpStore.get(phone);
        if (data == null) return false;

        boolean isExpired = Instant.now().isAfter(data.createdAt().plusSeconds(OTP_EXPIRY_SECONDS));
        if (isExpired) {
            otpStore.remove(phone);
            return false;
        }

        if (data.otp().equals(otp)) {
            otpStore.remove(phone); // one-time use
            return true;
        }

        return false;
    }

    // record supported in Java 24
    private record OtpData(String otp, Instant createdAt) {}
}
