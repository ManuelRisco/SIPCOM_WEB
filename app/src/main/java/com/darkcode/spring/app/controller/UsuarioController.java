package com.darkcode.spring.app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.darkcode.spring.app.dto.UsuarioDTO;
import com.darkcode.spring.app.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<UsuarioDTO> listarUsuarios() {
        return usuarioService.obtenerTodos();
    }

    @PostMapping
    public void crearUsuario(@RequestBody UsuarioDTO usuario) {
        usuarioService.crearUsuario(usuario);
    }

    @PutMapping("/{id}")
    public void editarUsuario(@PathVariable("id") int id, @RequestBody UsuarioDTO usuario) {
        usuarioService.editarUsuario(id, usuario);
    }

    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable("id") int id) {
        try {
            usuarioService.eliminarUsuario(id);
        } catch (ResponseStatusException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar el usuario");
        }
    }
}
