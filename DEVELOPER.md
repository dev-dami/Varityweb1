# Varityweb Developer Documentation

## Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose (if running PostgreSQL locally)
- Bun package manager (preferred) or npm
- Git

## Initial Setup

1. Clone the repository and navigate to the project root:

   ```bash
   git clone <repository-url>
   cd varityweb
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your specific configuration values, including your Supabase PostgreSQL connection strings, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `BETTER_AUTH_API_KEY`.

4. Start the local PostgreSQL database (optional if using live Supabase):

   ```bash
   docker-compose up -d
   ```

5. Push the database schema:
   ```bash
   npx prisma db push
   ```

## Development Workflow

1. Start the development server:

   ```bash
   bun run dev
   ```

   This starts the Next.js development server with Turbopack enabled.

2. The application will be available at `http://localhost:3000`. 
   To test subdomain routing locally, you can access pages using:
   - `http://app.localhost:3000` (Dashboard and authentication)
   - `http://[site-subdomain].localhost:3000` (Published websites)

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build the application
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio for database management

## Project Structure

- `src/` - Main source code
- `prisma/` - Database schema
- `public/` - Static assets
- `components/` - Reusable UI components

## Database Management

The project uses PostgreSQL with Prisma as the ORM. The database runs in a transaction/session pooler setup in production (Supabase).

To view and manage the database, you can use Prisma Studio:

```bash
npx prisma studio
```

## Environment Variables

Required environment variables are defined in `.env.example`. Make sure to set up all required variables in your `.env` file before starting the application.

### Setting up Better Auth

1. Configure `BETTER_AUTH_SECRET` (generate a secure random key).
2. Configure `BETTER_AUTH_URL` (typically `http://app.localhost:3000` for local testing).
3. Configure `BETTER_AUTH_API_KEY` for infrastructure/deployment sync.

## Troubleshooting

- If you encounter database connection issues, verify your database URL and credentials in `.env` (ensure special characters in the password are URL-encoded).
- For Prisma-related issues, try running `npx prisma generate`.
- Clear the `.next` directory and `node_modules` if you encounter build issues.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://better-auth.com/docs)
