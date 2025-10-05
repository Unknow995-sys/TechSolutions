# Flujo de Autenticación

## Proceso de Login
1. Usuario ingresa credenciales
2. Validación frontend
3. Petición al servidor
4. Gestión de respuesta
5. Almacenamiento de token
6. Redirección

## Diagrama de Secuencia
```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant S as Server

    U->>F: Ingresa credenciales
    F->>F: Valida formato
    F->>S: POST /login
    S->>S: Verifica credenciales
    S-->>F: Token + userData
    F->>F: Almacena token
    F-->>U: Redirige dashboard
```