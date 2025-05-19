# Panel de Administración Web

Este proyecto es una versión web completa basada en la aplicación móvil, manteniendo su diseño y funcionalidad con datos simulados.

## Características Implementadas

- **Panel de navegación lateral**: Permite acceder a todas las secciones de la aplicación
- **Dashboard principal**: Muestra estadísticas, gráficos y actividad reciente
- **Gestión de Usuarios**: Vista de usuarios registrados con funciones de búsqueda y filtrado
- **Gestión de Pedidos**: Sistema completo para ver y administrar pedidos
- **Catálogo de Productos**: Visualización de productos con categorías y detalles
- **Configuración**: Opciones para gestionar perfil, seguridad y notificaciones

## Estructura del Proyecto

El proyecto está organizado en varios componentes:

- **Dashboard**: Página principal con tarjetas de estadísticas, gráficos y actividad reciente
- **Usuarios**: Gestión de usuarios registrados
- **Pedidos**: Sistema de administración de pedidos
- **Productos**: Catálogo completo de productos
- **Configuración**: Ajustes del perfil de administrador

## Tecnologías Utilizadas

- React con TypeScript
- TailwindCSS para los estilos
- Shadcn/UI para componentes de interfaz
- Recharts para gráficos interactivos
- React Query para gestión de estado y peticiones API

## Vistas Principales

1. **Dashboard**: Tarjetas de estadísticas, gráficos de ventas y usuarios activos, pedidos recientes, productos más vendidos y actividad reciente
2. **Usuarios**: Tabla de usuarios con buscador y filtros
3. **Pedidos**: Tabla de pedidos con filtros por estado (Entregados, En Proceso, Cancelados)
4. **Productos**: Vista de cuadrícula con imágenes de productos y detalles
5. **Configuración**: Formularios para editar perfil, seguridad y notificaciones

## Capturas de Pantalla Descriptivas

A continuación se describen las capturas de pantalla principales que muestran la funcionalidad:

1. **Dashboard**:
   - 4 tarjetas de estadísticas en la parte superior (Usuarios, Pedidos, Ingresos, Productos)
   - 2 gráficos en la sección media (Ventas Mensuales y Usuarios Activos)
   - Tabla de pedidos recientes
   - Sección inferior dividida entre productos más vendidos y actividad reciente

2. **Usuarios**:
   - Barra de búsqueda y filtros en la parte superior
   - Tabla con avatares, nombres de usuario, ID, estado y fecha de registro
   - Botones de acción para ver y editar usuarios

3. **Pedidos**:
   - Barra de búsqueda y filtros en la parte superior
   - Pestañas para filtrar por estado (Todos, Entregados, En Proceso, Cancelados)
   - Tabla con detalles de pedidos incluyendo cliente, estado, fecha y total

4. **Productos**:
   - Barra de búsqueda y filtros en la parte superior
   - Pestañas para filtrar por categoría (Todos, Electrónica, Ropa, Hogar)
   - Vista de cuadrícula con tarjetas de productos mostrando imagen, nombre, categoría, precio y ventas

5. **Configuración**:
   - Pestañas para navegar entre Perfil, Seguridad y Notificaciones
   - Formularios para editar información personal
   - Opciones para cambiar contraseña y configurar notificaciones

## Datos Simulados

El sistema utiliza datos simulados para mostrar estadísticas, usuarios, pedidos y productos, lo que permite visualizar la funcionalidad completa sin necesidad de una conexión a base de datos real.