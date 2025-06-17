package com.darkcode.spring.app.service;

import com.darkcode.spring.app.dto.ProductoDTO;
import com.darkcode.spring.app.dto.ProductoSimpleDTO;
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
public class ProductoService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<ProductoDTO> obtenerTodos() {
        String sql = "SELECT p.id_Producto, p.nombre, p.descripcion, p.id_Categoria, c.nombre_Categoria, p.precio_Compra, p.precio_Venta, p.stock, p.unidad_Medida, p.estado " +
                     "FROM Productos p INNER JOIN Categorias c ON p.id_Categoria = c.id_Categoria";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        List<ProductoDTO> productos = new ArrayList<>();
        for (Object[] row : results) {
            ProductoDTO dto = new ProductoDTO();
            dto.setIdProducto(((Number) row[0]).intValue());
            dto.setNombre((String) row[1]);
            dto.setDescripcion((String) row[2]);
            dto.setIdCategoria(row[3] != null ? ((Number) row[3]).intValue() : 0);
            dto.setNombreCategoria((String) row[4]);
            dto.setPrecioCompra(row[5] != null ? ((Number) row[5]).doubleValue() : 0.0);
            dto.setPrecioVenta(row[6] != null ? ((Number) row[6]).doubleValue() : 0.0);
            dto.setStock(row[7] != null ? ((Number) row[7]).intValue() : 0);
            dto.setUnidadMedida((String) row[8]);
            // CORRECCIÓN: estado es Boolean en SQL Server, así que conviértelo a int (1 o 0)
            if (row[9] instanceof Boolean) {
                dto.setEstado((Boolean) row[9] ? 1 : 0);
            } else if (row[9] instanceof Number) {
                dto.setEstado(((Number) row[9]).intValue());
            } else {
                dto.setEstado(1);
            }
            productos.add(dto);
        }
        return productos;
    }

    public List<ProductoSimpleDTO> obtenerProductosSimple() {
        String sql = "SELECT id_Producto, nombre, precio_Compra FROM Productos WHERE estado = 1";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        List<ProductoSimpleDTO> productos = new ArrayList<>();
        for (Object[] row : results) {
            ProductoSimpleDTO dto = new ProductoSimpleDTO();
            dto.setIdProducto(((Number) row[0]).intValue());
            dto.setNombre((String) row[1]);
            dto.setPrecioCompra(row[2] != null ? ((Number) row[2]).doubleValue() : 0.0);
            productos.add(dto);
        }
        return productos;
    }

    @Transactional
    public void crearProducto(ProductoDTO producto) {
        String sql = "INSERT INTO Productos (nombre, descripcion, id_Categoria, precio_Compra, precio_Venta, stock, unidad_Medida, estado) " +
                     "VALUES (:nombre, :descripcion, :idCategoria, :precioCompra, :precioVenta, :stock, :unidadMedida, :estado)";
        entityManager.createNativeQuery(sql)
            .setParameter("nombre", producto.getNombre())
            .setParameter("descripcion", producto.getDescripcion())
            .setParameter("idCategoria", producto.getIdCategoria())
            .setParameter("precioCompra", producto.getPrecioCompra())
            .setParameter("precioVenta", producto.getPrecioVenta())
            .setParameter("stock", producto.getStock())
            .setParameter("unidadMedida", producto.getUnidadMedida())
            .setParameter("estado", producto.getEstado())
            .executeUpdate();
    }

    @Transactional
    public void editarProducto(int id, ProductoDTO producto) {
        String sql = "UPDATE Productos SET nombre = :nombre, descripcion = :descripcion, id_Categoria = :idCategoria, " +
                     "precio_Compra = :precioCompra, precio_Venta = :precioVenta, stock = :stock, unidad_Medida = :unidadMedida, estado = :estado " +
                     "WHERE id_Producto = :id";
        entityManager.createNativeQuery(sql)
            .setParameter("nombre", producto.getNombre())
            .setParameter("descripcion", producto.getDescripcion())
            .setParameter("idCategoria", producto.getIdCategoria())
            .setParameter("precioCompra", producto.getPrecioCompra())
            .setParameter("precioVenta", producto.getPrecioVenta())
            .setParameter("stock", producto.getStock())
            .setParameter("unidadMedida", producto.getUnidadMedida())
            .setParameter("estado", producto.getEstado())
            .setParameter("id", id)
            .executeUpdate();
    }

    @Transactional
    public void eliminarProducto(int id) {
        try {
            String sql = "DELETE FROM Productos WHERE id_Producto = :id";
            entityManager.createNativeQuery(sql)
                .setParameter("id", id)
                .executeUpdate();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No se puede eliminar el producto porque está relacionado con otros registros.");
        }
    }
}