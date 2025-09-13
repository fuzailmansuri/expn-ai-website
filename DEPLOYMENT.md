# Deployment Instructions

## Uploading to Git

1. Create a new repository on your preferred Git hosting service (GitHub, GitLab, etc.)

2. Add the remote origin (replace `<username>` and `<repository>` with your actual values):
   ```bash
   git remote add origin https://github.com/<username>/<repository>.git
   ```

3. Push the code to the remote repository:
   ```bash
   git push -u origin master
   ```

## Production Deployment

For production deployment, you can use services like:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

### Using Vite for Production Build

1. Build the project for production:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist/` folder, which can be deployed to any static hosting service.

### Automated Deployment with GitHub Actions

To automate deployment, you can create a `.github/workflows/deploy.yml` file with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```