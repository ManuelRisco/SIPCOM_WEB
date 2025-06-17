package com.darkcode.spring.app.repository;

import com.darkcode.spring.app.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
}
