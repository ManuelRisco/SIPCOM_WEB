package com.darkcode.spring.app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.darkcode.spring.app.dto.CategoriaDTO;
import com.darkcode.spring.app.dto.CategoriaSimpleDTO;
import com.darkcode.spring.app.service.CategoriaService;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<CategoriaDTO> listarCategorias() {
        return categoriaService.obtenerTodas();
    }

    @GetMapping("/simple")
    public List<CategoriaSimpleDTO> listarCategoriasSimple() {
        return categoriaService.obtenerCategoriasSimple();
    }

    @PostMapping
    public void crearCategoria(@RequestBody CategoriaDTO categoria) {
        categoriaService.crearCategoria(categoria);
    }

    @PutMapping("/{id}")
    public void editarCategoria(@PathVariable("id") int id, @RequestBody CategoriaDTO categoria) {
        categoriaService.editarCategoria(id, categoria);
    }

    @DeleteMapping("/{id}")
    public void eliminarCategoria(@PathVariable("id") int id) {
        categoriaService.eliminarCategoria(id);
    }
}
