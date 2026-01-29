package com.tutorbridge.backend.service;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final int OTP_EXPIRY_SECONDS = 300; // 5 minutes
    private static final long OTP_COOLDOWN_MILLIS = 60_000; // 60 seconds

    private final Map<String, OtpData> otpStore = new ConcurrentHashMap<>();
    private final Map<String, Instant> lastOtpRequestTime = new ConcurrentHashMap<>();

    // ✅ RATE LIMIT CHECK
    public boolean canSendOtp(String phone) {
        Instant lastTime = lastOtpRequestTime.get(phone);
        Instant now = Instant.now();

        if (lastTime != null && now.isBefore(lastTime.plusMillis(OTP_COOLDOWN_MILLIS))) {
            return false;
        }

        lastOtpRequestTime.put(phone, now);
        return true;
    }

    // ✅ GENERATE OTP
    public String generateOtp(String phone) {
        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        otpStore.put(phone, new OtpData(otp, Instant.now()));
        return otp;
    }

    // ✅ VALIDATE OTP
    public boolean validateOtp(String phone, String otp) {
        OtpData data = otpStore.get(phone);
        if (data == null) return false;

        boolean isExpired = Instant.now()
                .isAfter(data.createdAt().plusSeconds(OTP_EXPIRY_SECONDS));

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

    // Java record (works fine on Java 21+)
    private record OtpData(String otp, Instant createdAt) {}
}
