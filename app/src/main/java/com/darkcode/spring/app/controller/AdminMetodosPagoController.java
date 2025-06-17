package com.darkcode.spring.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminMetodosPagoController {
    @GetMapping("/admin-metodos-pago")
    public String adminMetodosPago() {
        return "admin-metodos-pago";
    }
}
