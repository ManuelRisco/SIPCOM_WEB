package com.darkcode.spring.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VistaController {
    @GetMapping("/lista-pedidos")
    public String listaPedidos() {
        return "lista-pedidos";
    }
}
