# PandaPaths - Qcode Website

A modern, responsive website built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18.17.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (version 9.0.0 or higher) - Comes with Node.js, or use `npm install -g npm@latest`

To check your current versions:
```bash
node --version
npm --version
```

**Using nvm (Node Version Manager)?** If you have nvm installed, you can automatically use the correct Node.js version:
```bash
nvm use
```
This will read the `.nvmrc` file and switch to the required Node.js version.

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Qcode website"
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required dependencies listed in `package.json` and create a `node_modules` directory.

**Important:** The `package-lock.json` file is included in the repository to ensure consistent dependency versions across all machines. Always commit this file when dependencies change.

### 3. Environment Variables (if needed)

If the project requires environment variables, create a `.env.local` file in the root directory:

```bash
# Example .env.local
# Add your environment variables here
```

**Note:** The `.env.local` file is already in `.gitignore` and won't be committed to version control.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 5. Build for Production

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm start` - Starts the production server (run after `npm run build`)
- `npm run lint` - Runs ESLint to check for code issues
- `npm install` - Installs all project dependencies

## Project Structure

```
├── app/                 # Next.js app directory (pages and routes)
├── components/          # React components
├── contexts/            # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
├── public/              # Static assets (images, etc.)
├── sanity/              # Sanity CMS schema
└── database/            # Database schema files
```

## Technology Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber
- **CMS:** Sanity
- **Database:** PostgreSQL (via pg)

## Troubleshooting

### Issue: `npm install` fails

**Solution:**
- Ensure you're using Node.js 18.17.0 or higher
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Issue: Port 3000 is already in use

**Solution:**
- Stop the process using port 3000, or
- Run the dev server on a different port: `npm run dev -- -p 3001`

### Issue: Build errors

**Solution:**
- Ensure all dependencies are installed: `npm install`
- Clear Next.js cache: `rm -rf .next` (Linux/Mac) or `rmdir /s .next` (Windows)
- Run `npm run build` again

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.

