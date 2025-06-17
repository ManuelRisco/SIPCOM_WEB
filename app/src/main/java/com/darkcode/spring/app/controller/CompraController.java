package com.darkcode.spring.app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.darkcode.spring.app.service.CompraService;

@RestController
@RequestMapping("/api/compras")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @PutMapping("/{id}/estado")
    public void actualizarEstado(@PathVariable("id") int idCompra, @RequestBody EstadoCompraRequest req) {
        compraService.actualizarEstadoCompra(idCompra, req.getEstado());
    }

    @DeleteMapping("/{id}")
    public void eliminarCompra(@PathVariable("id") int idCompra) {
        compraService.eliminarCompra(idCompra);
    }

    public static class EstadoCompraRequest {
        private String estado;
        public String getEstado() { return estado; }
        public void setEstado(String estado) { this.estado = estado; }
    }
}
