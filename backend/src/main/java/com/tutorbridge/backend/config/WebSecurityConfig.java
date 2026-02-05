package com.tutorbridge.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // disable CSRF for dev
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/").permitAll()  // allow home page
                .anyRequest().permitAll()          // allow all other endpoints
            );
        return http.build();
    }
}
