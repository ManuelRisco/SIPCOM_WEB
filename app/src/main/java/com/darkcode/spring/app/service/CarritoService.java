package com.darkcode.spring.app.service;

import com.darkcode.spring.app.dto.CarritoRequestDTO;
import com.darkcode.spring.app.dto.ClienteDTO;
import com.darkcode.spring.app.dto.DetalleCarritoDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CarritoService {

    private static final Logger logger = LoggerFactory.getLogger(CarritoService.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void crearCarritoCompleto(CarritoRequestDTO request) {
        logger.info("===> [CarritoService] Recibido request: {}", request);

        // 1. Insertar cliente solo si no existe
        ClienteDTO c = request.getCliente();
        logger.info("===> Insertando cliente: {}", c);

        // Buscar si ya existe un cliente con ese numero_Documento
        Integer idCliente = null;
        try {
            idCliente = (Integer) entityManager.createNativeQuery(
                "SELECT id_Cliente FROM Clientes WHERE numero_Documento = :numero")
                .setParameter("numero", c.getNumeroDocumento())
                .getSingleResult();
            logger.info("===> Cliente ya existe, idCliente: {}", idCliente);
        } catch (jakarta.persistence.NoResultException ex) {
            // No existe, insertar nuevo cliente
            String sqlCliente = "INSERT INTO Clientes (tipo_Documento, numero_Documento, nombres, apellidos, correo, telefono, direccion) " +
                    "VALUES (:tipo, :numero, :nombres, :apellidos, :correo, :telefono, :direccion)";
            entityManager.createNativeQuery(sqlCliente)
                    .setParameter("tipo", c.getTipoDocumento())
                    .setParameter("numero", c.getNumeroDocumento())
                    .setParameter("nombres", c.getNombres())
                    .setParameter("apellidos", c.getApellidos())
                    .setParameter("correo", c.getCorreo())
                    .setParameter("telefono", c.getTelefono())
                    .setParameter("direccion", c.getDireccion())
                    .executeUpdate();
            idCliente = ((Number) entityManager.createNativeQuery("SELECT MAX(id_Cliente) FROM Clientes").getSingleResult()).intValue();
            logger.info("===> idCliente insertado: {}", idCliente);
        }

        // 2. Insertar carrito
        logger.info("===> Insertando carrito para idCliente: {}", idCliente);
        String sqlCarrito = "INSERT INTO Carrito (id_Cliente, id_Usuario, id_Metodo_Pago, estado, Comentario) " +
                "VALUES (:idCliente, :idUsuario, :idMetodoPago, 'pendiente', :comentario)";
        entityManager.createNativeQuery(sqlCarrito)
                .setParameter("idCliente", idCliente)
                .setParameter("idUsuario", null) // ahora permite null
                .setParameter("idMetodoPago", request.getIdMetodoPago())
                .setParameter("comentario", request.getComentario())
                .executeUpdate();

        Integer idCarrito = ((Number) entityManager.createNativeQuery("SELECT MAX(id_Carrito) FROM Carrito").getSingleResult()).intValue();
        logger.info("===> idCarrito insertado: {}", idCarrito);

        // 3. Insertar detalles
        for (DetalleCarritoDTO d : request.getDetalles()) {
            logger.info("===> Insertando detalle: {}", d);
            String sqlDetalle = "INSERT INTO Detalle_Carrito (id_Carrito, producto_Carta, cantidad, precio_Unitario) " +
                    "VALUES (:idCarrito, :producto, :cantidad, :precio)";
            entityManager.createNativeQuery(sqlDetalle)
                    .setParameter("idCarrito", idCarrito)
                    .setParameter("producto", d.getProductoCarta())
                    .setParameter("cantidad", d.getCantidad())
                    .setParameter("precio", d.getPrecioUnitario())
                    .executeUpdate();
        }
        logger.info("===> Pedido insertado correctamente");
    }
}