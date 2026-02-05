# Instrucciones del Proyecto

## Formato de Commits (Conventional Commits)

Usar el siguiente formato para todos los mensajes de commit:

```
tipo(alcance): descripcion corta

Descripcion detallada (opcional)

BREAKING CHANGE: descripcion (si aplica)
```

### Tipos disponibles

| Tipo | Descripcion |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Correccion de bug |
| `docs` | Documentacion |
| `style` | Formato, espacios |
| `refactor` | Refactorizacion |
| `test` | Agregar tests |
| `chore` | Mantenimiento |
| `perf` | Mejoras rendimiento |
| `ci` | CI/CD |
| `build` | Build/dependencias |
| `revert` | Revertir commit |

### Ejemplos

```bash
# Feature nueva
feat(module): add new field to module schema

# Bug fix
fix(tabs-menu): resolve country filter issue

# Actualizacion de contenido
chore(seed): update seed data with new countries

# CI/CD
ci(deploy): add production deployment workflow
```

### Alcances comunes (scope)

- `module` - API de modulos
- `global` - API de configuracion global
- `tabs-menu` - API de menu de tabs
- `about-me-menu` - API de menu de perfil
- `config` - Configuracion de Strapi
- `seed` - Script de seeding
- `deploy` - CI/CD y despliegue
- `components` - Componentes de Strapi (page.*, shared.*)
- `deps` - Dependencias

## Package Manager

Este proyecto usa **pnpm**. No usar `npm` ni `yarn`.

```bash
pnpm install              # Instalar dependencias
pnpm add <package>        # Agregar dependencia
pnpm add -D <package>     # Agregar dependencia de desarrollo
```

## Arquitectura

Proyecto basado en **Strapi 5** (Headless CMS) con estructura estandar:

```
src/
├── api/                          # APIs (Content Types)
│   ├── module/                   # API de modulos (collection type)
│   │   ├── content-types/module/ # Schema JSON
│   │   ├── controllers/          # Controller personalizado (transforma respuestas)
│   │   ├── routes/               # Rutas personalizadas
│   │   └── services/             # Servicio
│   ├── global/                   # API global (single type)
│   ├── tabs-menu/                # API tabs menu (collection type)
│   └── about-me-menu/            # API perfil menu (collection type)
├── components/                   # Componentes reutilizables
│   ├── page/                     # Componentes de pagina (action, title, data-object, etc.)
│   └── shared/                   # Componentes compartidos (seo)
├── admin/                        # Configuracion del admin panel
└── extensions/                   # Extensiones de plugins
```

### Controllers personalizados

- **module**: Transforma respuestas, envuelve datos en `config`, elimina campos internos
- **tabs-menu**: Elimina campos del sistema (documentId, createdAt, updatedAt, publishedAt, locale)
- **about-me-menu**: Misma limpieza que tabs-menu
- **global**: Usa controller por defecto de Strapi

## Multi-entorno

| Entorno | Archivo ENV | Comando serve | Comando build |
|---------|-------------|---------------|---------------|
| dev | `.env` | `pnpm run serve:dev` | `pnpm run build:dev` |
| stg | `.env.stg` | `pnpm run serve:stg` | `pnpm run build:stg` |
| uat | `.env.uat` | `pnpm run serve:uat` | `pnpm run build:uat` |
| prod | `.env.prod` | `pnpm run serve:prod` | `pnpm run build:prod` |

## Base de Datos

- **Motor**: MySQL 8.0
- **Docker**: `docker-compose.yml` disponible para desarrollo local
- **Migraciones**: Directorio `database/migrations/`

## Seeding

```bash
pnpm run seed:example    # Poblar base de datos con datos de ejemplo
```

Los datos se encuentran en `data/data.json` con imagenes en `data/uploads/`.

## CI/CD

- Deploy automatico a **staging** via GitHub Actions al hacer push a la rama `stg`
- Process manager: **PM2**
- Despliegue via SSH

## Comandos Utiles

```bash
pnpm run serve:dev       # Desarrollo con autoReload
pnpm run build:dev       # Build del admin panel
pnpm run start:dev       # Iniciar sin autoReload
pnpm run seed:example    # Seed de datos de ejemplo
pnpm run upgrade:dry     # Simular upgrade de Strapi
```

## Contenido i18n

El proyecto soporta **internacionalizacion** (i18n) con soporte multi-pais:

- CO (Colombia), PY (Paraguay), BO (Bolivia)
- NI (Nicaragua), SV (El Salvador), GT (Guatemala)
- PA (Panama), HN (Honduras)
