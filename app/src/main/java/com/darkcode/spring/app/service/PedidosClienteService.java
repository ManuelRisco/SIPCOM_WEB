package com.darkcode.spring.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class PedidosClienteService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> obtenerHistorialPedidos() {
        String sql = "SELECT dc.id_Detalle_Carrito, dc.producto_Carta, dc.cantidad, dc.precio_Unitario, " +
                "c.id_Carrito, c.estado, c.fecha_Creacion, c.Comentario AS comentario, " +
                "cl.id_Cliente, cl.nombres AS nombre_cliente, cl.apellidos AS apellido_cliente, " +
                "cl.tipo_Documento AS tipo_documento, cl.numero_Documento AS numero_documento, " +
                "cl.correo, cl.telefono, cl.direccion, " +
                "u.id_Usuario, u.nombre_usuario " +
                "FROM Detalle_Carrito dc " +
                "INNER JOIN Carrito c ON dc.id_Carrito = c.id_Carrito " +
                "INNER JOIN Clientes cl ON c.id_Cliente = cl.id_Cliente " +
                "LEFT JOIN Usuarios u ON c.id_Usuario = u.id_Usuario " +
                "ORDER BY c.fecha_Creacion DESC, c.id_Carrito DESC";
        return jdbcTemplate.queryForList(sql);
    }

    public boolean actualizarEstadoPedido(int idCarrito, String estado, int idUsuario) {
        String sql = "UPDATE Carrito SET estado = ?, id_Usuario = ? WHERE id_Carrito = ?";
        int rows = jdbcTemplate.update(sql, estado, idUsuario, idCarrito);
        return rows > 0;
    }
}
