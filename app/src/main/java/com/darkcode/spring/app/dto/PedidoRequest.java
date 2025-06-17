package com.darkcode.spring.app.dto;

import java.util.List;

public class PedidoRequest {
    private ClienteDTO cliente;
    private List<ProductoPedidoDTO> productos;

    // getters y setters
    public ClienteDTO getCliente() { return cliente; }
    public void setCliente(ClienteDTO cliente) { this.cliente = cliente; }
    public List<ProductoPedidoDTO> getProductos() { return productos; }
    public void setProductos(List<ProductoPedidoDTO> productos) { this.productos = productos; }
}
