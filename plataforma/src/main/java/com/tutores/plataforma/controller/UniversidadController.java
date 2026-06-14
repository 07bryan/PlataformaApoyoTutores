package com.tutores.plataforma.controller;

import com.tutores.plataforma.model.Universidad;
import com.tutores.plataforma.repository.UniversidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/universidades")
//@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class UniversidadController {

    @Autowired
    private UniversidadRepository universidadRepository;

    // 1. Listar todas las universidades
    @GetMapping("/listar")
    public List<Universidad> listarTodas() {
        List<Universidad> lista = universidadRepository.findAll();
        System.out.println("DEBUG: Se encontraron " + lista.size() + " universidades.");
        return lista;
    }

    // 2. Crear una nueva universidad
    @PostMapping("/crear")
    public ResponseEntity<?> crearUniversidad(@RequestBody Universidad univ) {
        try {
            // Generamos un ID único si no viene uno, o usamos un prefijo claro
            if (univ.getId() == null || univ.getId().isEmpty()) {
                univ.setId("U-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            }
            return ResponseEntity.ok(universidadRepository.save(univ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la universidad: " + e.getMessage());
        }
    }

    // 3. Eliminar universidad
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarUniversidad(@PathVariable String id) {
        if (!universidadRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Nota: Si una universidad tiene materias asociadas, esto fallará por restricción de FK.
        // Asegúrate de que tu entidad tenga 'cascade = CascadeType.ALL'
        // o borra primero las materias dependientes.
        universidadRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}