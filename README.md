# EvaShop — spectacular shop 
**EvaShop** is a qualitative, interactive eCommerce shop, designed with an accent on the clear user's interface, high-performance and smooth customer's experience.

---

## Key Features

* **Intuitive catalog of goods:** browsing and filtering (`Checkboxes`) synced instantly across all views.
* **URL-Synchronized Search & Filtering:** Dynamic search queries and categories are synchronized using custom router hooks (`useSearchParams`). Users can share exact search results or filtered states directly via links.
* **Smart UI Architecture:** Responsive grid structures, image fallback handlers for missing media, and responsive interactive feedback states.
* **High-performance optimization:** Optimized image loading and the other things which help with general optimization (PageSpeed showcases average 95 percent of application's quality)
* **Customizable dashboard:** your personal profile's data is completely customizable under the needs of yours you're able to add, change, remove data about yourself (`It was implemented by POST, PATCH queries`).

---

## Tech Stack & Architecture Highlights

### React & React Router
* Implemented dynamic route states, and global `basename` configuration for clean subdirectory production builds.

### Redux Toolkit (State Management)
* **Modular Slices:** Clean separation of concerns between global user data (`loginSlice`) and the crucial products (`ProductsSlice and yet otherProductsSlice`).
* **Advanced Data Invalidation:** Custom action logic (like `selectors.js`) designed to reset specific cache levels and intercept infinite re-fetching loops.

### Personal data server

* We created a custom backend using JSON Server, furthermore that server has products, other-products, categories, users, blog data.

* You can check it out by yourself (`https://crisp-project-server.onrender.com/`).

#### The wishlist and cart features are currently unavailable due to backend limitations.

### Style Encapsulation
* **CSS Modules & clsx:** Strict layout modularity with scoped component styles, preventing global scope pollution and achieving predictable component rendering.

* **Framer-motion Animations:** Optimized micro-interactions via the Framer motion library.
