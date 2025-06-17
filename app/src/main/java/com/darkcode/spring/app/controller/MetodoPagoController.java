package com.darkcode.spring.app.controller;

import com.darkcode.spring.app.dto.MetodoPagoDTO;
import com.darkcode.spring.app.service.MetodoPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metodos-pago")
public class MetodoPagoController {

    @Autowired
    private MetodoPagoService metodoPagoService;

    @GetMapping
    public List<MetodoPagoDTO> obtenerTodos() {
        return metodoPagoService.obtenerTodos();
    }

    @PostMapping
    public void crearMetodoPago(@RequestBody MetodoPagoDTO metodo) {
        metodoPagoService.crearMetodoPago(metodo);
    }

    @PutMapping("/{id}")
    public void editarMetodoPago(@PathVariable int id, @RequestBody MetodoPagoDTO metodo) {
        metodoPagoService.editarMetodoPago(id, metodo);
    }

    @DeleteMapping("/{id}")
    public void eliminarMetodoPago(@PathVariable int id) {
        metodoPagoService.eliminarMetodoPago(id);
    }
}
