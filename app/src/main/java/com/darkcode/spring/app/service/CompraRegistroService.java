package com.darkcode.spring.app.service;

import com.darkcode.spring.app.dto.ProveedorSimpleDTO;
import com.darkcode.spring.app.dto.ProductoSimpleDTO;
import com.darkcode.spring.app.dto.CompraHistorialDTO;
import com.darkcode.spring.app.dto.ProductoHistorialDTO;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

@Service
public class CompraRegistroService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<ProveedorSimpleDTO> obtenerProveedoresSimple() {
        String sql = "SELECT id_Proveedor, razon_Social FROM Proveedores WHERE estado = 1";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        List<ProveedorSimpleDTO> proveedores = new ArrayList<>();
        for (Object[] row : results) {
            ProveedorSimpleDTO dto = new ProveedorSimpleDTO();
            dto.setIdProveedor((Integer) row[0]);
            dto.setRazonSocial((String) row[1]);
            proveedores.add(dto);
        }
        return proveedores;
    }

    public List<ProductoSimpleDTO> obtenerProductosSimple() {
        String sql = "SELECT id_Producto, nombre, precio_Compra, id_Categoria FROM Productos WHERE estado = 1";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        List<ProductoSimpleDTO> productos = new ArrayList<>();
        for (Object[] row : results) {
            ProductoSimpleDTO dto = new ProductoSimpleDTO();
            dto.setIdProducto(((Number) row[0]).intValue());
            dto.setNombre((String) row[1]);
            dto.setPrecioCompra(row[2] != null ? ((Number) row[2]).doubleValue() : 0.0);
            dto.setIdCategoria(row[3] != null ? ((Number) row[3]).intValue() : 0);
            productos.add(dto);
        }
        return productos;
    }

    @Transactional
    public void registrarCompra(Map<String, Object> body, String username) {
        int idProveedor = (Integer) body.get("idProveedor");
        String observaciones = (String) body.get("observaciones");
        List<Map<String, Object>> productos = (List<Map<String, Object>>) body.get("productos");

        // Obtener id_Usuario por username
        Integer idUsuario = (Integer) entityManager.createNativeQuery(
            "SELECT id_Usuario FROM Usuarios WHERE nombre_usuario = :username")
            .setParameter("username", username)
            .getSingleResult();

        // Insertar en Compras
        entityManager.createNativeQuery(
            "INSERT INTO Compras (id_Proveedor, id_Usuario, observaciones) VALUES (:idProveedor, :idUsuario, :observaciones)")
            .setParameter("idProveedor", idProveedor)
            .setParameter("idUsuario", idUsuario)
            .setParameter("observaciones", observaciones)
            .executeUpdate();

        // Obtener el id_Compra recién insertado
        Integer idCompra = (Integer) entityManager.createNativeQuery(
            "SELECT MAX(id_Compra) FROM Compras WHERE id_Proveedor = :idProveedor AND id_Usuario = :idUsuario")
            .setParameter("idProveedor", idProveedor)
            .setParameter("idUsuario", idUsuario)
            .getSingleResult();

        // Insertar productos en Producto_Compras con precio_unitario
        for (Map<String, Object> prod : productos) {
            Integer idProducto = (Integer) prod.get("idProducto");
            Integer cantidad = (Integer) prod.get("cantidad");
            Double precioUnitario = (prod.get("precioUnitario") instanceof Number)
                ? ((Number) prod.get("precioUnitario")).doubleValue()
                : Double.parseDouble(prod.get("precioUnitario").toString());
            entityManager.createNativeQuery(
                "INSERT INTO Producto_Compras (id_Compra, id_Producto, cantidad, precio_Unitario) VALUES (:idCompra, :idProducto, :cantidad, :precioUnitario)")
                .setParameter("idCompra", idCompra)
                .setParameter("idProducto", idProducto)
                .setParameter("cantidad", cantidad)
                .setParameter("precioUnitario", precioUnitario)
                .executeUpdate();
        }
    }

    public List<CompraHistorialDTO> obtenerHistorialCompras() {
        String sql = "SELECT c.id_Compra, p.razon_Social, u.nombres, u.apellidos, c.fechaC_ompra, c.estado_Compra, c.observaciones " +
                     "FROM Compras c " +
                     "INNER JOIN Proveedores p ON c.id_Proveedor = p.id_Proveedor " +
                     "INNER JOIN Usuarios u ON c.id_Usuario = u.id_Usuario " +
                     "ORDER BY c.id_Compra DESC";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        List<CompraHistorialDTO> compras = new ArrayList<>();
        for (Object[] row : results) {
            CompraHistorialDTO dto = new CompraHistorialDTO();
            dto.setIdCompra((Integer) row[0]);
            dto.setProveedorNombre((String) row[1]);
            dto.setUsuarioNombre(row[2] + " " + row[3]);
            dto.setFechaCompra(row[4] != null ? row[4].toString() : "");
            dto.setEstadoCompra((String) row[5]);
            dto.setObservaciones((String) row[6]);
            // Productos de la compra
            String sqlProd = "SELECT pr.nombre, pc.cantidad, pc.precio_Unitario FROM Producto_Compras pc INNER JOIN Productos pr ON pc.id_Producto = pr.id_Producto WHERE pc.id_Compra = :idCompra";
            Query qProd = entityManager.createNativeQuery(sqlProd);
            qProd.setParameter("idCompra", dto.getIdCompra());
            List<Object[]> prods = qProd.getResultList();
            List<ProductoHistorialDTO> productos = new ArrayList<>();
            for (Object[] prow : prods) {
                ProductoHistorialDTO pdto = new ProductoHistorialDTO();
                pdto.setNombre((String) prow[0]);
                pdto.setCantidad(((Number) prow[1]).intValue());
                pdto.setPrecioUnitario(((Number) prow[2]).doubleValue());
                productos.add(pdto);
            }
            dto.setProductos(productos);
            compras.add(dto);
        }
        return compras;
    }
}
