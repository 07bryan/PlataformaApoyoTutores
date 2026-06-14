package com.tutores.plataforma.controller;

import com.tutores.plataforma.model.Planeacion;
import com.tutores.plataforma.model.Materia;
import com.tutores.plataforma.repository.PlaneacionRepository;
import com.tutores.plataforma.repository.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/planeacion")
@CrossOrigin(origins = "*")
public class PlaneacionController {

    @Autowired
    private PlaneacionRepository planeacionRepository;

    @Autowired
    private MateriaRepository materiaRepository;

    // Listar todas las planeaciones
    @GetMapping("/listar")
    public List<Planeacion> listarTodas() {
        return planeacionRepository.findAll();
    }

    // Crear planeación vinculada a una materia
    @PostMapping("/crear")
    public ResponseEntity<?> crearPlaneacion(@RequestBody Map<String, Object> datos) {
        try {
            Planeacion planeacion = new Planeacion();
            planeacion.setId("PLAN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

            // Relación obligatoria con Materia
            String idMateria = (String) datos.get("idMateria");
            Materia materia = materiaRepository.findById(idMateria)
                    .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

            planeacion.setMateria(materia);

            return ResponseEntity.ok(planeacionRepository.save(planeacion));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Eliminar planeación
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarPlaneacion(@PathVariable String id) {
        if (!planeacionRepository.existsById(id)) return ResponseEntity.notFound().build();
        planeacionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}