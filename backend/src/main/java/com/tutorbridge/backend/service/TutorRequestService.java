 package com.tutorbridge.backend.service;

import com.tutorbridge.backend.model.RequestStatus;
import com.tutorbridge.backend.model.TutorRequest;
import com.tutorbridge.backend.repository.TutorRequestRepository;
import org.springframework.stereotype.Service;
import com.tutorbridge.backend.model.RequestStatus;


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

    // Assign a teacher to a request
    public TutorRequest assignTeacher(Long requestId, String teacherName) {
        TutorRequest request = repository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setAssignedTeacher(teacherName);
        request.setStatus(RequestStatus.TEACHER_ASSIGNED);

        return repository.save(request);
    }
    public List<TutorRequest> getRequestsByPhone(String phone) {
    return repository.findByPhone(phone);
}

public TutorRequest startTuition(Long requestId) {
    TutorRequest request = repository.findById(requestId)
        .orElseThrow(() -> new RuntimeException("Request not found"));
    request.setStatus(RequestStatus.TUITION_STARTED);
    return repository.save(request);
}

public TutorRequest completeTuition(Long requestId) {
    TutorRequest request = repository.findById(requestId)
        .orElseThrow(() -> new RuntimeException("Request not found"));
    request.setStatus(RequestStatus.COMPLETED);
    return repository.save(request);
}



}
