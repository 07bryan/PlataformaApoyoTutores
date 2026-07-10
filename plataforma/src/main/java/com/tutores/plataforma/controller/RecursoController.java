package com.tutores.plataforma.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.tutores.plataforma.model.Materia;
import com.tutores.plataforma.model.Recurso;
import com.tutores.plataforma.repository.MateriaRepository;
import com.tutores.plataforma.repository.RecursoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Map;
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

    @Autowired
    private Cloudinary cloudinary;

    @GetMapping("/listar")
    public List<Recurso> listarTodos() {
        return recursoRepository.findAll(Sort.by(Sort.Direction.ASC, "materia.nombre"));
    }

    @PostMapping("/subir")
    public ResponseEntity<?> subirRecurso(
            @RequestParam("archivo") MultipartFile archivo,
            @RequestParam("nombre") String nombre,
            @RequestParam("idMateria") String idMateria) {

        try {
            // Extraer extensión automáticamente
            String originalName = archivo.getOriginalFilename();
            String nombreSinExtension = (originalName != null)
                    ? originalName.replaceFirst("[.][^.]+$", "")
                    : "recurso_" + System.currentTimeMillis();
            String extension = (originalName != null && originalName.contains("."))
                    ? originalName.substring(originalName.lastIndexOf(".") + 1).toUpperCase()
                    : "FILE";
            //Subir a Cloudinary
            Map uploadResult = cloudinary.uploader().upload(archivo.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "auto",
                            "public_id", nombreSinExtension + "_" + UUID.randomUUID().toString().substring(0, 5),
                            "upload_preset", "ml_default",
                            "access_mode", "public"
                    ));

            String urlPublica = (String) uploadResult.get("secure_url");



            // Crear entidad Recurso
            Recurso recurso = new Recurso();
            recurso.setId("REC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            recurso.setNombreRecurso(nombre);
            recurso.setUrlArchivoPdf(urlPublica);

            recurso.setTipoRecurso(extension);
            recurso.setTematicas("General");
            recurso.setPeriodo("2026-1");

            // Vincular Materia
            Materia materia = materiaRepository.findById(idMateria)
                    .orElseThrow(() -> new RuntimeException("Materia no encontrada"));
            recurso.setMateria(materia);

            return ResponseEntity.ok(recursoRepository.save(recurso));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al subir a la nube: " + e.getMessage());
        }
    }

    /*@PostMapping("/subir")
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
    }*/

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editarRecurso(
            @PathVariable String id,
            @RequestParam String nuevoNombre) {

        return recursoRepository.findById(id)
                .map(recurso -> {
                    recurso.setNombreRecurso(nuevoNombre);
                    recursoRepository.save(recurso);
                    return ResponseEntity.ok("Nombre actualizado");
                })
                .orElse(ResponseEntity.notFound().build());
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