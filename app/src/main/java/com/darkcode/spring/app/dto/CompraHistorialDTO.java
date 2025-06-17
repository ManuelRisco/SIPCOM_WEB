package com.darkcode.spring.app.dto;

import java.util.List;

public class CompraHistorialDTO {
    private int idCompra;
    private String proveedorNombre;
    private String usuarioNombre;
    private String fechaCompra;
    private String estadoCompra;
    private String observaciones;
    private List<ProductoHistorialDTO> productos;

    // getters y setters
    public int getIdCompra() { return idCompra; }
    public void setIdCompra(int idCompra) { this.idCompra = idCompra; }
    public String getProveedorNombre() { return proveedorNombre; }
    public void setProveedorNombre(String proveedorNombre) { this.proveedorNombre = proveedorNombre; }
    public String getUsuarioNombre() { return usuarioNombre; }
    public void setUsuarioNombre(String usuarioNombre) { this.usuarioNombre = usuarioNombre; }
    public String getFechaCompra() { return fechaCompra; }
    public void setFechaCompra(String fechaCompra) { this.fechaCompra = fechaCompra; }
    public String getEstadoCompra() { return estadoCompra; }
    public void setEstadoCompra(String estadoCompra) { this.estadoCompra = estadoCompra; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
    public List<ProductoHistorialDTO> getProductos() { return productos; }
    public void setProductos(List<ProductoHistorialDTO> productos) { this.productos = productos; }
}
