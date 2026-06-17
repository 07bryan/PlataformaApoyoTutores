package com.tutores.plataforma.controller;

import com.tutores.plataforma.model.Materia;
import com.tutores.plataforma.model.Recurso;
import com.tutores.plataforma.repository.MateriaRepository;
import com.tutores.plataforma.repository.RecursoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/recursos")
@CrossOrigin(origins = "*")
public class RecursoController {

    private static final Logger logger = LoggerFactory.getLogger(RecursoController.class);
    // Asegúrate de que esta carpeta exista en tu PC: C:/tutores_data/uploads/
    private final String RUTA_DESTINO = "C:/tutores_data/uploads/";

    @Autowired
    private RecursoRepository recursoRepository;

    @Autowired
    private MateriaRepository materiaRepository;

    @GetMapping("/listar")
    public List<Recurso> listarTodos() {
        return recursoRepository.findAll();
    }

    @PostMapping("/subir")
    public ResponseEntity<?> subirRecurso(
            @RequestParam("archivo") MultipartFile archivo,
            @RequestParam("nombre") String nombre,
            @RequestParam("idMateria") String idMateria) {

        try {
            // 1. Asegurar que el directorio existe
            Path root = Paths.get(RUTA_DESTINO);
            if (!Files.exists(root)) Files.createDirectories(root);

            // 2. Generar nombre único
            String nombreArchivoUnico = UUID.randomUUID().toString() + "_" + archivo.getOriginalFilename();
            Path destino = root.resolve(nombreArchivoUnico);

            // 3. Copiar archivo
            Files.copy(archivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

            // 4. Extraer extensión automáticamente
            String originalName = archivo.getOriginalFilename();
            String extension = (originalName != null && originalName.contains("."))
                    ? originalName.substring(originalName.lastIndexOf(".") + 1).toUpperCase()
                    : "FILE";

            // 5. Crear entidad Recurso
            Recurso recurso = new Recurso();
            recurso.setId("REC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            recurso.setNombreRecurso(nombre);
            recurso.setTipoRecurso(extension); // Tipo basado en extensión
            recurso.setUrlArchivoPdf("/uploads/" + nombreArchivoUnico);

            // Asignación de valores por defecto para campos NOT NULL de tu BD
            recurso.setTematicas("General");
            recurso.setPeriodo("2026-1");

            // 6. Vincular Materia
            Materia materia = materiaRepository.findById(idMateria)
                    .orElseThrow(() -> new RuntimeException("Materia no encontrada"));
            recurso.setMateria(materia);

            return ResponseEntity.ok(recursoRepository.save(recurso));

        } catch (IOException e) {
            logger.error("Error al guardar archivo en disco", e);
            return ResponseEntity.internalServerError().body("Error de IO: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error al procesar la subida", e);
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarRecurso(@PathVariable String id) {
        // 1. Buscar el recurso para obtener la ruta del archivo
        Recurso recurso = recursoRepository.findById(id)
                .orElse(null);

        if (recurso == null) return ResponseEntity.notFound().build();

        // 2. Borrar archivo físico del servidor
        try {
            // Obtenemos la ruta relativa y reconstruimos la absoluta
            String rutaRelativa = recurso.getUrlArchivoPdf(); // Ej: /uploads/xyz.jpg
            Path pathArchivo = Paths.get("C:/tutores_data" + rutaRelativa);
            Files.deleteIfExists(pathArchivo);
        } catch (IOException e) {
            logger.error("No se pudo borrar el archivo físico", e);
        }

        // 3. Borrar de la BD
        recursoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}