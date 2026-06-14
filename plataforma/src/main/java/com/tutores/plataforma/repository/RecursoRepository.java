package com.tutores.plataforma.repository;

import com.tutores.plataforma.model.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, String> {

    // Usamos JPQL para decir explícitamente: "filtra por el ID del objeto materia relacionado"
    @Query("SELECT r FROM Recurso r WHERE r.materia.id = :materiaId")
    List<Recurso> findByMateriaId(@Param("materiaId") String materiaId);
}