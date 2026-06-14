package com.tutores.plataforma.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "universidades")
public class Universidad {
    @Id
    @Column(name = "id_universidad", length = 50)
    private String id;

    @Column(nullable = false, unique = true, length = 150)
    private String nombre;

    @OneToMany(mappedBy = "universidad", cascade = CascadeType.ALL)
    private List<Materia> materias;

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public List<Materia> getMaterias() { return materias; }
    public void setMaterias(List<Materia> materias) { this.materias = materias; }
}