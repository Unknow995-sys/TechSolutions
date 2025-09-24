# TechSolutions - The Aurora Experience

Este es el repositorio para el proyecto TechSolutions, una página web de presentación para una empresa de desarrollo de software. El proyecto está construido como una Single Page Application (SPA) con animaciones interactivas y un panel de administración básico.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera para mantener una clara separación de responsabilidades (estructura, estilo y lógica).

```
TechSolutions/
├── README.md               # Este archivo, la documentación del proyecto.
├── TechSolutions.html      # El archivo principal con la estructura HTML de todas las páginas.
├── style.css               # Contiene todos los estilos CSS para la aplicación.
├── script.js               # Toda la lógica de JavaScript, incluyendo animaciones y funcionalidad CRUD.
└── img/                    # Carpeta que contiene las imágenes utilizadas en el sitio.
    ├── Desarrollo_Web.png
    ├── app_mobil.jpg
    ├── consultoria_it.jpeg
    └── soporte_tecnico.png
```

### Descripción de Archivos

*   **`TechSolutions.html`**: Es el punto de entrada de la aplicación. Contiene la estructura semántica de todas las "páginas" (Inicio, Servicios, Login, Dashboard) y los modales. Enlaza los archivos de CSS y JavaScript.
*   **`style.css`**: Archivo de hoja de estilos. Define la apariencia visual de toda la aplicación, incluyendo el diseño, colores, tipografías y animaciones.
*   **`script.js`**: Contiene toda la interactividad y lógica de la aplicación. Gestiona las animaciones de bienvenida, la navegación entre páginas, y la funcionalidad del panel de administración (CRUD).
*   **`img/`**: Directorio que almacena todos los recursos gráficos, como las imágenes de los servicios.