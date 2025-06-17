package com.darkcode.spring.app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.darkcode.spring.app.dto.ProveedorDTO;
import com.darkcode.spring.app.service.ProveedorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/proveedores")
public class ProveedorController {

    @Autowired
    private ProveedorService proveedorService;

    @GetMapping
    public List<ProveedorDTO> listarProveedores() {
        return proveedorService.obtenerTodos();
    }

    @PostMapping
    public void crearProveedor(@RequestBody ProveedorDTO proveedor) {
        proveedorService.crearProveedor(proveedor);
    }

    @PutMapping("/{id}")
    public void editarProveedor(@PathVariable("id") int id, @RequestBody ProveedorDTO proveedor) {
        proveedorService.editarProveedor(id, proveedor);
    }

    @DeleteMapping("/{id}")
    public void eliminarProveedor(@PathVariable("id") int id) {
        try {
            proveedorService.eliminarProveedor(id);
        } catch (ResponseStatusException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar el proveedor");
        }
    }
}
