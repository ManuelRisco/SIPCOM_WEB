package com.darkcode.spring.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.darkcode.spring.app.service.UsuarioService;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UsuarioActualController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/usuario-actual")
    public Map<String, Object> getUsuarioActual() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Integer idUsuario = usuarioService.obtenerIdPorNombreUsuario(username);
        return Map.of(
            "username", username,
            "idUsuario", idUsuario
        );
    }
}
