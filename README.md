# lusk.app

[![CI](https://github.com/lusky3/lusk.app/actions/workflows/ci.yml/badge.svg)](https://github.com/lusky3/lusk.app/actions/workflows/ci.yml)
[![Security](https://github.com/lusky3/lusk.app/actions/workflows/security.yml/badge.svg)](https://github.com/lusky3/lusk.app/actions/workflows/security.yml)
[![Deploy](https://github.com/lusky3/lusk.app/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/lusky3/lusk.app/actions/workflows/deploy-production.yml)

A modern landing page showcasing open source projects by [Lusk Technologies, Inc](https://lusk.tech).

## 🚀 Features

- **Modern Design** - Built with Next.js 16, Tailwind CSS, and Framer Motion
- **Responsive** - Looks great on all devices
- **Fast** - Static generation for optimal performance
- **Animated** - Smooth animations and transitions
- **Dark Mode** - Beautiful dark theme by default
- **Accessible** - WCAG compliant with Lighthouse audits

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📧 Contact Form Setup

The contact form sends emails using [Resend](https://resend.com). To enable:

1. Sign up at [resend.com](https://resend.com) (free: 3,000 emails/month)
2. Verify your domain (lusk.app) or use their test domain
3. Create an API key
4. Add to `.env.local`:

   ```text
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```

Without the API key, form submissions are logged to the console.

## 🔧 GitHub Actions Workflows

This project includes several automated workflows:

| Workflow | Trigger | Description |
| ---------- | --------- | ------------- |
| **CI** | Push/PR to main | Linting, type checking, build, and Lighthouse audits |
| **Security** | Push/PR/Weekly | npm audit, Snyk scanning, CodeQL analysis |
| **Deploy Preview** | PR to main | Deploys preview to Vercel with PR comment |
| **Deploy Production** | Push to main | Deploys to production with Sentry release |
| **Dependency Updates** | Weekly | Automated dependency update PRs |

## 🔐 Required Secrets

To enable all workflows, add these secrets to your repository:

### Vercel Deployment

- `VERCEL_TOKEN` - Vercel API token ([Get one here](https://vercel.com/account/tokens))
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

```bash
# Get org and project IDs by running:
npx vercel link
# Then check .vercel/project.json
```

### Security Scanning

- `SNYK_TOKEN` - Snyk API token ([Sign up free](https://snyk.io/))

### Error Tracking (Optional)

- `SENTRY_AUTH_TOKEN` - Sentry auth token ([Sign up free](https://sentry.io/))
- `SENTRY_ORG` - Your Sentry organization slug
- `SENTRY_PROJECT` - Your Sentry project slug

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables
4. Deploy!

Or use the CLI:

```bash
npx vercel
```

### Netlify

```bash
npm run build
# Deploy the .next folder using Netlify's Next.js plugin
```

## 📊 Third-Party Services

| Service | Purpose | Free Tier |
| --------- | --------- | ----------- |
| [Vercel](https://vercel.com) | Hosting & Deployment | ✅ Hobby plan |
| [Snyk](https://snyk.io) | Security scanning | ✅ Free for open source |
| [Sentry](https://sentry.io) | Error tracking | ✅ 5K errors/month |
| [GitHub CodeQL](https://github.com/features/security) | Code analysis | ✅ Free for public repos |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Performance audits | ✅ Free |
| [Dependabot](https://github.com/dependabot) | Dependency updates | ✅ Built into GitHub |
| [Resend](https://resend.com) | Contact form emails | ✅ 3K emails/month |

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

© 2026 Lusk Technologies, Inc.
