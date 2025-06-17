package com.darkcode.spring.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PedidosClienteViewController {

    @GetMapping("/pedidos-cliente")
    public String pedidosClienteView() {
        return "pedidos-cliente";
    }
}
