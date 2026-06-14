package com.tutores.plataforma.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "planeacion_tutorias")
public class Planeacion {
    @Id
    @Column(name = "id_planeacion", length = 50)
    private String id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_materia", nullable = false)
    private Materia materia;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_tutoria", nullable = false)
    private Date fechaTutoria;

    @Column(name = "nombre_estudiante", nullable = false, length = 150)
    private String nombreEstudiante;

    @Column(name = "objetivo_aprendizaje", columnDefinition = "TEXT", nullable = false)
    private String objetivoAprendizaje;

    @Column(name = "actividades_planificadas", columnDefinition = "TEXT", nullable = false)
    private String actividadesPlanificadas;

    @Column(name = "recursos_utilizados", columnDefinition = "TEXT")
    private String recursosUtilizados;

    @Column(name = "observaciones_acuerdos", columnDefinition = "TEXT")
    private String observacionesAcuerdos;

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario u) { this.usuario = u; }
    public Materia getMateria() { return materia; }
    public void setMateria(Materia m) { this.materia = m; }
    public Date getFechaTutoria() { return fechaTutoria; }
    public void setFechaTutoria(Date f) { this.fechaTutoria = f; }
    public String getNombreEstudiante() { return nombreEstudiante; }
    public void setNombreEstudiante(String ne) { this.nombreEstudiante = ne; }
    public String getObjetivoAprendizaje() { return objetivoAprendizaje; }
    public void setObjetivoAprendizaje(String oa) { this.objetivoAprendizaje = oa; }
}