1. Introducción

TechSolutions es una plataforma web orientada a la prestación de servicios tecnológicos (consultoría IT, desarrollo web, soporte técnico, etc.). El sistema proporciona un entorno amigable para los usuarios finales y un panel de administración para gestionar los servicios y clientes.

El propósito de este documento es describir la arquitectura, los flujos principales y los diagramas que soportan la comprensión y diseño del sistema.

2. Objetivos

Documentar la estructura del proyecto TechSolutions.
Representar gráficamente el flujo de autenticación de usuarios mediante diagramas UML/Mermaid.
Establecer los roles del sistema y sus interacciones principales.

3. Estructura del Proyecto
La organización de carpetas se encuentra en la carpeta "diagramas" y es estructura.png

4. Diagrama de Secuencia – Autenticación

El proceso de inicio de sesión está representado en el  diagrama que se encuentra en la carpeta "diagramas" y es diagrama de secuencia.png


5. Roles del Sistema

    1- Usuario:
    Registrarse.
    Iniciar sesión.
    Solicitar servicios.
    Consultar información.

    2- Administrador:
    Iniciar sesión.
    Gestionar usuarios.
    Gestionar servicios.
    Cerrar sesión.

6. Tecnologías Utilizadas
    Frontend: HTML, CSS, JavaScript.
    Backend: Node.js (server.js).
    Base de Datos: JSON (usuarios.json) en la versión inicial.
    Diagramas: UML (PlantUML y Mermaid).

7. Conclusiones

El sistema TechSolutions presenta una arquitectura modular que facilita la escalabilidad y el mantenimiento. La documentación de diagramas UML permite una mejor comprensión de los procesos internos, especialmente en lo referente al flujo de autenticación.

Como trabajo futuro se plantea:
    Integrar una base de datos relacional.
    Implementar una API REST completa.
    Desplegar la aplicación en un entorno cloud.