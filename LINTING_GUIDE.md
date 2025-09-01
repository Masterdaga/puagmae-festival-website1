# Linting Guide for PUAGMAE Festival Website

This project uses ESLint and Prettier to maintain code quality and consistency across both frontend and backend code.

## What is Linting?

A linter is a tool that analyzes your code to detect:
- **Errors**: Syntax errors, undefined variables, etc.
- **Potential bugs**: Logic issues, unreachable code, etc.
- **Stylistic issues**: Inconsistent formatting, naming conventions
- **Code quality**: Best practices, security issues, performance problems

## Tools Used

### ESLint
- **Purpose**: Code analysis and error detection
- **Configuration**: Custom rules for React/Next.js (frontend) and Node.js (backend)
- **Files**: `eslint.config.mjs` in both root and backend directories

### Prettier
- **Purpose**: Code formatting and style consistency
- **Configuration**: `.prettierrc` files with consistent formatting rules
- **Files**: `.prettierrc` and `.prettierignore` in both root and backend directories

## Available Commands

### Frontend (Root Directory)
```bash
# Check for linting errors
npm run lint

# Fix auto-fixable linting errors
npm run lint:fix

# Format code with Prettier
npm run format

# Check if code is properly formatted
npm run format:check
```

### Backend (Backend Directory)
```bash
# Check for linting errors
npm run lint

# Fix auto-fixable linting errors
npm run lint:fix

# Format code with Prettier
npm run format

# Check if code is properly formatted
npm run format:check
```

## Configuration Details

### ESLint Rules
- **Code Quality**: No unused variables, prefer const over let, no console.log in production
- **React/Next.js**: Proper hook usage, TypeScript integration
- **Node.js**: Best practices for server-side code
- **Import Organization**: Consistent import ordering

### Prettier Settings
- **Semicolons**: Always use semicolons
- **Quotes**: Single quotes for strings
- **Line Width**: 80 characters
- **Indentation**: 2 spaces
- **Trailing Commas**: ES5 compatible

## IDE Integration

### VS Code
Install these extensions for the best experience:
- **ESLint**: Real-time linting feedback
- **Prettier**: Automatic code formatting
- **Auto Format on Save**: Enable in VS Code settings

### Recommended VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"]
}
```

## Workflow Integration

### Before Committing
1. Run `npm run lint` to check for errors
2. Run `npm run format` to format code
3. Fix any remaining linting issues manually

### CI/CD Integration
Add these commands to your deployment pipeline:
```bash
npm run lint
npm run format:check
```

## Common Issues and Solutions

### "Cannot find module" errors
- Run `npm install` to ensure all dependencies are installed
- Check if the module is in the correct directory

### Formatting conflicts
- Run `npm run format` to auto-fix formatting issues
- Check `.prettierignore` if certain files shouldn't be formatted

### TypeScript errors
- Ensure TypeScript is properly configured
- Check `tsconfig.json` for correct paths and settings

## Benefits

1. **Consistency**: All code follows the same style and conventions
2. **Quality**: Catches potential bugs before they reach production
3. **Maintainability**: Easier to read and maintain code
4. **Team Collaboration**: Reduces style conflicts between team members
5. **Professional Standards**: Industry-standard code quality practices

## Getting Started

1. Install dependencies:
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd backend && npm install
   ```

2. Run linting:
   ```bash
   # Frontend
   npm run lint
   
   # Backend
   cd backend && npm run lint
   ```

3. Fix any issues and format code:
   ```bash
   npm run lint:fix
   npm run format
   ```

Your code is now ready with professional-grade linting and formatting! 🎉
