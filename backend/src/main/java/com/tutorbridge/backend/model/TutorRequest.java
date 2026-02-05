package com.tutorbridge.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

@Entity
@Table(name = "tutor_requests")
public class TutorRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String parentName;

    @NotBlank
    private String phone;

    @Email
    private String email;

    @NotBlank
    private String studentName;

    @NotBlank
    private String grade;

    private String board;
    private String subjects;
    private String city;
    private String area;
    private String mode;
    private String timePreference;
    private String notes;

    // 🔹 ADMIN FIELDS
    @Column(name = "assigned_teacher")
    private String assignedTeacher;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public TutorRequest() {}

    // 🔹 AUTO VALUES ON CREATE
    @PrePersist
    protected void onCreate() {
        this.status = RequestStatus.REQUEST_SUBMITTED;
        this.createdAt = LocalDateTime.now();
    }

    // -------- GETTERS & SETTERS --------

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getParentName() { return parentName; }
    public void setParentName(String parentName) { this.parentName = parentName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getBoard() { return board; }
    public void setBoard(String board) { this.board = board; }

    public String getSubjects() { return subjects; }
    public void setSubjects(String subjects) { this.subjects = subjects; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getTimePreference() { return timePreference; }
    public void setTimePreference(String timePreference) { this.timePreference = timePreference; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getAssignedTeacher() { return assignedTeacher; }
    public void setAssignedTeacher(String assignedTeacher) { this.assignedTeacher = assignedTeacher; }

    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
