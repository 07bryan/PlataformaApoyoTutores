package com.tutores.plataforma.repository;

import com.tutores.plataforma.model.Planeacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PlaneacionRepository extends JpaRepository<Planeacion, String> {

    // Cambiamos el nombre del método y usamos una consulta JPQL explícita
    @Query("SELECT p FROM Planeacion p WHERE p.usuario.id = :userId")
    List<Planeacion> findByUsuarioId(@Param("userId") String userId);
}