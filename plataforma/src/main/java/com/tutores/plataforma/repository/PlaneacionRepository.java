package com.tutores.plataforma.repository;

import com.tutores.plataforma.model.Planeacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlaneacionRepository extends JpaRepository<Planeacion, String> {
    // Permite listar todas las tutorías planeadas por un tutor específico
    List<Planeacion> findByIdUsuario(String idUsuario);
}