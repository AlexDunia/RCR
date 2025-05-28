# realcity

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## SPA Routing and Static File Serving

If you deploy this app to a static server (e.g., Netlify, Vercel, GitHub Pages, or your own server), you must ensure that all routes under `/RCR/*` serve `index.html` (the main app entry point). This is required for client-side navigation to work correctly in a Single Page Application (SPA).

For example, in Nginx:
```
location /RCR/ {
  try_files $uri $uri/ /RCR/index.html;
}
```

If you use another server, consult its documentation for SPA fallback configuration.
