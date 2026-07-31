# EvaShop — spectacular shop 
**EvaShop** is a qualitative, interactive website of the eCommerce shop, designed with an accent on the clear user's inferface, high-perfomance and smooth customer's experience.

---

## Key Features

* **Intuitive catalog of goods:** convenient watching and assortment's filtration (`Checkboxes`) synced instantly across all views.
* **URL-Synchronized Search & Filtering:** Dynamic search queries and categories completely related to the browser's URL using custom router hooks (`useSearchParams`). Users can share exact search results or filtered states directly via links.
* **Smart UI Architecture:** Responsive grid structures, image fallback handlers for missing media, and responsive interactive feedback states.
* **High-performance optimization:** Optimized images loading and the other things which help with general optimization (PageSpeed showcases average 95 percent of application's quality)
* **Customable dashboard:** your personal profile's data is completely customable under the needs of yours you're able to add, change, remove data about yourself (`It was implemented by POST, PATCH queries`).

---

## Tech Stack & Architecture Highlights

### React & React Router
* Implemented dynamic route states, and global `basename` configuration for clean subdirectory production builds.

### Redux Toolkit (State Management)
* **Modular Slices:** Clean separation of concerns between global user data (`loginSlice`) and the crucial products (`ProductsSlice and yet otherProductsSlice`).
* **Advanced Data Invalidation:** Custom action logic (like `selectors.js`) designed to reset specific cache levels and intercept infinite re-fetching loops.

### Personal data server

* Was created our general data-server by JSON server, furthermore that server has products, other-products, categories, users, blog data.

* You can check it out by yourself (`https://crisp-project-server.onrender.com/`).

## There's no wishlist or cart because my mate's API is broken (it works throughout the entire application except these ones), and he didn’t manage to implement further wishlist and cart interactions.

### Style Encapsulation
* **CSS Modules & clsx:** Strict layout modularity with scoped component styles, preventing global scope pollution and achieving predictable component rendering.

* **Framer-motion Animations:** Optimized micro-interactions via the Framer motion library.
