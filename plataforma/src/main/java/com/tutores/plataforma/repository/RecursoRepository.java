package com.tutores.plataforma.repository;

import com.tutores.plataforma.model.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, String> {
    // Método para filtrar recursos por materia
    List<Recurso> findByIdMateria(String idMateria);
}