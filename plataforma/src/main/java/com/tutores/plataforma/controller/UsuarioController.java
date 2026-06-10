package com.tutores.plataforma.controller;

import com.tutores.plataforma.model.Usuario;
import com.tutores.plataforma.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tutores.plataforma.service.IdService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios") // Ruta base más lógica para esta tabla

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private IdService idService;

    // 2. Endpoint para listar todos los usuarios
    @GetMapping("/listar")
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/admin/crear")
    public ResponseEntity<?> crearUsuarioPorAdmin(@RequestBody Map<String, String> datos) {
        Usuario nuevoUsuario = new Usuario();
        String nuevoId = idService.generarNuevoId();
        nuevoUsuario.setId(nuevoId);
        nuevoUsuario.setNombre(datos.get("nombre"));
        nuevoUsuario.setCorreo(datos.get("correo"));
        nuevoUsuario.setPassword(datos.get("password"));
        nuevoUsuario.setRol(datos.get("rol"));

        return ResponseEntity.ok(usuarioRepository.save(nuevoUsuario));
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarUsuario(
            @PathVariable String id,
            @RequestHeader("rol-admin") String rolDelQueCrea) {

        if (!"SUPER_ADMIN".equals(rolDelQueCrea)) {
            return ResponseEntity.status(403).body("Acceso denegado.");
        }

        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }

        usuarioRepository.deleteById(id);
        return ResponseEntity.ok("Usuario eliminado exitosamente.");
    }
}