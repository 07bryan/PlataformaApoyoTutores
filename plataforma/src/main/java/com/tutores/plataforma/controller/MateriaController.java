package com.tutores.plataforma.controller;

import com.tutores.plataforma.model.Materia;
import com.tutores.plataforma.model.Universidad;
import com.tutores.plataforma.repository.MateriaRepository;
import com.tutores.plataforma.repository.UniversidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/materias")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MateriaController {

    @Autowired
    private MateriaRepository materiaRepository;

    @Autowired
    private UniversidadRepository universidadRepository;

    // Listar todas las materias
    @GetMapping("/listar")
    public List<Materia> listarTodas() {
        return materiaRepository.findAllWithUniversidad();
    }

    // Crear materia (Backend gestiona el ID)
    @PostMapping("/crear")
    public ResponseEntity<?> crearMateria(@RequestBody Map<String, Object> datos) {
        try {
            Materia materia = new Materia();
            // Generación de ID único automáticamente
            materia.setId("MAT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            materia.setNombre((String) datos.get("nombre"));
            materia.setCreditos((Integer) datos.get("creditos"));
            materia.setSemestre((Integer) datos.get("semestre"));

            // Vinculación con Universidad
            String idUniv = (String) datos.get("idUniversidad");
            Universidad univ = universidadRepository.findById(idUniv)
                    .orElseThrow(() -> new RuntimeException("Universidad no encontrada"));

            materia.setUniversidad(univ);

            return ResponseEntity.ok(materiaRepository.save(materia));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la materia: " + e.getMessage());
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editarMateria(@PathVariable String id, @RequestBody Map<String, Object> datos) {
        try {
            // 1. Buscar la materia existente
            return materiaRepository.findById(id).map(materia -> {

                // 2. Actualizar campos básicos
                materia.setNombre((String) datos.get("nombre"));
                materia.setCreditos((Integer) datos.get("creditos"));
                materia.setSemestre((Integer) datos.get("semestre"));

                // 3. Actualizar la relación con la universidad si cambió
                String idUniv = (String) datos.get("idUniversidad");
                if (idUniv != null) {
                    Universidad univ = universidadRepository.findById(idUniv)
                            .orElseThrow(() -> new RuntimeException("Universidad no encontrada"));
                    materia.setUniversidad(univ);
                }

                // 4. Guardar cambios
                materiaRepository.save(materia);
                return ResponseEntity.ok("Materia actualizada correctamente");

            }).orElse(ResponseEntity.notFound().build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar la materia: " + e.getMessage());
        }
    }

    // Eliminar materia
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarMateria(@PathVariable String id) {
        if (!materiaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        materiaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}