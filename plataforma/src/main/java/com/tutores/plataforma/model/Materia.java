package com.tutores.plataforma.model;

import jakarta.persistence.*;

@Entity
@Table(name = "materias")
public class Materia {
    @Id
    @Column(name = "id_materia", length = 50)
    private String id;

    @Column(nullable = false, length = 150)
    private String nombre;

    private int creditos;
    private int semestre;

    @ManyToOne
    @JoinColumn(name = "id_universidad", nullable = false)
    private Universidad universidad;

    // Getters y Setters
}