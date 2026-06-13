package com.tutores.plataforma.repository;

import com.tutores.plataforma.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, String> {
    // Método para filtrar materias por universidad
    List<Materia> findByIdUniversidad(String idUniversidad);
}