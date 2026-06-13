package com.tutores.plataforma.controller;

@RestController
@RequestMapping("/api/materias")
@CrossOrigin(origins = "http://localhost:5173")
public class MateriaController {
    @Autowired
    private MateriaRepository materiaRepository;

    @GetMapping("/por-universidad/{id}")
    public List<Materia> listarPorUniversidad(@PathVariable String id) {
        return materiaRepository.findByIdUniversidad(id);
    }
}
