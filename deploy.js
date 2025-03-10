// deploy.js - Script to deploy to GitHub Pages
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.cyan}Starting deployment to GitHub Pages...${colors.reset}`);

try {
  // Step 1: Build the project
  console.log(`\n${colors.yellow}Step 1: Building the project...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Build completed successfully${colors.reset}`);

  // Step 2: Copy necessary files to dist
  console.log(`\n${colors.yellow}Step 2: Copying necessary files to dist...${colors.reset}`);

  // Ensure .nojekyll exists (to prevent GitHub Pages from using Jekyll)
  fs.writeFileSync(path.join('dist', '.nojekyll'), '');
  console.log(`${colors.green}✓ Created .nojekyll file${colors.reset}`);

  // Copy 404.html
  fs.copyFileSync(path.join('public', '404.html'), path.join('dist', '404.html'));
  console.log(`${colors.green}✓ Copied 404.html${colors.reset}`);

  // Copy CNAME if it exists
  if (fs.existsSync(path.join('public', 'CNAME'))) {
    fs.copyFileSync(path.join('public', 'CNAME'), path.join('dist', 'CNAME'));
    console.log(`${colors.green}✓ Copied CNAME file${colors.reset}`);
  }

  // Step 3: Deploy to GitHub Pages
  console.log(`\n${colors.yellow}Step 3: Deploying to GitHub Pages...${colors.reset}`);
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Deployment completed successfully${colors.reset}`);

  console.log(`\n${colors.bright}${colors.green}Deployment completed! Your site should be live shortly at:${colors.reset}`);

  // Try to get the repository URL to show the GitHub Pages URL
  try {
    const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
    const repoName = remoteUrl.split('/').pop().replace('.git', '');
    const username = remoteUrl.split('/').slice(-2, -1)[0].replace('git@github.com:', '');
    console.log(`${colors.cyan}https://${username}.github.io/${repoName}/${colors.reset}`);
  } catch (e) {
    console.log(`${colors.cyan}Check your GitHub Pages settings for the URL${colors.reset}`);
  }

} catch (error) {
  console.error(`${colors.red}Deployment failed:${colors.reset}`, error.message);
  process.exit(1);
}
