package com.darkcode.spring.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.darkcode.spring.app.dto.PedidoTablaDTO;
import com.darkcode.spring.app.dto.PedidoRequest;
import com.darkcode.spring.app.service.PedidoService;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody PedidoRequest request) {
        pedidoService.guardarPedido(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<PedidoTablaDTO> listarPedidos() {
        // Devuelve la lista de pedidos con todos los campos requeridos para la tabla
        return pedidoService.obtenerPedidosParaTabla();
    }
}