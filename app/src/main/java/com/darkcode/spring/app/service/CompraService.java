package com.darkcode.spring.app.service;

import com.darkcode.spring.app.dto.CompraProveedorDTO;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.ArrayList;

@Service
public class CompraService {
    @PersistenceContext
    private EntityManager entityManager;

    public List<CompraProveedorDTO> obtenerComprasConProveedorYUsuario() {
        // Implementa aquí la consulta real a la base de datos
        // Retorna una lista vacía como ejemplo
        return new ArrayList<>();
    }

    @Transactional
    public void actualizarEstadoCompra(int idCompra, String nuevoEstado) {
        String sql = "UPDATE Compras SET estado_Compra = :estado WHERE id_Compra = :id";
        entityManager.createNativeQuery(sql)
            .setParameter("estado", nuevoEstado)
            .setParameter("id", idCompra)
            .executeUpdate();
    }

    @Transactional
    public void eliminarCompra(int idCompra) {
        try {
            String sql = "DELETE FROM Compras WHERE id_Compra = :id";
            entityManager.createNativeQuery(sql)
                .setParameter("id", idCompra)
                .executeUpdate();
        } catch (Exception ex) {
            // Si hay restricción de integridad (FK), lanza 409
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No se puede eliminar la compra porque está relacionada con otros registros.");
        }
    }
}
