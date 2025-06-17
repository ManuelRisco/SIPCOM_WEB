package com.darkcode.spring.app.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Proveedores")
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Proveedor")
    private Long id_Proveedor;

    @Column(name = "razon_Social", nullable = false)
    private String razonSocial;

    @Column(name = "ruc", unique = true)
    private String ruc;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "correo")
    private String correo;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "estado")
    private Boolean estado;

    @Column(name = "fecha_Registro")
    private LocalDateTime fecha_Registro;

    // getters y setters
    public Long getId_Proveedor() { return id_Proveedor; }
    public void setId_Proveedor(Long id_Proveedor) { this.id_Proveedor = id_Proveedor; }

    public String getRazonSocial() { return razonSocial; }
    public void setRazonSocial(String razonSocial) { this.razonSocial = razonSocial; }

    public String getRuc() { return ruc; }
    public void setRuc(String ruc) { this.ruc = ruc; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public Boolean getEstado() { return estado; }
    public void setEstado(Boolean estado) { this.estado = estado; }

    public LocalDateTime getFecha_Registro() { return fecha_Registro; }
    public void setFecha_Registro(LocalDateTime fecha_Registro) { this.fecha_Registro = fecha_Registro; }
}