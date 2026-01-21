package com.tutorbridge.backend.service;

import com.tutorbridge.backend.model.RequestStatus;
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

    // Create request
    public TutorRequest saveRequest(TutorRequest request) {
        request.setStatus(RequestStatus.REQUEST_SUBMITTED);
        return repository.save(request);
    }

    // Get all
    public List<TutorRequest> getAllRequests() {
        return repository.findAll();
    }

    // Assign teacher
    public TutorRequest assignTeacher(Long id, String teacherName) {
        TutorRequest request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setAssignedTeacher(teacherName);
        request.setStatus(RequestStatus.TEACHER_ASSIGNED);

        return repository.save(request);
    }

    // Start tuition
    public TutorRequest startTuition(Long id) {
        TutorRequest request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.TUITION_STARTED);
        return repository.save(request);
    }

    // Complete tuition
    public TutorRequest completeTuition(Long id) {
        TutorRequest request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.COMPLETED);
        return repository.save(request);
    }
}
