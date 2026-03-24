# Vassouras Pernambucanas - Frontend

A modern React-based frontend application for the Vassouras Pernambucanas e-commerce platform. Built with Vite, React Router, and Tailwind CSS for a fast, responsive user experience.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)

## Overview

This is the frontend repository for the Vassouras Pernambucanas platform, featuring a product catalog, customer contact information, and details about the business. The application provides a responsive, user-friendly interface for browsing products and contacting the company via WhatsApp.

**TODO:** Add description of key features and user flows.

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Runtime | Node.js | ^18 (recommended) |
| Package Manager | npm | Latest |
| Frontend Framework | React | 19.2.0 |
| Build Tool | Vite | 7.3.1 |
| Router | React Router DOM | 7.13.1 |
| CSS Framework | Tailwind CSS | 4.2.1 |
| Linter | ESLint | 9.39.1 |
| Testing | Vitest | 4.1.0 |
| Icon Library | lucide-react | 0.577.0 |
| Deployment | Vercel | — |

### Key Dependencies

- **react-dom**: DOM rendering for React
- **tailwindcss**: Utility-first CSS framework
- **@tailwindcss/vite**: Vite integration for Tailwind CSS
- **lucide-react**: Beautiful icon library
- **postcss & autoprefixer**: CSS processing

### Dev Tools

- **@vitejs/plugin-react-swc**: Fast React refresh using SWC
- **eslint-plugin-react-hooks & react-refresh**: React development best practices
- **vitest**: Modern unit testing framework
- **@types/react & @types/react-dom**: TypeScript type definitions

## Requirements

- **Node.js**: >= 18.x
- **npm**: >= 8.x (or equivalent package manager)
- **Git**: For version control

## Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/VictorbSilva/vass-pern-front.git
   cd front-vassouras
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables** (if needed):
   - See [Environment Variables](#environment-variables) section

## Running the Application

### Development Server

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Production Build

Build the application for production:

```bash
npm run build
```

Output files will be in the `dist/` directory, ready for deployment.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server with HMR |
| `build` | `vite build` | Build for production to `dist/` |
| `preview` | `vite preview` | Serve production build locally for testing |
| `lint` | `eslint .` | Run ESLint to check code quality |
| `test` | `vitest` | Run unit tests with Vitest |

**Examples:**

```bash
npm run dev      # Start dev server
npm run build    # Create production build
npm run lint     # Check for linting errors
npm run test     # Run tests
```

## Environment Variables

**TODO:** Document required and optional environment variables, e.g.:

```
VITE_API_URL=<API endpoint URL>
VITE_APP_NAME=<app name>
```

Create a `.env.local` file in the project root for local development (not committed to git).

Vite automatically prefixes variables with `VITE_` to expose them to the frontend. To use them in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Testing

Run the test suite using Vitest:

```bash
npm run test
```

**Test Files:**
- Tests are colocated with components or in dedicated `.test.js(x)` files
- Example: [front-vassouras/src/utils/GeraLinkWhatsapp.test.jsx](front-vassouras/src/utils/GeraLinkWhatsapp.test.jsx)

**TODO:** Add information about test coverage, CI/CD testing, and test running in watch mode.

## Project Structure

```
vassouras-pernambucanas-front/
├── front-vassouras/                 # Main React application
│   ├── public/                      # Static assets (images, fonts, etc.)
│   ├── src/
│   │   ├── main.jsx                # React app entry point
│   │   ├── App.jsx                 # Root component
│   │   ├── App.css                 # Global app styles
│   │   ├── index.css               # Global styles
│   │   ├── pages/                  # Route pages (page components)
│   │   │   ├── Home.jsx
│   │   │   ├── Catalogo.jsx        # Product catalog
│   │   │   ├── ProdutoDetalhe.jsx  # Product detail page
│   │   │   ├── Contatos.jsx        # Contact information
│   │   │   └── Sobre.jsx           # About page
│   │   ├── components/             # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProdutoCard.jsx     # Product card component
│   │   │   └── BotaoWhatsapp.jsx   # WhatsApp button component
│   │   ├── services/               # API & external service calls
│   │   │   └── api.js              # API client configuration
│   │   ├── utils/                  # Utility functions
│   │   │   ├── GeraLinkWhatsapp.jsx    # Generates WhatsApp links
│   │   │   └── GeraLinkWhatsapp.test.jsx
│   │   ├── data/                   # Static data files
│   │   └── assets/                 # Images, icons, etc.
│   ├── index.html                  # HTML entry point
│   ├── vite.config.js              # Vite configuration
│   ├── eslint.config.js            # ESLint configuration
│   ├── vercel.json                 # Vercel deployment config
│   ├── package.json                # Project metadata & dependencies
│   └── README.md                   # (deprecated - see repo root)
├── README.md                        # This file (repo documentation)
└── .git/                            # Git repository
```

### Key Directories

- **`front-vassouras/pages/`**: Page-level components tied to routes. Each file typically represents a route.
- **`front-vassouras/components/`**: Reusable UI components used across pages.
- **`front-vassouras/services/`**: API calls and external integrations (e.g., WhatsApp API).
- **`front-vassouras/utils/`**: Helper functions and utilities.
- **`front-vassouras/data/`**: Static data, constants, or mock data.

## Deployment

### Vercel

This project is configured for deployment on Vercel. The `vercel.json` file configures client-side routing for single-page application (SPA) behavior.

**Deployment Steps:**

1. Push code to GitHub
2. Connect repository to Vercel via https://vercel.com
3. Vercel automatically detects Vite and builds/deploys on push

**Build Settings (auto-detected):**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

**TODO:** Add information about custom domain, environment variables in Vercel, and preview deployments.

## License

**TODO:** Specify the license (e.g., MIT, Apache 2.0, proprietary, etc.)

---

## Additional Resources

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)
- [ESLint Documentation](https://eslint.org/)
