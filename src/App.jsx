import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
const DashboardPage = lazy(() => import('./pages/DashbordPage/DashboardPage.jsx'));
const Register = lazy(() => import('./Components/Register/Register.jsx'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage.jsx'));
const LoginMain = lazy(() => import('./Components/LoginPage/LoginPageContent.jsx'));
const ProductCatalog = lazy(() => import('./pages/ProductCatalog/ProductCatalog.jsx'));
import Layout from './Components/Layout.jsx';
import { PrivateRoute, RestrictedRoute } from './routes/Routers.jsx';
const DashboardOverview = lazy(() => import('./pages/DashbordPage/DashboardOverview.jsx'));
const DashboardTab = lazy(() => import('./pages/DashbordPage/DashboardTab.jsx'));
const ShopPage = lazy(() => import('./pages/ShopPage/ShopPage.jsx'));
const BlogPages = lazy(() => import('./pages/BlogPages/BlogPage.jsx'));
const AllBlogPages = lazy(() => import('./pages/AllBlogPages/AllBlogPages.jsx'));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/register"
            element={<RestrictedRoute component={Register} redirectTo="/dashboard" />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute component={LoginMain} redirectTo="/dashboard" />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={DashboardPage} redirectTo="/login" />}
          >
            <Route index element={<DashboardOverview />} />
            <Route path="account" element={<DashboardTab />} />
            <Route path="address" element={<DashboardTab />} />
            <Route path="password" element={<DashboardTab />} />
          </Route>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/blog" element={<AllBlogPages />} />
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/blogPage" element={<BlogPages />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
