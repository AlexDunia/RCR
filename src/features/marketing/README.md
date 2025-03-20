# Marketing Components

## MarketingContentLoader

The `MarketingContentLoader` component provides a consistent loading experience for all marketing pages. It should be used to wrap the main content of each marketing page, but should be placed below the `MarketingNavigation` component.

### Usage

```vue
<template>
  <div class="your-marketing-page">
    <!-- MarketingNavigation should be outside the loader -->
    <MarketingNavigation />
    
    <!-- Wrap your main content with MarketingContentLoader -->
    <MarketingContentLoader>
      <div class="your-content">
        <!-- Your page content here -->
      </div>
    </MarketingContentLoader>
  </div>
</template>

<script setup>
import MarketingNavigation from '@/components/marketing/MarketingNavigation.vue';
import MarketingContentLoader from '@/components/marketing/MarketingContentLoader.vue';

// Your component logic here
</script>
```

### Props

- `loaderCount` (Number, default: 3): Number of loader placeholders to show
- `loadingDelay` (Number, default: 1000): Time in milliseconds before content is shown

### Guidelines

1. Always place the `MarketingContentLoader` below the `MarketingNavigation` component
2. Remove all animations and transitions from marketing components
3. Use the loader for all content that needs to be loaded asynchronously
4. Keep the navigation component visible at all times (no loader for navigation)

### Example Implementation

See the following files for examples:
- `src/views/marketing/MarketingTools.vue`
- `src/views/marketing/SuccessPlan.vue`
- `src/views/marketing/SocialPlatforms.vue` 