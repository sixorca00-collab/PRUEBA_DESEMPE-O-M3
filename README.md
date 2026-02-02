# Simulacro-M3



Sistema Web de Gestión de Pedidos – Simulacro Frontend

Proyecto frontend que simula el flujo completo de pedidos de un restaurante, utilizando JavaScript Vanilla, JSON Server como API falsa y LocalStorage para el manejo de sesión y roles.

Este proyecto fue desarrollado como simulacro de prueba de desempeño, cumpliendo criterios de autenticación, roles, persistencia, seguridad lógica y separación de vistas.

# Tecnologías Utilizadas

HTML5

CSS3

Bootstrap 5

JavaScript Vanilla (ES Modules)

JSON Server (API simulada)

LocalStorage (manejo de sesión)

No se utiliza backend real
No se utilizan frameworks (React, Vue, etc.)

# Descripción General

La aplicación permite:

Registro e inicio de sesión de usuarios

Manejo de roles (admin y user)

Consumo de datos desde una API simulada

Gestión de productos y pedidos

Panel administrativo con métricas

Persistencia de sesión

Protección de rutas según rol

El diseño y la lógica están orientados a simular un entorno real de pedidos sin depender de un backend productivo.

Roles del Sistema
Usuario (user)

Ver productos

Agregar productos al pedido

Crear órdenes

Ver solo sus propias órdenes

Consultar estado de pedidos

Administrador (admin)

Acceso a dashboard administrativo

Ver métricas generales

Cambiar estado de órdenes

Crear y listar productos

Supervisar todas las órdenes
# Estructura del proyecto
/index.html
/pages
  ├── admin.html
  └── menu.html
/js
  ├── main.js
  ├── login.js
  ├── register.js
  ├── admin.js
  └── user.js
/db.json
/README.md
# Estructura de base de datos JSON
DataBase
{
  "users": [],
  "products": [],
  "orders": []
}
Usuarios 
{
  "id": 1,
  "username": "admin",
  "password": "1234",
  "role": "admin"
}
Productos:
{
  "id": 1,
  "name": "Burger",
  "price": 12000
}
Ordenes:
{
  "id": 1,
  "userId": 1,
  "items": [],
  "status": "pending",
  "total": 24000,
  "date": "2026-01-28"
}
# Instalar Ejecucion
Instalar dependencias:
                        npm install json-server
Ejecutar en una terminal el JSONSERVER
                        npx json-server --watch db.json --port 3000
