package com.tutores.plataforma.service;

import org.springframework.stereotype.Service;

@Service
public class IdService {

    public String generarNuevoId() {
        // Lógica para obtener el último ID y sumar 1
        // Ejemplo simple: buscar último ID, extraer número, incrementar y formatear
        return "USR-" + System.currentTimeMillis(); // O tu lógica de negocio
    }
}