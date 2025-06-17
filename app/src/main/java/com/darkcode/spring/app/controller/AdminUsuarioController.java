package com.darkcode.spring.app.controller;

import com.darkcode.spring.app.model.Usuario;
import com.darkcode.spring.app.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/admin-usuarios")
public class AdminUsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public String listarUsuarios(Model model) {
        model.addAttribute("usuarios", usuarioRepository.findAll());
        return "admin-usuarios"; // Thymeleaf buscará admin-usuarios.html en templates
    }

    @GetMapping("/nuevo")
    public String nuevoUsuarioForm(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "usuario-form";
    }

    @GetMapping("/editar/{id}")
    public String editarUsuarioForm(@PathVariable("id") Long id, Model model) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            return "redirect:/admin-usuarios";
        }
        usuario.setContrasena(""); // Campo vacío, el usuario debe ingresar una nueva si quiere cambiarla
        model.addAttribute("usuario", usuario);
        return "usuario-form";
    }

    @PostMapping("/guardar")
    public String guardarUsuario(@ModelAttribute Usuario usuario) {
        if (usuario.getIdUsuario() == null) {
            // Nuevo usuario: siempre hashear la contraseña
            usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
            // Asigna la fecha de registro si está vacía
            if (usuario.getFechaRegistro() == null) {
                usuario.setFechaRegistro(LocalDateTime.now());
            }
        } else {
            Usuario existente = usuarioRepository.findById(usuario.getIdUsuario()).orElse(null);
            if (existente != null) {
                if (usuario.getContrasena() == null || usuario.getContrasena().isBlank()) {
                    // Si el campo está vacío, conserva la contraseña anterior
                    usuario.setContrasena(existente.getContrasena());
                } else if (!passwordEncoder.matches(usuario.getContrasena(), existente.getContrasena())) {
                    // Si la contraseña fue cambiada, hashearla
                    usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
                } else {
                    // Si la contraseña es igual (ya hasheada), no la vuelvas a hashear
                    usuario.setContrasena(existente.getContrasena());
                }
                // Mantén la fecha de registro original al editar
                usuario.setFechaRegistro(existente.getFechaRegistro());
            }
        }
        usuarioRepository.save(usuario);
        return "redirect:/admin-usuarios";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarUsuario(@PathVariable("id") Long id) {
        usuarioRepository.deleteById(id);
        return "redirect:/admin-usuarios";
    }
}
