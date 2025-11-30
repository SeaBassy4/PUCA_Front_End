🚀 PUCA - Sistema de Gestión para Cafetería

PUCA (Punto de Cafetería) es un sistema web moderno desarrollado en React para la gestión integral de órdenes, productos, usuarios e inventario en una cafetería. Ofrece una interfaz intuitiva y eficiente para optimizar las operaciones del negocio.
📋 Características Principales
🛍️ Gestión de Productos

    CRUD completo de productos (Crear, Leer, Actualizar, Eliminar)

    Categorización inteligente (bebidas, alimentos, postres, panadería)

    Control de inventario en tiempo real

    Gestión de estados (disponible, agotado, descontinuado)

    Sistema de imágenes con optimización y detección de duplicados

    Validaciones avanzadas y prevención de datos inconsistentes

📊 Gestión de Órdenes

    Sistema de pedidos en tiempo real con actualizaciones instantáneas

    Flujo de estados (pendiente → en preparación → completado → entregado)

    Historial detallado con capacidades de búsqueda y filtrado

    Módulo de reportes para análisis de ventas y tendencias

👥 Administración de Usuarios

    Sistema de roles multi-nivel (administrador, supervisor, cajero, cocinero)

    Gestión de permisos granulares por módulo y acción

    Autenticación segura con manejo de sesiones

    Perfiles de usuario personalizables

📱 Experiencia de Usuario

    Design System consistente y responsive

    Componentes modulares altamente reutilizables

    Navegación intuitiva con breadcrumbs y shortcuts

    Interfaz accesible siguiendo estándares WCAG

    Modo claro/oscuro (en desarrollo)

🛠️ Stack Tecnológico
Frontend

    React 18 - Biblioteca principal con hooks modernos

    Vite - Build tool ultra rápido y entorno de desarrollo

    Axios - Cliente HTTP para consumo de APIs

    CSS3 + Flexbox/Grid - Estilos modernos y responsive

    ESLint + Prettier - Calidad y formato de código consistente

Backend & Infraestructura

    Supabase - Backend como servicio (BaaS)

    PostgreSQL - Base de datos relacional robusta

    RESTful API - Arquitectura de servicios escalable

    Autenticación JWT - Seguridad en endpoints

Herramientas de Desarrollo

    Git & GitHub - Control de versiones y colaboración

    React Developer Tools - Debugging y profiling

    Browser DevTools - Análisis de performance

📁 Arquitectura del Proyecto
text

PUCA_Front_End/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/              # Componentes base (Button, Modal, Input)
│   │   ├── layout/          # Componentes de estructura (Header, Sidebar)
│   │   └── products/        # Componentes específicos de productos
│   ├── pages/               # Vistas principales de la aplicación
│   │   ├── ProductsPage/    # Gestión de productos
│   │   ├── OrdersPage/      # Gestión de pedidos
│   │   ├── UsersPage/       # Administración de usuarios
│   │   └── Dashboard/       # Panel de control
│   ├── services/            # Capa de servicios y APIs
│   │   ├── productos.js     # Servicios de productos
│   │   ├── usuarios.js      # Servicios de usuarios
│   │   └── ordenes.js       # Servicios de pedidos
│   ├── hooks/               # Custom hooks reutilizables
│   ├── utils/               # Utilidades y helpers
│   └── styles/              # Estilos globales y temas
├── public/                  # Assets estáticos
│   ├── images/              # Imágenes y icons
│   └── index.html           # Template HTML base
├── package.json             # Dependencias y scripts
└── configuración Vite       # Build tool configuration

🚀 Instalación y Configuración
Prerrequisitos

    Node.js 16+

    npm o yarn

    Cuenta de Supabase

Instalación Local
bash

# Clonar repositorio
git clone https://github.com/SeaBassy4/PUCA_Front_End.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en modo desarrollo
npm run dev

Variables de Entorno
env

VITE_API_URL=tu_url_de_supabase
VITE_SUPABASE_KEY=tu_clave_publica
VITE_APP_ENV=development

📚 Documentación Completa

🔗 Documentación detallada del proyecto disponible en:
📖 PUCA - Documentación Completa en Notion

La documentación incluye:

    📊 Diagramas UML completos (Casos de uso, Clases, Secuencia)

    🎨 Wireframes y prototipos de interfaz

    📋 Especificación de requisitos detallada

    🗄️ Diseño de base de datos y relaciones

    🔧 Manuales técnicos de instalación y configuración

    🚀 Guías de despliegue y mantenimiento

    📝 Reportes de avance y planificación

👥 Equipo de Desarrollo

Universidad de Sonora
Departamento de Ingeniería Industrial y de Sistemas

Desarrolladores:

    Luis Alejandro Aguilar Baza

    Gael Alejandro Nevarez Mendivil

    Luis Alberto Morales Medina

    André Siqueiros Pérez

Materia: Ingeniería de Software
Fecha de Lanzamiento: Diciembre 2024
📞 Soporte y Contacto

Para reportar bugs, solicitar features o contribuir al proyecto:

    Issues en GitHub: Repositorio PUCA

    Documentación: [Notion Documentation](https://www.notion.so/PUCA-Punto-Cafeter-a-250c97bc1a208006a44bc4723635108a#28bc97bc1a2080ad81f5e49f351f928e)

    Correo: equipo.puca@example.com

📄 Licencia

Este proyecto es desarrollado con fines educativos como parte del programa de Ingeniería en Software de la Universidad de Sonora.

✨ ¡Gracias por visitar PUCA! Desarrollado con pasión por el café y el código limpio.
