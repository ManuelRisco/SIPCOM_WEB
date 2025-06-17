package com.darkcode.spring.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminComprasProveedoresController {
    @GetMapping("/admin-compras-proveedores")
    public String adminComprasProveedores() {
        return "admin-compras-proveedores";
    }
}
