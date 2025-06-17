package com.darkcode.spring.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/home", "/", "/css/**", "/js/**", "/imagenes/**").permitAll()
                .requestMatchers("/api/metodos-pago", "/api/metodos-pago/**").permitAll()
                .requestMatchers(
                    "/pedidos-cliente",
                    "/css/pedidos-cliente.css"
                ).hasAnyRole("ADMIN", "SUPERVISOR", "VENDEDOR")
                .requestMatchers("/admin-panel").hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers(
                    "/admin-usuarios/**",
                    "/admin-proveedores/**",
                    "/usuario-form",
                    "/proveedor-form",
                    "/pedidos",
                    "/pedidos/**",
                    "/admin-compras-proveedores",
                    "/admin-categorias",
                    "/admin-productos",
                    "/admin-metodos-pago",
                    "/api/usuarios/**",
                    "/api/proveedores/**",
                    "/api/compras/**",
                    "/api/categorias/**",
                    "/api/productos/**"
                    // "/api/metodos-pago/**"
                ).hasAnyRole("ADMIN", "SUPERVISOR")
                .requestMatchers("/api/publico/**").permitAll()
                .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/admin-panel", true)
                .successHandler((request, response, authentication) -> {
                    // Redirección personalizada según rol
                    boolean isVendedor = authentication.getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_VENDEDOR"));
                    if (isVendedor) {
                        response.sendRedirect("/vendedor-panel");
                    } else {
                        response.sendRedirect("/admin-panel");
                    }
                })
                .failureUrl("/login?error")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login")
                .permitAll()
            );
        return http.build();
    }
}
