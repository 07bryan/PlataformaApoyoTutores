package com.tutores.plataforma.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties("materias")
    private Universidad universidad;

    // Getters y Setters

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public int getCreditos() { return creditos; }
    public void setCreditos(int creditos) { this.creditos = creditos; }
    public int getSemestre() { return semestre; }
    public void setSemestre(int semestre) { this.semestre = semestre; }
    public Universidad getUniversidad() { return universidad; }
    public void setUniversidad(Universidad universidad) { this.universidad = universidad; }

}