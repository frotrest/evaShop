import { lazy } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
const DashboardPage = lazy(() => import('./pages/DashbordPage/DashboardPage.jsx'));
const Register = lazy(() => import('./Components/Register/Register.jsx'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage.jsx'));
const LoginMain = lazy(() => import('./Components/LoginPage/LoginPageContent.jsx'));
const ProductCatalog = lazy(() => import('./pages/ProductCatalog/ProductCatalog.jsx'));
import Layout from './Components/Layout.jsx';
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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/dashboard" element={<DashboardPage />}>
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
