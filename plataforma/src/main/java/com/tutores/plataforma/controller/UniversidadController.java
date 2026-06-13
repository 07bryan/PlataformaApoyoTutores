package com.tutores.plataforma.controller;

@RestController
@RequestMapping("/api/universidades")
@CrossOrigin(origins = "http://localhost:5173")
public class UniversidadController {
    @Autowired
    private UniversidadRepository universidadRepository;

    @GetMapping("/listar")
    public List<Universidad> listar() {
        return universidadRepository.findAll();
    }
}