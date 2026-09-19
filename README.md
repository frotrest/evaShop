# EvaShop — Spectacular Shop

**EvaShop** is a high-quality, interactive eCommerce shop built with a focus on a clear user interface, strong performance, and a smooth shopping experience.

🔗 **Live site:** [frotrest.github.io/evaShop](https://frotrest.github.io/evaShop/)

---

## Key Features

- **Intuitive product catalog:** browsing and filtering (checkboxes) synced instantly across all views.
- **URL-synchronized search & filtering:** search queries and category filters are synchronized with the URL via custom router hooks (`useSearchParams`), so users can share exact search results or filtered states directly via a link.
- **Smart UI architecture:** responsive grid layouts, image fallback handling for missing media, and consistent interactive feedback states across components.
- **Performance-optimized:** code-splitting for rarely-used UI (drawers, modals), local image assets instead of external hotlinking, and priority hints on above-the-fold images. See [Performance](#performance) below for details and results.
- **Customizable dashboard:** users can fully manage their personal profile data — add, edit, or remove information — implemented via `POST`/`PATCH` requests to the backend.

> **Note:** the cart and wishlist UI is fully functional, but persisting cart/wishlist state to the backend is currently limited by the mock JSON Server API. This is a known limitation of the demo backend, not the frontend logic.

---

## Tech Stack & Architecture Highlights

### React & React Router

- Route-based code-splitting via `React.lazy()` for every non-critical page (dashboard, product page, catalog, blog, auth), keeping the initial bundle lean.
- Global `basename` configuration for clean production builds under a GitHub Pages subdirectory.

### Redux Toolkit (State Management)

- **Modular slices:** clear separation of concerns between global user data (`loginSlice`) and product data (`productsSlice`, `otherProductsSlice`).
- **Custom selectors & cache logic:** `selectors.js` resets specific cache levels and guards against infinite re-fetch loops.

### Backend

- Custom backend powered by JSON Server, serving products, other-products, categories, users, and blog data.
- Hosted on Render: [`crisp-project-server.onrender.com`](https://crisp-project-server.onrender.com/) — note that free-tier Render instances spin down when idle, so the first request after inactivity may be noticeably slower (cold start).

### Style Encapsulation

- **CSS Modules & `clsx`:** strict layout modularity with scoped component styles, avoiding global scope pollution and keeping component rendering predictable.
- **Framer Motion:** micro-interactions and page/element transitions across the UI.

---

## Performance

Performance was treated as an explicit goal, not an afterthought. Key optimizations applied:

- **Code-splitting rarely-used UI.** `CartDrawer`, `WishlistDrawer`, and `QuickViewModal` are loaded via `React.lazy()` + `Suspense` instead of being bundled into the main chunk, since they aren't needed on first paint.
- **Local, optimized images instead of hotlinked external ones.** Hero slider images were previously fetched from an external domain (Pexels) at runtime, which delayed the Largest Contentful Paint. They're now bundled locally as compressed `.webp` assets, known to the browser at build time.
- **Priority hints on the LCP image.** The above-the-fold hero image uses `fetchpriority="high"` and eager loading; all other slides are deferred with `loading="lazy"`.

**Lighthouse results** (after optimization, median of several runs):

| Profile | Performance | LCP | TBT | CLS |
|---|---|---|---|---|
| Mobile | ~88 | ~3.3s | ~90ms | 0 |
| Desktop | ~100 | — | — | 0 |

The mobile score is capped mainly by the inherent limits of a client-side-rendered (CSR) React SPA — the browser can't discover the LCP image until the JS bundle has been downloaded and executed, since there's no server-side rendering. Getting meaningfully closer to 100 on mobile would require a framework with SSR/SSG (e.g. Next.js, Astro), which was out of scope for this project.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Production build
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```
