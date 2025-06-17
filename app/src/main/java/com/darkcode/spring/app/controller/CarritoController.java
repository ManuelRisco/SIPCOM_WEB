package com.darkcode.spring.app.controller;

import com.darkcode.spring.app.dto.CarritoRequestDTO;
import com.darkcode.spring.app.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @PostMapping("/publico")
    public void crearCarritoPublico(@RequestBody CarritoRequestDTO request) {
        carritoService.crearCarritoCompleto(request);
    }
}
