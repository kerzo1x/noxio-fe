# Noxio(frontend)

Frontend for a **Notion-style** workspace: organize pages and tasks in a familiar sidebar-and-content layout, switch between workspaces.

## Stack

- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) 8
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/) 4 (`@tailwindcss/vite`)

## Prerequisites

- **Node.js** 20+ (the Docker build image uses Node 22)
- **npm** 10+

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open **http://localhost:5173** (port is set in `vite.config.ts`).

Build and preview a production bundle locally:

```bash
npm run build
npm run preview
```

## API

The HTTP client lives in `src/api/index.ts` with base URL **`https://hrica.skyro.dev/api/v1`**. Requests include `Authorization: Bearer` from `localStorage` (`access_token`). Point to another backend by changing `baseURL` there.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Redirects to `/auth/login` |
| `/auth/login`, `/auth/register` | Sign in and sign up |
| `/auth/verify` | Two-factor authentication |
| `/auth/forgot-password`, `/auth/reset-password` | Password recovery |
| `/auth/edupage`, `/auth/edupage/login` | EduPage integration |
| `/dashboard` | Main app shell with sidebar |

## Docker (production image)

Build and run **from the repository root**:

```bash
docker build -f docker/Dockerfile -t notion-fe .
docker run --rm -p 8080:80 notion-fe
```

The app is served at **http://localhost:8080** (container listens on port 80; see `docker/Dockerfile`).

CI/CD is wired in `.gitlab-ci.yml` (build uses `docker/Dockerfile`; `APP_NAME` is `noxio-fe`). The compose files under `docker/dev/` and `docker/local/` are environment-specific (registry, external networks)—use them where you deploy, not as a generic quick start.

## VS Code tip

If the editor warns on Tailwind directives like `@apply`, add to `settings.json`:

```json
{
  "css.lint.unknownAtRules": "ignore",
  "scss.lint.unknownAtRules": "ignore"
}
```
