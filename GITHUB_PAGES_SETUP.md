# GitHub Pages Setup Guide

This repository is configured for GitHub Pages deployment via GitHub Actions. Follow these steps to enable and verify the deployment.

## Prerequisites

All necessary files are already configured:
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Vite configuration with correct base path (`vite.config.ts`)
- ✅ `.nojekyll` file to bypass Jekyll processing
- ✅ React application with proper routing

## Enabling GitHub Pages

**IMPORTANT:** GitHub Pages must be enabled in repository settings for the deployment to work.

### Steps to Enable:

1. **Navigate to Repository Settings**
   - Go to: https://github.com/hyukiody/frontproject-development-serviceApi/settings/pages

2. **Configure Source**
   - Under "Build and deployment"
   - Source: Select **GitHub Actions**
   - This allows the workflow to deploy automatically

3. **Save Changes**
   - The configuration is saved automatically

## How It Works

1. **Automatic Deployment**: Every push to the `main` branch triggers the workflow
2. **Build Process**: The workflow runs `npm ci` and `npm run build`
3. **Artifact Upload**: The `dist` folder is uploaded as a Pages artifact
4. **Deployment**: GitHub deploys the artifact to Pages

## Verifying Deployment

After enabling GitHub Pages and pushing to `main`:

1. **Check Workflow Status**
   - Go to: https://github.com/hyukiody/frontproject-development-serviceApi/actions
   - Look for "Deploy to GitHub Pages" workflow
   - Ensure it completes successfully (green checkmark)

2. **Access Your Site**
   - URL: https://hyukiody.github.io/frontproject-development-serviceApi/
   - It may take a few minutes for the first deployment

## Manual Deployment

You can also trigger deployment manually:

1. Go to: https://github.com/hyukiody/frontproject-development-serviceApi/actions/workflows/deploy.yml
2. Click "Run workflow"
3. Select the `main` branch
4. Click "Run workflow"

## Troubleshooting

### Deployment Fails with "Error: No url could be determined from the deployment"

**Solution:** Ensure GitHub Pages is enabled in repository settings (see steps above)

### 404 Error on Deployed Site

**Solution:** Verify the `base` configuration in `vite.config.ts` matches your repository name

### Assets Not Loading

**Solution:** The `.nojekyll` file prevents Jekyll from ignoring files starting with `_`. This is already included.

### Workflow Permissions Error

**Solution:** The workflow already has correct permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## Current Configuration

### Vite Base Path
```typescript
base: '/frontproject-development-serviceApi/'
```

### Workflow Triggers
- Push to `main` branch
- Manual workflow dispatch

### Node Version
- Node.js 20 (LTS)

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
