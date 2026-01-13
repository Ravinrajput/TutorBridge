package com.tutorbridge.backend.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioSmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String fromNumber;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
    }

    public void sendOtp(String phone, String otp) {
        Message.creator(
                new com.twilio.type.PhoneNumber("+91" + phone),
                new com.twilio.type.PhoneNumber(fromNumber),
                "Your TutorBridge OTP is: " + otp
        ).create();
    }
}
