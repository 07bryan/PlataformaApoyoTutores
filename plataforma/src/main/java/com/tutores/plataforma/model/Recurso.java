package com.tutores.plataforma.model;

import jakarta.persistence.*;

@Entity
@Table(name = "recursos_pedagogicos")
public class Recurso {
    @Id
    @Column(name = "id_recurso", length = 50)
    private String id;

    @ManyToOne
    @JoinColumn(name = "id_materia")
    private Materia materia;

    @Column(name = "tipo_recurso", nullable = false, length = 50)
    private String tipoRecurso;

    @Column(name = "nombre_recurso", nullable = false, length = 200)
    private String nombreRecurso;

    @Column(columnDefinition = "TEXT")
    private String tematicas;

    private String periodo;

    @Column(name = "url_archivo_pdf", nullable = false, length = 500)
    private String urlArchivoPdf;

    @Column(name = "url_solucionario", length = 500)
    private String urlSolucionario;

    // Getters y Setters
}