package com.darkcode.spring.app.service;

import com.darkcode.spring.app.dto.MetodoPagoDTO;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.ArrayList;

@Service
public class MetodoPagoService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<MetodoPagoDTO> obtenerTodos() {
        String sql = "SELECT id_Metodo_Pago, nombre FROM Metodo_Pago";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        List<MetodoPagoDTO> metodos = new ArrayList<>();
        for (Object[] row : results) {
            MetodoPagoDTO dto = new MetodoPagoDTO();
            dto.setIdMetodoPago((Integer) row[0]);
            dto.setNombre((String) row[1]);
            metodos.add(dto);
        }
        return metodos;
    }

    @Transactional
    public void crearMetodoPago(MetodoPagoDTO metodo) {
        String sql = "INSERT INTO Metodo_Pago (nombre) VALUES (:nombre)";
        entityManager.createNativeQuery(sql)
            .setParameter("nombre", metodo.getNombre())
            .executeUpdate();
    }

    @Transactional
    public void eliminarMetodoPago(int id) {
        try {
            String sql = "DELETE FROM Metodo_Pago WHERE id_Metodo_Pago = :id";
            entityManager.createNativeQuery(sql)
                .setParameter("id", id)
                .executeUpdate();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No se puede eliminar el método de pago porque está relacionado con otros registros.");
        }
    }

    @Transactional
    public void editarMetodoPago(int id, MetodoPagoDTO metodo) {
        String sql = "UPDATE Metodo_Pago SET nombre = :nombre WHERE id_Metodo_Pago = :id";
        entityManager.createNativeQuery(sql)
            .setParameter("nombre", metodo.getNombre())
            .setParameter("id", id)
            .executeUpdate();
    }
}
