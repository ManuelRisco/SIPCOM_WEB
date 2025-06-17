package com.darkcode.spring.app.controller;

import com.darkcode.spring.app.dto.CarritoRequestDTO;
import com.darkcode.spring.app.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/publico")
public class CarritoPublicoController {

    @Autowired
    private CarritoService carritoService;

    @PostMapping("/carrito")
    public void crearCarritoPublico(@RequestBody CarritoRequestDTO request) {
        carritoService.crearCarritoCompleto(request);
    }
}
