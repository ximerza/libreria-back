# Backend - Librería API REST

API REST creada con Node.js, Express, TypeScript, Prisma y PostgreSQL para una aplicación de gestión de lecturas y clubs de lectura.

## Tecnologías
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT para autenticación
- Zod para validaciones
- bcrypt para hashing de contraseñas

## Instalación
1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno: Copiar `.env.example` a `.env` y llenar los valores
4. Ejecutar migraciones: `npm run db:push`
5. Generar el cliente Prisma: `npm run db:generate`
6. Iniciar el servidor: `npm run dev`

## Estructura del Proyecto (Clean Architecture)
```
src/
├── domain/
│   ├── entities/
│   └── repositories/
├── application/
│   ├── usecases/
│   └── dtos/
├── infrastructure/
│   ├── db/
│   └── security/
└── interface/
    ├── controllers/
    ├── routes/
    └── middlewares/
```

## Endpoints de la API
- Base URL: `http://localhost:3001/api/v1`

### Autenticación
- `POST /auth/register` - Registrar un nuevo usuario
- `POST /auth/login` - Iniciar sesión

### Libros
- `GET /books` - Obtener libros (con paginación: ?page=1&limit=10)
- `GET /books/:id` - Obtener libro por ID
- `POST /books` - Crear libro (requiere autenticación)
- `PUT /books/:id` - Actualizar libro (requiere autenticación)
- `DELETE /books/:id` - Eliminar libro (requiere autenticación)

## Variables de Entorno
- `DATABASE_URL`: URL de la BD PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT
- `JWT_EXPIRES_IN`: Tiempo de expiración del token
- `PORT`: Puerto del servidor (default: 3001)
