package com.darkcode.spring.app.dto;

import java.util.List;

public class PedidoTablaDTO {
    private int id;
    private String clienteNombre;
    private String direccion;
    private List<ProductoPedidoDTO> productos;
    private String estado;

    // getters y setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getClienteNombre() { return clienteNombre; }
    public void setClienteNombre(String clienteNombre) { this.clienteNombre = clienteNombre; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public List<ProductoPedidoDTO> getProductos() { return productos; }
    public void setProductos(List<ProductoPedidoDTO> productos) { this.productos = productos; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
