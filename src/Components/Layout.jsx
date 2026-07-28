import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

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
    </>
  );
}
