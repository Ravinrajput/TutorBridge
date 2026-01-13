package com.tutorbridge.backend.repository;

import com.tutorbridge.backend.model.TutorRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorRequestRepository extends JpaRepository<TutorRequest, Long> {
}
