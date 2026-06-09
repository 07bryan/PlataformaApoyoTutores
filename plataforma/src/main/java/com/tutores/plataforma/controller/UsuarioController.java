package com.tutores.plataforma.controller;

import com.tutores.plataforma.model.Usuario;
import com.tutores.plataforma.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios") // Ruta base más lógica para esta tabla
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // 1. Endpoint para crear un usuario de prueba
    // Ajustado para pedir los campos que realmente tienes en tu tabla
    @GetMapping("/crear")
    public Usuario crearUsuario(
            @RequestParam String id,
            @RequestParam String nombre,
            @RequestParam String correo,
            @RequestParam String password,
            @RequestParam String rol) {

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setId(id);
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setCorreo(correo);
        nuevoUsuario.setPassword(password); // En producción, recuerda encriptar esto
        nuevoUsuario.setRol(rol);

        return usuarioRepository.save(nuevoUsuario);
    }

    // 2. Endpoint para listar todos los usuarios
    @GetMapping("/listar")
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/admin/crear")
    public ResponseEntity<?> crearUsuarioPorAdmin(
            @RequestBody Map<String, String> datos, // Recibimos un mapa genérico
            @RequestHeader("rol-admin") String rolDelQueCrea) {

        if (!"SUPER_ADMIN".equals(rolDelQueCrea)) {
            return ResponseEntity.status(403).body("Acceso denegado.");
        }

        // Construcción manual: El control absoluto es tuyo
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setId(datos.get("id"));
        nuevoUsuario.setNombre(datos.get("nombre"));
        nuevoUsuario.setCorreo(datos.get("correo"));
        nuevoUsuario.setPassword(datos.get("password"));
        nuevoUsuario.setRol(datos.get("rol"));

        return ResponseEntity.ok(usuarioRepository.save(nuevoUsuario));
    }
}