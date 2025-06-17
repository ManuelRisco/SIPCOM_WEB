package com.darkcode.spring.app.service;

import com.darkcode.spring.app.dto.UsuarioDTO;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.ArrayList;

@Service
public class UsuarioService {

    @PersistenceContext
    private EntityManager entityManager;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<UsuarioDTO> obtenerTodos() {
        String sql = "SELECT id_Usuario, nombre_usuario, nombres, apellidos, rol, estado FROM Usuarios";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        List<UsuarioDTO> usuarios = new ArrayList<>();
        for (Object[] row : results) {
            UsuarioDTO dto = new UsuarioDTO();
            dto.setIdUsuario((Integer) row[0]);
            dto.setNombreUsuario((String) row[1]);
            dto.setNombres((String) row[2]);
            dto.setApellidos((String) row[3]);
            dto.setRol((String) row[4]);
            // estado puede ser Boolean o Number según el driver
            if (row[5] instanceof Boolean) {
                dto.setEstado((Boolean) row[5] ? 1 : 0);
            } else if (row[5] instanceof Number) {
                dto.setEstado(((Number) row[5]).intValue());
            } else {
                dto.setEstado(1);
            }
            usuarios.add(dto);
        }
        return usuarios;
    }

    @Transactional
    public void crearUsuario(UsuarioDTO usuario) {
        String hashed = passwordEncoder.encode(usuario.getContrasena());
        String sql = "INSERT INTO Usuarios (nombre_usuario, contrasena, nombres, apellidos, rol, estado) " +
                     "VALUES (:nombreUsuario, :contrasena, :nombres, :apellidos, :rol, :estado)";
        entityManager.createNativeQuery(sql)
            .setParameter("nombreUsuario", usuario.getNombreUsuario())
            .setParameter("contrasena", hashed)
            .setParameter("nombres", usuario.getNombres())
            .setParameter("apellidos", usuario.getApellidos())
            .setParameter("rol", usuario.getRol())
            .setParameter("estado", usuario.getEstado())
            .executeUpdate();
    }

    @Transactional
    public void editarUsuario(int id, UsuarioDTO usuario) {
        StringBuilder sql = new StringBuilder("UPDATE Usuarios SET nombre_usuario = :nombreUsuario, nombres = :nombres, apellidos = :apellidos, rol = :rol, estado = :estado");
        boolean cambiarContra = usuario.getContrasena() != null && !usuario.getContrasena().isEmpty();
        if (cambiarContra) {
            sql.append(", contrasena = :contrasena");
        }
        sql.append(" WHERE id_Usuario = :id");
        Query query = entityManager.createNativeQuery(sql.toString())
            .setParameter("nombreUsuario", usuario.getNombreUsuario())
            .setParameter("nombres", usuario.getNombres())
            .setParameter("apellidos", usuario.getApellidos())
            .setParameter("rol", usuario.getRol())
            .setParameter("estado", usuario.getEstado())
            .setParameter("id", id);
        if (cambiarContra) {
            String hashed = passwordEncoder.encode(usuario.getContrasena());
            query.setParameter("contrasena", hashed);
        }
        query.executeUpdate();
    }

    @Transactional
    public void eliminarUsuario(int id) {
        try {
            String sql = "DELETE FROM Usuarios WHERE id_Usuario = :id";
            entityManager.createNativeQuery(sql)
                .setParameter("id", id)
                .executeUpdate();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No se puede eliminar el usuario porque está relacionado con otros registros.");
        }
    }

    public Integer obtenerIdPorNombreUsuario(String nombreUsuario) {
        try {
            return jdbcTemplate.queryForObject(
                "SELECT id_Usuario FROM Usuarios WHERE nombre_usuario = ?",
                Integer.class,
                nombreUsuario
            );
        } catch (Exception e) {
            return null;
        }
    }
}
