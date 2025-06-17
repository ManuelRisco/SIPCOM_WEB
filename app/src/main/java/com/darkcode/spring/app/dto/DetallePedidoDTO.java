package com.darkcode.spring.app.dto;

public class DetallePedidoDTO {
    private String productoNombre;
    private int cantidad;

    // getters y setters
    public String getProductoNombre() { return productoNombre; }
    public void setProductoNombre(String productoNombre) { this.productoNombre = productoNombre; }
    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
}
