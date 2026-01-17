# RealWorld Next.js Feature Flag Demo

A frontend implementation of the [RealWorld specification](https://main--realworld-docs.netlify.app/) built with Next.js 15, React Server Components, and a feature flag system for controlled rollouts.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Feature Flags](#feature-flags)
- [Available Scripts](#available-scripts)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project demonstrates modern Next.js development patterns through a social blogging platform where users can browse articles, create accounts, write and edit posts with Markdown support, comment on articles, and follow other users. The implementation showcases React Server Components with the App Router, type-safe API integration via OpenAPI-generated TypeScript types, and a feature flag system for gradual rollouts.

## Quick Start

A demo is available at https://realworld-nextjs-rsc.vercel.app/.

To run locally:

```bash
# Clone the repository
git clone https://github.com/araza007/feature-flag-demo.git
cd feature-flag-demo

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Configure your backend API endpoint in .env.local
# API_BASE_URL=https://api.realworld.io/api

# Start development server
npm run dev
```

The application will be available at http://localhost:3000.

## Project Structure

```
.
├── api/                  # OpenAPI schema for type generation
├── docs/                 # Additional documentation
├── flags/                # Feature flag registry
│   └── registry.json     # Flag definitions with metadata
├── public/               # Static assets
└── src/
    ├── app/              # Next.js App Router pages
    ├── config/           # Global configuration and constants
    │   └── featureFlags.ts  # Feature flag loader
    ├── generated/        # Auto-generated API types
    ├── modules/
    │   ├── common/       # Shared UI components
    │   └── features/     # Feature-specific modules
    ├── styles/           # Global stylesheets
    └── utils/            # Utilities and helpers
```

## Feature Flags

This project includes a feature flag system for controlled rollouts. Flags are defined in `flags/registry.json` and loaded by `src/config/featureFlags.ts`.

### Available Flags

| Flag                | Description                            | Default |
| ------------------- | -------------------------------------- | ------- |
| `ENABLE_NEW_NAVBAR` | Toggle modern navbar UI                | `false` |
| `SHOW_POPULAR_TAGS` | Show Popular Tags sidebar on home page | `true`  |
| `USE_V2_API_CLIENT` | Use v2 internal API client             | `true`  |

### Toggling Flags

Add overrides in `.env.local` and restart the dev server:

```env
NEXT_PUBLIC_ENABLE_NEW_NAVBAR=true
NEXT_PUBLIC_SHOW_POPULAR_TAGS=false
NEXT_PUBLIC_USE_V2_API_CLIENT=true
```

For detailed information about the feature flag system, see [docs/feature-flags.md](docs/feature-flags.md).

## Available Scripts

| Command                    | Description                                 |
| -------------------------- | ------------------------------------------- |
| `npm run dev`              | Start development server                    |
| `npm run build`            | Build for production                        |
| `npm run start`            | Run production build                        |
| `npm run lint`             | Run ESLint                                  |
| `npm run format`           | Format code with Prettier                   |
| `npm run openapi-generate` | Generate TypeScript types from OpenAPI spec |

## Technology Stack

| Technology                                    | Version | Purpose                             |
| --------------------------------------------- | ------- | ----------------------------------- |
| [Next.js](https://nextjs.org/)                | 15.x    | React framework with App Router     |
| [React](https://react.dev/)                   | 18.x    | UI library with Server Components   |
| [TypeScript](https://www.typescriptlang.org/) | 5.5.x   | Type-safe JavaScript                |
| [Conform](https://conform.guide/)             | 1.2.x   | Form validation library             |
| [Zod](https://zod.dev/)                       | 3.x     | Schema validation                   |
| [unified](https://unifiedjs.com/)             | 11.x    | Markdown to HTML conversion         |
| [OpenAPI TypeScript](https://openapi-ts.dev/) | 7.x     | Type generation from OpenAPI schema |

### Requirements

- Node.js 18.x or later
- npm 9.x or later

## Contributing

Bug fixes and suggestions are welcome. Please open an issue or submit a pull request.

This project uses Husky for Git hooks, which automatically formats staged files with Prettier on commit.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

_Originally written and maintained by contributors and [Devin](https://app.devin.ai), with updates from the core team._
