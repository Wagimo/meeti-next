# Meeti Next

Aplicación construida con Next.js 16 para gestionar autenticación y sentar la base de una plataforma de comunidades y eventos.

El proyecto ya tiene una arquitectura inicial definida alrededor de App Router, `better-auth`, Drizzle ORM y PostgreSQL. En este momento, la parte más completa es el flujo de autenticación con verificación por correo.

## Stack

- Next.js 16.2.1 con App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- Drizzle ORM
- PostgreSQL
- Nodemailer
- React Hook Form
- Zod

## Estado actual

Hoy la aplicación cubre principalmente:

- Landing pública
- Registro de usuarios
- Inicio de sesión
- Verificación de correo electrónico
- Persistencia de usuarios, sesiones, cuentas y verificaciones

Hay piezas ya preparadas pero todavía no terminadas:

- Recuperación de contraseña
- Dashboard autenticado
- Módulo funcional de comunidades

## Estructura del proyecto

```text
app/
  layout.tsx                  # Layout raíz
  globals.css                 # Estilos globales
  (public)/
    layout.tsx                # Layout para rutas públicas
    page.tsx                  # Home
  auth/
    layout.tsx                # Layout para páginas de autenticación
    login/page.tsx
    create-account/page.tsx
    forgot-password/page.tsx
  api/
    auth/[...all]/route.ts    # Handler HTTP de Better Auth

src/
  db/
    index.ts                  # Cliente Drizzle
    schema/                   # Tablas
    relations/                # Relaciones
  emails/
    config/
    services/
    templates/
    types/
  features/
    auth/
      actions/                # Server Actions
      components/             # Formularios y UI del feature
      schemas/                # Validación con Zod
      services/               # Lógica de negocio
      types/
  lib/
    auth.ts                   # Configuración de Better Auth
    nodemailer.ts             # Transporte SMTP
  shared/
    components/               # UI reutilizable
    utils/                    # Utilidades transversales

drizzle/
  ...                         # Migraciones generadas
```

## Arquitectura

La aplicación sigue una estructura por capas ligera dentro de un monolito Next.js:

1. `app/`
   Define rutas, layouts y route handlers.

2. `src/features`
   Contiene lógica orientada por dominio. Hoy el único feature desarrollado es `auth`.

3. `src/shared`
   Reúne componentes y utilidades reutilizables entre features.

4. `src/lib`
   Encapsula integraciones técnicas transversales como autenticación y correo.

5. `src/db`
   Centraliza acceso a datos, esquemas y relaciones de Drizzle.

## Flujo de autenticación

### Registro

1. El usuario completa el formulario cliente.
2. `react-hook-form` valida en cliente usando Zod.
3. El formulario invoca una Server Action del feature `auth`.
4. La action vuelve a validar los datos en el servidor.
5. `AuthServices` consulta si el usuario ya existe.
6. Si no existe, `better-auth` crea el usuario y dispara verificación por email.
7. `AuthEmailServices` arma el correo y `nodemailer` lo envía.

### Inicio de sesión

1. El usuario envía email y password desde el formulario.
2. La Server Action valida entrada.
3. `AuthServices` consulta existencia del usuario.
4. `better-auth` intenta autenticarlo.
5. Si el login es correcto, se crea la sesión y se escriben cookies mediante el plugin `nextCookies()`.

## Autenticación y sesiones

La configuración principal está en `src/lib/auth.ts`.

Aspectos relevantes:

- Se usa `better-auth` como proveedor principal de autenticación.
- La persistencia usa el adaptador `drizzleAdapter` sobre PostgreSQL.
- Está habilitado `emailAndPassword`.
- Se exige verificación de correo antes de considerar la cuenta activa.
- El endpoint HTTP de auth se publica desde `app/api/auth/[...all]/route.ts`.

## Base de datos

La conexión se define en `src/db/index.ts` usando Drizzle para PostgreSQL.

### Tablas actuales

- `users`
- `sessions`
- `accounts`
- `verifications`
- `communities`

Las primeras cuatro soportan directamente el flujo de `better-auth`. La tabla `communities` ya existe como base para el dominio futuro, pero todavía no tiene integración funcional en rutas o servicios.

## Correos

El sistema de email está dividido en:

- `src/lib/nodemailer.ts`: transporte SMTP
- `src/emails/services/EmailServices.ts`: servicio base de envío
- `src/emails/services/AuthEmailServices.ts`: casos de uso de auth
- `src/emails/templates/verificationEmail.tsx`: template de verificación

Actualmente solo está implementado el correo de verificación de cuenta.

## Variables de entorno

El proyecto requiere al menos variables para:

- Base de datos PostgreSQL
- Configuración SMTP
- Nombre público de la aplicación

Ejemplo orientativo:

```env
DATABASE_URL=
APP_NAME=Meeti

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
```

## Desarrollo local

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

## Pendientes de documentación

Este README documenta la base actual. Falta completar más adelante:

- Setup completo del entorno local
- Comandos de migración con Drizzle
- Flujo de recuperación de contraseña
- Convenciones internas de features y componentes
- Estrategia de despliegue
