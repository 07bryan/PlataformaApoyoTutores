package com.tutores.plataforma.controller;

import com.tutores.plataforma.model.Materia;
import com.tutores.plataforma.model.Recurso;
import com.tutores.plataforma.repository.MateriaRepository;
import com.tutores.plataforma.repository.RecursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/recursos")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class RecursoController {

    @Autowired
    private RecursoRepository recursoRepository;

    @Autowired
    private MateriaRepository materiaRepository;

    @GetMapping("/listar")
    public List<Recurso> listarTodos() {
        return recursoRepository.findAll();
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearRecurso(@RequestBody Map<String, Object> datos) {
        try {
            Recurso recurso = new Recurso();

            // Generación automática del ID
            recurso.setId("REC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

            // Mapeo de todos los campos según tu tabla
            recurso.setNombreRecurso((String) datos.get("nombreRecurso"));
            recurso.setTipoRecurso((String) datos.get("tipoRecurso"));
            recurso.setTematicas((String) datos.get("tematicas"));
            recurso.setPeriodo((String) datos.get("periodo"));
            recurso.setUrlArchivoPdf((String) datos.get("urlArchivoPdf"));
            recurso.setUrlSolucionario((String) datos.get("urlSolucionario"));

            // Relación con Materia
            String idMateria = (String) datos.get("idMateria");
            Materia materia = materiaRepository.findById(idMateria)
                    .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

            recurso.setMateria(materia);

            return ResponseEntity.ok(recursoRepository.save(recurso));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear el recurso: " + e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarRecurso(@PathVariable String id) {
        if (!recursoRepository.existsById(id)) return ResponseEntity.notFound().build();
        recursoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}