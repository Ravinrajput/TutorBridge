package com.tutorbridge.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String phone;

    public User() {}

    public User(String phone) {
        this.phone = phone;
    }

    public Long getId() {
        return id;
    }

    public String getPhone() {
        return phone;
    }
}
