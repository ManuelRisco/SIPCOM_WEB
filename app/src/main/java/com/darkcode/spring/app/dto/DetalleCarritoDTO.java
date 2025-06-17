package com.darkcode.spring.app.dto;

import java.math.BigDecimal;

public class DetalleCarritoDTO {
    private String productoCarta;
    private int cantidad;
    private BigDecimal precioUnitario;

    // getters y setters

    public String getProductoCarta() { return productoCarta; }
    public void setProductoCarta(String productoCarta) { this.productoCarta = productoCarta; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; }
}
