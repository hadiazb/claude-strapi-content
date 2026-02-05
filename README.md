# Strapi Content - Portfolio CMS

Headless CMS built with Strapi 5 for a multi-country portfolio application with i18n support.

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Content Types](#content-types)
- [Components](#components)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables Configuration](#environment-variables-configuration)
- [Development Setup](#development-setup)
- [Available Environments](#available-environments)
- [API Endpoints](#api-endpoints)
- [Seeding](#seeding)
- [Available Scripts](#available-scripts)
- [CI/CD](#cicd)
- [Docker](#docker)
- [Contributing](#contributing)

## Description

This project is a headless CMS that provides content management for a multi-country portfolio application. It includes:

- Multi-country support (CO, PY, BO, NI, SV, GT, PA, HN)
- Internationalization (i18n) for localized content
- Module configuration management with dynamic forms and actions
- Navigation menu management (tabs and profile menus)
- Global site settings with SEO support
- Custom API controllers with response transformation
- Database seeding with example data and media uploads
- Multi-environment configuration (dev, stg, uat, prod)
- Automated deployment to staging via GitHub Actions

## Technologies

### Core

| Technology | Version | Description |
|------------|---------|-------------|
| Node.js | >= 18.x, <= 22.x | Runtime environment |
| Strapi | 5.18.0 | Headless CMS framework |
| TypeScript | ^5 | Programming language |
| MySQL | 8.0 | Relational database |
| pnpm | Latest | Package manager |

### Dependencies

| Library | Version | Description |
|---------|---------|-------------|
| @strapi/strapi | 5.18.0 | Strapi core |
| @strapi/plugin-cloud | 5.18.0 | Strapi Cloud integration |
| @strapi/plugin-users-permissions | 5.18.0 | Users & Permissions plugin |
| mysql2 | 3.9.8 | MySQL driver |
| react | ^18.0.0 | Admin panel UI |
| react-dom | ^18.0.0 | Admin panel rendering |
| react-router-dom | ^6.0.0 | Admin panel routing |
| styled-components | ^6.0.0 | Admin panel styling |
| fs-extra | ^10.0.0 | File system utilities (seeding) |
| mime-types | ^2.1.27 | MIME type detection (seeding) |

### Development Dependencies

| Library | Version | Description |
|---------|---------|-------------|
| typescript | ^5 | TypeScript compiler |
| @types/node | ^20 | Node.js type definitions |
| @types/react | ^18 | React type definitions |
| @types/react-dom | ^18 | React DOM type definitions |
| dotenv-cli | ^8.0.0 | Environment variable loading per environment |

## Architecture

The project follows the standard **Strapi 5 architecture** with custom controllers for response transformation:

```
src/
├── api/                               # API endpoints (Content Types)
│   ├── module/                        # Module API (collection type)
│   │   ├── content-types/module/
│   │   │   └── schema.json           # Module schema definition
│   │   ├── controllers/
│   │   │   └── module.ts             # Custom controller (response transformation)
│   │   ├── routes/
│   │   │   └── module.ts             # Route definitions
│   │   └── services/
│   │       └── module.ts             # Service layer
│   ├── global/                        # Global Settings API (single type)
│   │   ├── content-types/global/
│   │   │   └── schema.json
│   │   ├── controllers/
│   │   │   └── global.ts             # Default core controller
│   │   ├── routes/
│   │   │   └── global.ts
│   │   └── services/
│   │       └── global.ts
│   ├── tabs-menu/                     # Tabs Menu API (collection type)
│   │   ├── content-types/tabs-menu/
│   │   │   └── schema.json
│   │   ├── controllers/
│   │   │   └── tabs-menu.ts          # Custom controller (strips system fields)
│   │   ├── routes/
│   │   │   └── tabs-menu.ts
│   │   └── services/
│   │       └── tabs-menu.ts
│   └── about-me-menu/                # Profile Menu API (collection type)
│       ├── content-types/about-me-menu/
│       │   └── schema.json
│       ├── controllers/
│       │   └── about-me-menu.ts      # Custom controller (strips system fields)
│       ├── routes/
│       │   └── about-me-menu.ts
│       └── services/
│           └── about-me-menu.ts
├── components/                        # Reusable components
│   ├── page/                          # Page-level components
│   │   ├── action.json               # Form actions/buttons
│   │   ├── title.json                # Titles with visibility toggle
│   │   ├── data-object.json          # Backend/frontend data structures
│   │   ├── characteristic.json       # Characteristics
│   │   ├── country.json              # Country enumeration
│   │   ├── formatting.json           # Formatting options
│   │   ├── icon.json                 # Icon definitions
│   │   └── parameter.json            # Parameters
│   └── shared/                        # Shared components
│       └── seo.json                   # SEO metadata (title, description, image)
├── admin/                             # Admin panel configuration
│   ├── app.example.tsx               # Example admin app config
│   ├── vite.config.example.ts        # Example Vite config
│   └── tsconfig.json                 # Admin TypeScript config
├── extensions/                        # Plugin extensions
└── index.ts                           # Main entry point (register/bootstrap hooks)
```

### Custom Controllers

| Controller | Behavior |
|------------|----------|
| **module** | Transforms response: wraps data in `config` object, removes internal IDs from nested components, restructures title/dataObjects/country fields |
| **tabs-menu** | Strips system fields: `documentId`, `createdAt`, `updatedAt`, `publishedAt`, `locale`, `localizations` |
| **about-me-menu** | Same cleanup as tabs-menu |
| **global** | Uses default Strapi core controller |

## Content Types

### Module (Collection Type)

Configurable modules with dynamic forms and actions. Supports i18n.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| uid | UID | No | Unique identifier |
| moduleId | UID | Yes | Module identifier |
| moduleName | String | Yes | Module display name |
| description | Text | Yes | Module description |
| country | Enum | Yes | Target country (CO, PY, BO, NI, SV, GT, PA, HN) |
| title | Component (page.title) | Yes | Module title |
| form_objects | Component (page.action) | No | Repeatable form objects |
| actions | Component (page.action) | No | Repeatable actions |
| formatting | JSON | No | Custom formatting configuration |
| dataObjects | Component (page.data-object) | No | Backend/frontend data |

### Global (Single Type)

Global site settings with SEO support.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| siteName | String | Yes | Site name |
| siteDescription | Text | Yes | Site description |
| favicon | Media | No | Site favicon |
| defaultSeo | Component (shared.seo) | No | Default SEO metadata |

### TabsMenu (Collection Type)

Navigation tabs configuration. Supports i18n.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| label | String | Yes | Display label |
| enabled | Boolean | No | Enabled state (default: true) |
| icon | String | Yes | Icon identifier |
| route | String | Yes | Navigation route |
| description | String | No | Tab description |
| menuId | Integer | Yes | Unique menu order |
| fontSize | Integer | No | Font size (default: 11) |
| menuName | String | Yes | Menu name identifier |
| menuType | String | Yes | Menu type |
| country | Enum | Yes | Target country |

### AboutMeMenu (Collection Type)

Profile/about section menu configuration. Supports i18n.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| enable | Boolean | No | Enabled state (default: true) |
| order | Integer | Yes | Display order (unique) |
| menuName | String | Yes | Menu name identifier |
| menuType | String | Yes | Menu type |
| title | String | No | Section title |
| description | String | No | Section description |
| maintenance_mode | Boolean | No | Maintenance mode flag (default: false) |
| country | Enum | No | Target country (default: CO) |

## Components

### Page Components (`page.*`)

| Component | Key Attributes | Description |
|-----------|---------------|-------------|
| `page.action` | name, type, label, show, parameters, icon, characteristics | Generic action/form object |
| `page.title` | name, show | Title with visibility toggle |
| `page.data-object` | backend, frontend | JSON data structures |
| `page.characteristic` | - | Characteristic placeholder |
| `page.country` | - | Country enumeration |
| `page.formatting` | - | Formatting options |
| `page.icon` | - | Icon definition |
| `page.parameter` | - | Parameter definition |

### Shared Components (`shared.*`)

| Component | Key Attributes | Description |
|-----------|---------------|-------------|
| `shared.seo` | metaTitle, metaDescription, shareImage | SEO metadata |

## Project Structure

```
strapi-content/
├── .github/
│   └── workflows/
│       └── strapi-deploy.yml    # GitHub Actions: deploy to staging
├── config/
│   ├── admin.ts                 # Admin panel config (JWT, tokens, encryption)
│   ├── api.ts                   # REST API config (pagination limits)
│   ├── database.ts              # Database connection (MySQL/PostgreSQL/SQLite)
│   ├── middlewares.ts           # Middleware stack (logger, CORS, security, etc.)
│   ├── plugins.ts               # Plugin configuration
│   └── server.ts                # Server config (host, port, app keys)
├── data/
│   ├── data.json                # Seed data (articles, categories, authors, etc.)
│   └── uploads/                 # Seed media files (13 images)
├── database/
│   └── migrations/              # Database migrations
├── scripts/
│   └── seed.js                  # Database seeding script
├── src/                         # Application source code
├── types/
│   └── generated/
│       ├── contentTypes.d.ts    # Generated content type definitions
│       └── components.d.ts      # Generated component definitions
├── public/
│   ├── uploads/                 # Public upload directory
│   └── robots.txt               # Search engine directives
├── docker-compose.yml           # Docker config (MySQL 8.0)
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── pnpm-lock.yaml               # pnpm lockfile
├── CLAUDE.md                    # Project conventions for Claude
└── README.md                    # This file
```

## Requirements

### Required Software

| Software | Version | Description |
|----------|---------|-------------|
| Node.js | >= 18.x, <= 22.x | JavaScript runtime |
| pnpm | Latest | Package manager |
| Docker | 20.x+ | Containers (for MySQL) |
| Docker Compose | 2.x+ | Container orchestration |

### Verify Installation

```bash
# Verify Node.js
node --version

# Verify pnpm
pnpm --version

# Verify Docker
docker --version

# Verify Docker Compose
docker compose version
```

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd strapi-content
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create or edit the `.env` file with your local configuration. See [Environment Variables Configuration](#environment-variables-configuration) for details.

## Environment Variables Configuration

### Available Variables

#### Server

| Variable | Description | Default |
|----------|-------------|---------|
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `4200` |
| `NODE_ENV` | Execution environment | `development` |

#### Security Keys

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_KEYS` | Application keys (comma-separated base64) | - |
| `API_TOKEN_SALT` | Salt for API tokens | - |
| `ADMIN_JWT_SECRET` | JWT secret for admin panel | - |
| `TRANSFER_TOKEN_SALT` | Salt for transfer tokens | - |
| `ENCRYPTION_KEY` | Data encryption key | - |
| `JWT_SECRET` | JWT secret for content API | - |

#### Database

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_CLIENT` | Database engine (mysql, postgres, sqlite) | `mysql` |
| `DATABASE_HOST` | Database host | `127.0.0.1` |
| `DATABASE_PORT` | Database port | `3306` |
| `DATABASE_NAME` | Database name | `strapi` |
| `DATABASE_USERNAME` | Database username | - |
| `DATABASE_PASSWORD` | Database password | - |
| `DATABASE_SSL` | Enable SSL connection | `false` |

### Example .env file

```env
# Server
HOST="0.0.0.0"
PORT="4200"
NODE_ENV="development"

# Security Keys
APP_KEYS="key1==,key2==,key3==,key4=="
API_TOKEN_SALT="your-api-token-salt"
ADMIN_JWT_SECRET="your-admin-jwt-secret"
TRANSFER_TOKEN_SALT="your-transfer-token-salt"
ENCRYPTION_KEY="your-encryption-key"
JWT_SECRET="your-jwt-secret"

# Database
DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=strapi
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=false
```

## Development Setup

### 1. Start the database with Docker

```bash
# Start MySQL
docker compose up -d

# Verify the container is running
docker ps
```

### 2. Build the admin panel

```bash
pnpm run build:dev
```

### 3. Start the application

```bash
# Development mode with autoReload
pnpm run serve:dev
```

### 4. Verify the application is running

```bash
# Admin panel:
# http://localhost:4200/admin

# REST API:
# http://localhost:4200/api

# Example API call
curl http://localhost:4200/api/tabs-menus
```

### 5. Seed example data (optional)

```bash
pnpm run seed:example
```

## Available Environments

| Environment | Serve | Build | Start | Config File |
|-------------|-------|-------|-------|-------------|
| Development | `pnpm run serve:dev` | `pnpm run build:dev` | `pnpm run start:dev` | `.env` |
| Staging | `pnpm run serve:stg` | `pnpm run build:stg` | `pnpm run start:stg` | `.env.stg` |
| UAT | `pnpm run serve:uat` | `pnpm run build:uat` | `pnpm run start:uat` | `.env.uat` |
| Production | `pnpm run serve:prod` | `pnpm run build:prod` | `pnpm run start:prod` | `.env.prod` |

**Note:** `serve` starts with autoReload (development), `start` runs without autoReload (production).

## API Endpoints

Base URL: `http://localhost:4200/api`

### Module (`/api/modules`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/modules` | List all modules | Public |
| GET | `/api/modules/:id` | Get module by ID | Public |
| POST | `/api/modules` | Create module | Admin |
| PUT | `/api/modules/:id` | Update module | Admin |
| DELETE | `/api/modules/:id` | Delete module | Admin |

### Global (`/api/global`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/global` | Get global settings | Public |
| PUT | `/api/global` | Update global settings | Admin |

### Tabs Menu (`/api/tabs-menus`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tabs-menus` | List all tab menus | Public |
| GET | `/api/tabs-menus/:id` | Get tab menu by ID | Public |
| POST | `/api/tabs-menus` | Create tab menu | Admin |
| PUT | `/api/tabs-menus/:id` | Update tab menu | Admin |
| DELETE | `/api/tabs-menus/:id` | Delete tab menu | Admin |

### About Me Menu (`/api/about-me-menus`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/about-me-menus` | List all profile menus | Public |
| GET | `/api/about-me-menus/:id` | Get profile menu by ID | Public |
| POST | `/api/about-me-menus` | Create profile menu | Admin |
| PUT | `/api/about-me-menus/:id` | Update profile menu | Admin |
| DELETE | `/api/about-me-menus/:id` | Delete profile menu | Admin |

### REST API Configuration

| Setting | Value |
|---------|-------|
| Default page size | 25 |
| Max page size | 100 |
| Include count | Yes |

### Query Parameters

All list endpoints support Strapi's standard query parameters:

```bash
# Pagination
?pagination[page]=1&pagination[pageSize]=10

# Sorting
?sort=createdAt:desc

# Filtering
?filters[country][$eq]=CO

# Locale
?locale=es

# Populate relations
?populate=*
```

## Seeding

The project includes a seeding script to populate the database with example data.

```bash
pnpm run seed:example
```

This script:
- Checks if it's a first run to avoid duplicate data
- Sets public permissions for content reading
- Uploads media files from `data/uploads/`
- Creates entries from `data/data.json` (articles, categories, authors, global settings)

**Data source:** `data/data.json` with 13 media files in `data/uploads/`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run serve:dev` | Start in development with autoReload |
| `pnpm run serve:stg` | Start staging with autoReload |
| `pnpm run serve:uat` | Start UAT with autoReload |
| `pnpm run serve:prod` | Start production with autoReload |
| `pnpm run build:dev` | Build admin panel (dev) |
| `pnpm run build:stg` | Build admin panel (stg) |
| `pnpm run build:uat` | Build admin panel (uat) |
| `pnpm run build:prod` | Build admin panel (prod) |
| `pnpm run start:dev` | Start without autoReload (dev) |
| `pnpm run start:stg` | Start without autoReload (stg) |
| `pnpm run start:uat` | Start without autoReload (uat) |
| `pnpm run start:prod` | Start without autoReload (prod) |
| `pnpm run seed:example` | Seed database with example data |
| `pnpm run console` | Open Strapi interactive console |
| `pnpm run deploy` | Deploy via Strapi Cloud |
| `pnpm run upgrade` | Upgrade Strapi to latest version |
| `pnpm run upgrade:dry` | Simulate Strapi upgrade (no changes) |

## CI/CD

### Staging Deployment

The project includes a GitHub Actions workflow (`.github/workflows/strapi-deploy.yml`) for automated deployment to staging.

**Trigger:** Push to `stg` branch

**Process:**
1. Checkout repository
2. SSH into deployment server
3. Pull latest changes from `stg` branch
4. Install dependencies with `pnpm install --frozen-lockfile`
5. Build admin panel with `pnpm run build:stg`
6. Restart application with PM2 (`strapi-stg`)

**Required GitHub Secrets:**

| Secret | Description |
|--------|-------------|
| `SSH_HOST` | Deployment server hostname |
| `SSH_USER` | SSH username |
| `SSH_KEY` | SSH private key |
| `PROJECT_PATH` | Project path on server |

## Docker

### MySQL Setup

```bash
# Start MySQL container
docker compose up -d

# View logs
docker compose logs -f

# Stop container
docker compose down

# Stop and remove volumes
docker compose down -v

# Restart container
docker compose restart
```

### Docker Compose Details

| Service | Image | Port | Container |
|---------|-------|------|-----------|
| mysql | mysql:8.0 | 3306:3306 | strapi-mysql |

Default credentials (development):
- Root password: configured in `.env`
- Database: `strapi`
- User/Password: configured in `.env`

## Contributing

1. Create a branch from `dev`
2. Make your changes following [Conventional Commits](CLAUDE.md)
3. Push and create a Pull Request

## License

This project is private and for internal use only.
