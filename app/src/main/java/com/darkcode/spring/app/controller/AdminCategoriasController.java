package com.darkcode.spring.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminCategoriasController {
    @GetMapping("/admin-categorias")
    public String adminCategorias() {
        return "admin-categorias";
    }
}
