package com.darkcode.spring.app.service;

import com.darkcode.spring.app.dto.CategoriaDTO;
import com.darkcode.spring.app.dto.CategoriaSimpleDTO;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.ArrayList;

@Service
public class CategoriaService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<CategoriaSimpleDTO> obtenerCategoriasSimple() {
        String sql = "SELECT id_Categoria, nombre_Categoria FROM Categorias";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        List<CategoriaSimpleDTO> categorias = new ArrayList<>();
        for (Object[] row : results) {
            CategoriaSimpleDTO dto = new CategoriaSimpleDTO();
            dto.setIdCategoria(((Number) row[0]).intValue());
            dto.setNombreCategoria((String) row[1]);
            categorias.add(dto);
        }
        return categorias;
    }

    public List<CategoriaDTO> obtenerTodas() {
        String sql = "SELECT id_Categoria, nombre_Categoria, descripcion FROM Categorias";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        List<CategoriaDTO> categorias = new ArrayList<>();
        for (Object[] row : results) {
            CategoriaDTO dto = new CategoriaDTO();
            dto.setIdCategoria(((Number) row[0]).intValue());
            dto.setNombreCategoria((String) row[1]);
            dto.setDescripcion(row[2] != null ? (String) row[2] : "");
            categorias.add(dto);
        }
        return categorias;
    }

    @Transactional
    public void crearCategoria(CategoriaDTO categoria) {
        String sql = "INSERT INTO Categorias (nombre_Categoria, descripcion) VALUES (:nombre, :descripcion)";
        entityManager.createNativeQuery(sql)
            .setParameter("nombre", categoria.getNombreCategoria())
            .setParameter("descripcion", categoria.getDescripcion())
            .executeUpdate();
    }

    @Transactional
    public void editarCategoria(int id, CategoriaDTO categoria) {
        String sql = "UPDATE Categorias SET nombre_Categoria = :nombre, descripcion = :descripcion WHERE id_Categoria = :id";
        entityManager.createNativeQuery(sql)
            .setParameter("nombre", categoria.getNombreCategoria())
            .setParameter("descripcion", categoria.getDescripcion())
            .setParameter("id", id)
            .executeUpdate();
    }

    @Transactional
    public void eliminarCategoria(int id) {
        try {
            String sql = "DELETE FROM Categorias WHERE id_Categoria = :id";
            entityManager.createNativeQuery(sql)
                .setParameter("id", id)
                .executeUpdate();
        } catch (Exception ex) {
            throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.CONFLICT,
                "No se puede eliminar la categoría porque está relacionada con otros registros."
            );
        }
    }
}