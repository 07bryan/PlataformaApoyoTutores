package com.tutores.plataforma.controller;

import com.tutores.plataforma.model.Usuario;
import com.tutores.plataforma.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository tutorRepository;

    // Endpoint para registrar usuarios con credenciales completas
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarTutor(@RequestBody Usuario tutor) {
        if(tutorRepository.findByCorreo(tutor.getCorreo()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El correo ya está registrado"));
        }
        // Nota: En producción, aquí aplicaremos BCryptPasswordEncoder para encriptar la clave
        Usuario guardado = tutorRepository.save(tutor);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    // Endpoint de Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        String correo = credenciales.get("correo");
        String password = credenciales.get("password");

        Optional<Usuario> usuarioOpt = tutorRepository.findByCorreo(correo);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // Validación temporal en texto plano
            if (usuario.getPassword().equals(password)) {
                return ResponseEntity.ok(Map.of(
                        "mensaje", "Inicio de sesión exitoso",
                        "nombre", usuario.getNombre(),
                        "rol", usuario.getRol()
                ));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Credenciales incorrectas"));
    }
}