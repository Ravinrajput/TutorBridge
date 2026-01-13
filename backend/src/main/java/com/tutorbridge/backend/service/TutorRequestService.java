package com.tutorbridge.backend.service;

import com.tutorbridge.backend.model.TutorRequest;
import com.tutorbridge.backend.repository.TutorRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorRequestService {

    private final TutorRequestRepository repository;

    public TutorRequestService(TutorRequestRepository repository) {
        this.repository = repository;
    }

    // Save a new request
    public TutorRequest saveRequest(TutorRequest request) {
        return repository.save(request);
    }

    // Get all requests
    public List<TutorRequest> getAllRequests() {
        return repository.findAll();
    }
}
