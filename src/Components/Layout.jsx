import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import ToastContainer from './Notification/ToastContainer.jsx';
import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const CartDrawer = lazy(() => import('./CartDrawer/CartDrawer.jsx'));
const WishlistDrawer = lazy(() => import('./WishlistDrawer/WishlistDrawer.jsx'));

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<h2 className="pageLoader">Loading...</h2>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <CartDrawer />
        <WishlistDrawer />
      </Suspense>
      <ToastContainer />
    </>
  );
}
