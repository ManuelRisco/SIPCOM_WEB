package com.darkcode.spring.app.controller;

import com.darkcode.spring.app.dto.MetodoPagoDTO;
import com.darkcode.spring.app.service.MetodoPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/publico")
public class MetodoPagoPublicoController {

    @Autowired
    private MetodoPagoService metodoPagoService;

    @GetMapping("/metodopago")
    public List<MetodoPagoDTO> obtenerTodosPublico() {
        return metodoPagoService.obtenerTodos();
    }
}