package com.tutores.plataforma.repository;

import com.tutores.plataforma.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, String> {
    @Query("SELECT m FROM Materia m JOIN FETCH m.universidad")
    List<Materia> findAllWithUniversidad();

}