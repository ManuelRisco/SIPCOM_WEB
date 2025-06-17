package com.darkcode.spring.app.controller;

import com.darkcode.spring.app.model.Proveedor;
import com.darkcode.spring.app.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@Controller
@RequestMapping("/admin-proveedores")
public class AdminProveedorController {

    @Autowired
    private ProveedorRepository proveedorRepository;

    @GetMapping
    public String listarProveedores(Model model) {
        model.addAttribute("proveedores", proveedorRepository.findAll());
        return "admin-proveedores";
    }

    @GetMapping("/nuevo")
    public String nuevoProveedorForm(Model model) {
        model.addAttribute("proveedor", new Proveedor());
        return "proveedor-form";
    }

    @PostMapping("/guardar")
    public String guardarProveedor(@ModelAttribute Proveedor proveedor) {
        if (proveedor.getId_Proveedor() == null) {
            // Nuevo proveedor: asigna la fecha de registro si está vacía
            if (proveedor.getFecha_Registro() == null) {
                proveedor.setFecha_Registro(LocalDateTime.now());
            }
        } else {
            Proveedor existente = proveedorRepository.findById(proveedor.getId_Proveedor()).orElse(null);
            if (existente != null) {
                // Mantén la fecha de registro original al editar
                proveedor.setFecha_Registro(existente.getFecha_Registro());
            }
        }
        proveedorRepository.save(proveedor);
        return "redirect:/admin-proveedores";
    }

    @GetMapping("/editar/{id}")
    public String editarProveedorForm(@PathVariable("id") Long id, Model model) {
        Proveedor proveedor = proveedorRepository.findById(id).orElse(null);
        if (proveedor == null) {
            return "redirect:/admin-proveedores";
        }
        model.addAttribute("proveedor", proveedor);
        return "proveedor-form";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarProveedor(@PathVariable("id") Long id) {
        proveedorRepository.deleteById(id);
        return "redirect:/admin-proveedores";
    }
}
