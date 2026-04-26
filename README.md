# Noxio(Frontend)

## Getting Started

To get started with this app, simply paste this command into your terminal:

```bash
npm install
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Prod

To start this app on server run:

```
docker compose up --build
```

Open http://localhost

## Errors

If you have this error: Unknown at rule @apply, just search in VSC: >Prefernces: Open User settins (JSON), and add this:

```json
    "css.lint.unknownAtRules": "ignore",
    "scss.lint.unknownAtRules": "ignore",
```
