package com.darkcode.spring.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminProductosController {
    @GetMapping("/admin-productos")
    public String adminProductos() {
        return "admin-productos";
    }
}
