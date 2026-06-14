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
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Materia getMateria() { return materia; }
    public void setMateria(Materia materia) { this.materia = materia; }

    public String getTipoRecurso() { return tipoRecurso; }
    public void setTipoRecurso(String tipoRecurso) { this.tipoRecurso = tipoRecurso; }

    public String getNombreRecurso() { return nombreRecurso; }
    public void setNombreRecurso(String nombreRecurso) { this.nombreRecurso = nombreRecurso; }

    public String getTematicas() { return tematicas; }
    public void setTematicas(String tematicas) { this.tematicas = tematicas; }

    public String getPeriodo() { return periodo; }
    public void setPeriodo(String periodo) { this.periodo = periodo; }

    public String getUrlArchivoPdf() { return urlArchivoPdf; }
    public void setUrlArchivoPdf(String urlArchivoPdf) { this.urlArchivoPdf = urlArchivoPdf; }

    public String getUrlSolucionario() { return urlSolucionario; }
    public void setUrlSolucionario(String urlSolucionario) { this.urlSolucionario = urlSolucionario; }
}