package com.darkcode.spring.app.dto;

import java.util.List;

public class PedidoListaDTO {
    private Long idPedido;
    private String fechaPedido;
    private String estadoPedido;
    private String observaciones;
    private String clienteNombres;
    private String clienteApellidos;
    private String clienteTipoDocumento;
    private String clienteNumeroDocumento;
    private List<DetallePedidoDTO> detalles;

    // getters y setters
    public Long getIdPedido() { return idPedido; }
    public void setIdPedido(Long idPedido) { this.idPedido = idPedido; }
    public String getFechaPedido() { return fechaPedido; }
    public void setFechaPedido(String fechaPedido) { this.fechaPedido = fechaPedido; }
    public String getEstadoPedido() { return estadoPedido; }
    public void setEstadoPedido(String estadoPedido) { this.estadoPedido = estadoPedido; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
    public String getClienteNombres() { return clienteNombres; }
    public void setClienteNombres(String clienteNombres) { this.clienteNombres = clienteNombres; }
    public String getClienteApellidos() { return clienteApellidos; }
    public void setClienteApellidos(String clienteApellidos) { this.clienteApellidos = clienteApellidos; }
    public String getClienteTipoDocumento() { return clienteTipoDocumento; }
    public void setClienteTipoDocumento(String clienteTipoDocumento) { this.clienteTipoDocumento = clienteTipoDocumento; }
    public String getClienteNumeroDocumento() { return clienteNumeroDocumento; }
    public void setClienteNumeroDocumento(String clienteNumeroDocumento) { this.clienteNumeroDocumento = clienteNumeroDocumento; }
    public List<DetallePedidoDTO> getDetalles() { return detalles; }
    public void setDetalles(List<DetallePedidoDTO> detalles) { this.detalles = detalles; }
}
