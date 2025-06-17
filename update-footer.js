const fs = require('fs');
const path = require('path');

const publicPages = [
  'src/views/LandingPage.vue',
  'src/views/public/AboutView.vue',
  'src/views/public/CareersView.vue',
  'src/views/public/TermsView.vue',
  'src/views/public/PrivacyView.vue',
  'src/views/public/BlogView.vue',
  'src/views/public/AllProperties.vue',
  'src/views/public/BuyProperties.vue',
  'src/views/public/RentProperties.vue',
  'src/views/public/LifestyleView.vue',
  'src/views/public/LegalNoticeView.vue',
  'src/views/public/FindAgentsView.vue',
  'src/views/public/NewBuyProperties.vue',
  'src/views/public/AllPropertiesDetails.vue',
  'src/views/public/AgentProfileView.vue'
];

publicPages.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);

  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');

    // Add import if not exists
    if (!content.includes("import PublicFooter from '@/components/PublicFooter.vue'")) {
      const importStatement = "import PublicFooter from '@/components/PublicFooter.vue';\n";

      // Find the script setup section
      const scriptSetupMatch = content.match(/&lt;script setup&gt;[\s\S]*?import.*?;/);
      if (scriptSetupMatch) {
        content = content.replace(
          scriptSetupMatch[0],
          scriptSetupMatch[0] + '\n' + importStatement
        );
      }
    }

    // Add component if not exists
    if (!content.includes('&lt;PublicFooter /&gt;')) {
      // Replace existing footer or add before closing div
      content = content.replace(
        /&lt;footer[\s\S]*?&lt;\/footer&gt;/,
        '&lt;PublicFooter /&gt;'
      );

      if (!content.includes('&lt;PublicFooter /&gt;')) {
        content = content.replace(
          /&lt;\/div&gt;\s*&lt;\/template&gt;/,
          '  &lt;PublicFooter /&gt;\n  &lt;/div&gt;\n&lt;/template&gt;'
        );
      }
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});
