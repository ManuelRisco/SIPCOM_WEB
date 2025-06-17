package com.darkcode.spring.app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.darkcode.spring.app.dto.ProductoDTO;
import com.darkcode.spring.app.dto.ProductoSimpleDTO;
import com.darkcode.spring.app.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<ProductoDTO> listarProductos() {
        return productoService.obtenerTodos();
    }

    @PostMapping
    public void crearProducto(@RequestBody ProductoDTO producto) {
        productoService.crearProducto(producto);
    }

    @PutMapping("/{id}")
    public void editarProducto(@PathVariable("id") int id, @RequestBody ProductoDTO producto) {
        productoService.editarProducto(id, producto);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable("id") int id) {
        productoService.eliminarProducto(id);
    }

    @GetMapping("/simple")
    public List<ProductoSimpleDTO> listarProductosSimple() {
        return productoService.obtenerProductosSimple();
    }
}
