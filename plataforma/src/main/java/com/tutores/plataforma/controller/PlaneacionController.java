package com.tutores.plataforma.controller;

@RestController
@RequestMapping("/api/planeacion")
@CrossOrigin(origins = "http://localhost:5173")
public class PlaneacionController {
    @Autowired
    private PlaneacionRepository planeacionRepository;

    @PostMapping("/guardar")
    public ResponseEntity<?> guardar(@RequestBody Planeacion planeacion) {
        // Aquí podrías agregar lógica para validar que el tutor exista
        return ResponseEntity.ok(planeacionRepository.save(planeacion));
    }
}