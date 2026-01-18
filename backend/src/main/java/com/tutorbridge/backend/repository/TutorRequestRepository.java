package com.tutorbridge.backend.repository;

import com.tutorbridge.backend.model.TutorRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutorRequestRepository extends JpaRepository<TutorRequest, Long> {
    List<TutorRequest> findByPhone(String phone);
}
