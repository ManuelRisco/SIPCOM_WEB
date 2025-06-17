package com.darkcode.spring.app.controller;

import com.darkcode.spring.app.service.PedidosClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/publico")
public class PedidosClientePublicoController {

    @Autowired
    private PedidosClienteService pedidosClienteService;

    @GetMapping("/pedidos-cliente")
    public List<Map<String, Object>> getPedidosCliente() {
        return pedidosClienteService.obtenerHistorialPedidos();
    }

    @PutMapping("/pedidos-cliente/{idCarrito}/estado")
    public ResponseEntity<?> actualizarEstado(
            @PathVariable int idCarrito,
            @RequestBody Map<String, Object> body
    ) {
        String estado = (String) body.get("estado");
        Integer idUsuario = (Integer) body.get("idUsuario");
        if (estado == null || idUsuario == null) {
            return ResponseEntity.badRequest().body("Datos incompletos");
        }
        boolean ok = pedidosClienteService.actualizarEstadoPedido(idCarrito, estado, idUsuario);
        return ok ? ResponseEntity.ok().build() : ResponseEntity.badRequest().body("No se pudo actualizar");
    }
}
