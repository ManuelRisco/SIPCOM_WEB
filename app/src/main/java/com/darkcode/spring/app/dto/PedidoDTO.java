package com.darkcode.spring.app.dto;

import java.util.List;

public class PedidoDTO {
    private Long id;
    private String clienteNombre;
    private List<ProductoPedidoDTO> productos;
    private String estado;

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getClienteNombre() { return clienteNombre; }
    public void setClienteNombre(String clienteNombre) { this.clienteNombre = clienteNombre; }
    public List<ProductoPedidoDTO> getProductos() { return productos; }
    public void setProductos(List<ProductoPedidoDTO> productos) { this.productos = productos; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
