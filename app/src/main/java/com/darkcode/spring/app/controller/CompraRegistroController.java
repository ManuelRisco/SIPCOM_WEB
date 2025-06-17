package com.darkcode.spring.app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.security.Principal;
import java.util.Map;
import com.darkcode.spring.app.service.CompraRegistroService;
import com.darkcode.spring.app.dto.ProveedorSimpleDTO;
import com.darkcode.spring.app.dto.ProductoSimpleDTO;
import com.darkcode.spring.app.dto.CompraHistorialDTO;

@RestController
public class CompraRegistroController {

    @Autowired
    private CompraRegistroService compraRegistroService;

    @GetMapping("/api/proveedores-simple")
    public List<ProveedorSimpleDTO> listarProveedoresSimple() {
        return compraRegistroService.obtenerProveedoresSimple();
    }

    @GetMapping("/api/productos-simple")
    public List<ProductoSimpleDTO> productosSimple() {
        return compraRegistroService.obtenerProductosSimple();
    }

    @PostMapping("/api/compras")
    public void registrarCompra(@RequestBody Map<String, Object> body, Principal principal) {
        compraRegistroService.registrarCompra(body, principal.getName());
    }

    @GetMapping("/api/compras-historial")
    public List<CompraHistorialDTO> historialCompras() {
        return compraRegistroService.obtenerHistorialCompras();
    }
}
