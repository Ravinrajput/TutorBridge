package com.tutorbridge.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableAsync
@SpringBootApplication
public class TutorBridgeBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TutorBridgeBackendApplication.class, args);
	}

}

