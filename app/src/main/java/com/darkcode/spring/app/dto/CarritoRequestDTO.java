package com.darkcode.spring.app.dto;

import java.util.List;

public class CarritoRequestDTO {
    private ClienteDTO cliente;
    private List<DetalleCarritoDTO> detalles;
    private Integer idMetodoPago; // debe coincidir con el JSON y el nombre del parámetro en el service
    private String comentario;

    // getters y setters

    public ClienteDTO getCliente() { return cliente; }
    public void setCliente(ClienteDTO cliente) { this.cliente = cliente; }

    public List<DetalleCarritoDTO> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleCarritoDTO> detalles) { this.detalles = detalles; }

    public Integer getIdMetodoPago() {
        return idMetodoPago;
    }
    public void setIdMetodoPago(Integer idMetodoPago) {
        this.idMetodoPago = idMetodoPago;
    }

    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }
}
