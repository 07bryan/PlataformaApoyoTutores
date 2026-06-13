package com.tutores.plataforma.controller;

@RestController
@RequestMapping("/api/recursos")
@CrossOrigin(origins = "http://localhost:5173")
public class RecursoController {
    @Autowired
    private RecursoRepository recursoRepository;

    @GetMapping("/materia/{id}")
    public List<Recurso> listarPorMateria(@PathVariable String id) {
        return recursoRepository.findByIdMateria(id);
    }
}
