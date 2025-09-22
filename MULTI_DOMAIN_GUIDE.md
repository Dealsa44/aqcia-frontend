# Multi-Domain Configuration Guide

This project now supports multiple domains and environments. Here's how to use each configuration:

## 🌐 Supported Domains

- **Local Development**: `http://localhost:4200`
- **Azure Static Web App**: `https://ashy-stone-06e190203.2.azurestaticapps.net`
- **Custom Domain**: `https://aqci.ge`

## 🚀 Build Commands

### Development (Local)
```bash
npm start
# or
ng serve
```

### Production Builds

#### For Azure Static Web App
```bash
npm run build:azure
# or
ng build --configuration=azure
```

#### For Custom Domain (aqci.ge)
```bash
npm run build:aqci
# or
ng build --configuration=aqci
```

#### Default Production
```bash
npm run build
# or
npm run build:prod
# or
ng build --configuration=production
```

## 🔧 Environment Files

Each configuration uses a specific environment file:

- **Development**: `src/environments/environment.ts`
- **Azure**: `src/environments/environment.azure.ts`
- **Custom Domain**: `src/environments/environment.aqci.ts`
- **Production**: `src/environments/environment.prod.ts`

## 🌍 Backend CORS Configuration

The backend API (`markets_startup_backend/app/main.py`) is configured to accept requests from:

- `https://aqci.ge` (Custom domain)
- `https://ashy-stone-06e190203.2.azurestaticapps.net` (Azure Static Web App)
- `http://localhost:4200` (Local development)
- `https://localhost:4200` (Local development with HTTPS)

## 📋 Deployment Steps

### For Custom Domain (aqci.ge)

1. **Build for custom domain**:
   ```bash
   npm run build:aqci
   ```

2. **Deploy to Azure Static Web App**:
   - The build output will be in `dist/markets_startup/`
   - Deploy this folder to your Azure Static Web App

3. **Configure Custom Domain in Azure**:
   - Go to Azure Portal → Static Web Apps → Your App → Custom domains
   - Add `aqci.ge` as a custom domain
   - Follow the DNS configuration steps

### For Azure Default Domain

1. **Build for Azure**:
   ```bash
   npm run build:azure
   ```

2. **Deploy**:
   - Deploy the `dist/markets_startup/` folder to Azure Static Web App

## 🔍 Environment Variables

Each environment file contains:

- `production`: Boolean indicating if it's a production build
- `apiUrl`: Backend API URL
- `domain`: The domain name for this environment
- `baseUrl`: The full base URL for this environment

## 🛠️ Development Workflow

1. **Local Development**:
   ```bash
   npm start
   ```

2. **Test Custom Domain Locally**:
   ```bash
   npm run start:aqci
   ```

3. **Test Azure Configuration Locally**:
   ```bash
   npm run start:azure
   ```

## 📝 Notes

- The backend CORS is already configured to accept requests from all supported domains
- Each build configuration uses the appropriate environment file
- The static web app configuration supports custom domains
- All configurations use the same backend API URL
