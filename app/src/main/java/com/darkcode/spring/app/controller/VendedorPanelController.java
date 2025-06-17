package com.darkcode.spring.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VendedorPanelController {
    @GetMapping("/vendedor-panel")
    public String vendedorPanel() {
        return "vendedor-panel";
    }
}
