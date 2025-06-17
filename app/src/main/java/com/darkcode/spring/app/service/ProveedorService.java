package com.darkcode.spring.app.service;

import com.darkcode.spring.app.dto.ProveedorDTO;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.ArrayList;

@Service
public class ProveedorService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<ProveedorDTO> obtenerTodos() {
        String sql = "SELECT id_Proveedor, razon_Social, ruc, telefono, correo, direccion FROM Proveedores WHERE estado = 1";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        List<ProveedorDTO> proveedores = new ArrayList<>();
        for (Object[] row : results) {
            ProveedorDTO dto = new ProveedorDTO();
            dto.setIdProveedor((Integer) row[0]);
            dto.setRazonSocial((String) row[1]);
            dto.setRuc((String) row[2]);
            dto.setTelefono((String) row[3]);
            dto.setCorreo((String) row[4]);
            dto.setDireccion((String) row[5]);
            proveedores.add(dto);
        }
        return proveedores;
    }

    @Transactional
    public void crearProveedor(ProveedorDTO proveedor) {
        String sql = "INSERT INTO Proveedores (razon_Social, ruc, telefono, correo, direccion, estado) " +
                     "VALUES (:razonSocial, :ruc, :telefono, :correo, :direccion, 1)";
        entityManager.createNativeQuery(sql)
            .setParameter("razonSocial", proveedor.getRazonSocial())
            .setParameter("ruc", proveedor.getRuc())
            .setParameter("telefono", proveedor.getTelefono())
            .setParameter("correo", proveedor.getCorreo())
            .setParameter("direccion", proveedor.getDireccion())
            .executeUpdate();
    }

    @Transactional
    public void editarProveedor(int id, ProveedorDTO proveedor) {
        String sql = "UPDATE Proveedores SET razon_Social = :razonSocial, ruc = :ruc, telefono = :telefono, correo = :correo, direccion = :direccion WHERE id_Proveedor = :id";
        entityManager.createNativeQuery(sql)
            .setParameter("razonSocial", proveedor.getRazonSocial())
            .setParameter("ruc", proveedor.getRuc())
            .setParameter("telefono", proveedor.getTelefono())
            .setParameter("correo", proveedor.getCorreo())
            .setParameter("direccion", proveedor.getDireccion())
            .setParameter("id", id)
            .executeUpdate();
    }

    @Transactional
    public void eliminarProveedor(int id) {
        try {
            String sql = "DELETE FROM Proveedores WHERE id_Proveedor = :id";
            entityManager.createNativeQuery(sql)
                .setParameter("id", id)
                .executeUpdate();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No se puede eliminar el proveedor porque está relacionado con otros registros.");
        }
    }
}