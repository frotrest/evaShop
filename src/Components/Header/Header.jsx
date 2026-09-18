import header from './Header.module.css';
import { memo, useRef, useState, useMemo, useEffect } from 'react';
import { PiHandbagBold } from 'react-icons/pi';
import modalPreview from '@assets/Header/women-modal.webp';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Container from '../Container';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/loginSlice';
import { openCart } from '../../store/slices/cartSlice';
import { openWishlist } from '../../store/slices/wishlistSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import {
  selectBaseProducts,
  selectCartItems,
  selectLogin,
  selectWishlistItems,
} from '../../store/selectors';
import {
  IoMenu,
  IoClose,
  IoChevronForward,
  IoHeartOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoCopyOutline,
} from 'react-icons/io5';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Collections' },
  { to: '/shop', label: 'Electronics' },
  { to: '/blog', label: 'Editorial' },
  { to: '#footer', label: 'Concierge' },
];

const CLOSE_DELAY = 220;

const navLinkClassName = ({ isActive }) =>
  clsx(header.headerLink, isActive && header.headerLinkActive);

const ModalCategory = memo(function ModalCategory({ title, links, onLinkClick }) {
  return (
    <div className={clsx(header.modalBlockText)}>
      <h5>{title}</h5>
      <div className={clsx(header.modalLinkBox)}>
        {links.map(({ to, label }) => (
          <NavLink
            key={`${to}-${label}`}
            to={to}
            className={navLinkClassName}
            onClick={onLinkClick}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
});

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const closeTimerRef = useRef(null);

  const { login, user } = useSelector(selectLogin);
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);
  const products = useSelector(selectBaseProducts);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [searchQuery, products]);

  const modalCategories = useMemo(() => {
    return [
      {
        title: 'Curated Edits',
        links: [
          { to: '/catalog', label: 'Spring / Summer 2026' },
          { to: '/catalog', label: 'Minimalist Essentials' },
          { to: '/catalog', label: 'Evening & Tailoring' },
          { to: '/catalog', label: 'New Arrivals' },
        ],
      },
      {
        title: 'Departments',
        links: [
          { to: '/catalog', label: 'Clothing & Apparel' },
          { to: '/catalog', label: 'Shoes & Leather' },
          { to: '/shop', label: 'Audio & Electronics' },
          { to: '/catalog', label: 'Archive Sale (-40%)' },
        ],
      },
      {
        title: 'Client Services',
        links: login
          ? [{ to: '/dashboard', label: 'My Account' }]
          : [
              { to: '/login', label: 'Sign In' },
              { to: '/register', label: 'Create Account' },
            ],
      },
    ];
  }, [login]);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openModal = () => {
    cancelClose();
    setIsModalOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setIsModalOpen(false);
    }, CLOSE_DELAY);
  };

  const closeModalNow = () => {
    cancelClose();
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setIsBurgerOpen(false);
    dispatch(logoutUser());
    dispatch(
      showNotification({
        severity: 'info',
        message: 'Signed out successfully',
      }),
    );
    navigate('/', { replace: true });
  };

  const closeBurger = () => setIsBurgerOpen(false);

  const copyPromo = () => {
    navigator.clipboard.writeText('EVA');
    dispatch(
      showNotification({
        severity: 'success',
        message: 'Promo code EVA copied (-10%)!',
      }),
    );
  };

  useEffect(() => {
    if (isBurgerOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBurgerOpen, isSearchOpen]);

  return (
    <>
      <div className={clsx(header.announcementBar)}>
        <div className={clsx(header.announcementContainer)}>
          <div className={clsx(header.announcementText)}>
            <span>COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $100</span>
            <span className={clsx(header.dividerDot)}>•</span>
            <button onClick={copyPromo} className={clsx(header.promoPill)}>
              USE CODE <strong>EVA AND KATYA</strong> FOR 10% OFF <IoCopyOutline size={12} />
            </button>
          </div>
          <div className={clsx(header.announcementRight)}>
            <span className={clsx(header.conciergeText)}>VIP CONCIERGE: 24/7 SUPPORT</span>
          </div>
        </div>
      </div>
      <header className={clsx(header.header)}>
        <Container className={clsx(header.headerContainer)}>
          <button className={clsx(header.burgerBtn)} onClick={() => setIsBurgerOpen(true)}>
            <IoMenu size={24} />
          </button>

          <NavLink to="/" className={clsx(header.logoLink)}>
            <div className={clsx(header.logoWrap)}>
              <span className={clsx(header.logoTitle)}>EVA</span>
              <span className={clsx(header.logoStudio)}>STUDIO</span>
            </div>
          </NavLink>
          <nav className={clsx(header.headerNav)} onMouseLeave={scheduleClose}>
            {NAV_LINKS.map(({ to, label }) => {
              if (to === '#footer') {
                return (
                  <a
                    key={label}
                    href="#footer"
                    onClick={(e) => {
                      e.preventDefault();
                      closeModalNow();
                      document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onMouseEnter={closeModalNow}
                    className={clsx(header.headerLink)}
                  >
                    {label}
                  </a>
                );
              }
              const isCollection = label === 'Collections';
              return (
                <NavLink
                  key={to}
                  to={to}
                  onClick={closeModalNow}
                  onMouseEnter={isCollection ? openModal : closeModalNow}
                  className={navLinkClassName}
                >
                  {label}
                  {isCollection && <span className={clsx(header.navBadge)}>NEW</span>}
                </NavLink>
              );
            })}
          </nav>

          <div className={clsx(header.headerAccountBox)}>
            <button className={clsx(header.actionBtn)} onClick={() => setIsSearchOpen(true)}>
              <IoSearchOutline size={20} />
            </button>
            {login ? (
              <div className={clsx(header.userDropdown)}>
                <Link to="/dashboard" className={clsx(header.actionBtn)} title="Dashboard">
                  <IoPersonOutline size={20} />
                </Link>
                <button onClick={handleLogout} className={clsx(header.logoutQuickBtn)}>
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/login" className={clsx(header.actionBtn)}>
                <IoPersonOutline size={20} />
              </Link>
            )}

            <button className={clsx(header.actionBtn)} onClick={() => dispatch(openWishlist())}>
              <IoHeartOutline size={21} />
              <AnimatePresence>
                {wishlistItems.length > 0 && (
                  <motion.span
                    key="wishlist-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={clsx(header.iconBadge)}
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              className={clsx(header.actionBtn, header.bagBtn)}
              onClick={() => dispatch(openCart())}
            >
              <PiHandbagBold size={21} />
              <AnimatePresence>
                {totalCartCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={clsx(header.iconBadge)}
                  >
                    {totalCartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className={clsx(header.modalWindow)}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className={clsx(header.modalInner)}>
                  <div className={clsx(header.modalCols)}>
                    {modalCategories.map((category) => (
                      <ModalCategory
                        key={category.title}
                        title={category.title}
                        links={category.links}
                        onLinkClick={closeModalNow}
                      />
                    ))}
                  </div>
                  <div className={clsx(header.modalFeatured)}>
                    <div className={clsx(header.modalCard)}>
                      <img src={modalPreview} alt="Spring Runway Editorial" />
                      <div className={clsx(header.modalCardOverlay)}>
                        <span className={clsx(header.modalCardTag)}>EDITORIAL</span>
                        <h4>The Runway Edit</h4>
                        <p>Explore sculpted outerwear & seasonal accessories</p>
                        <Link
                          to="/catalog"
                          onClick={closeModalNow}
                          className={clsx(header.modalCardLink)}
                        >
                          Discover Lookbook →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </header>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className={clsx(header.searchOverlay)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              className={clsx(header.searchModal)}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={clsx(header.searchHeader)}>
                <div className={clsx(header.searchInputWrap)}>
                  <IoSearchOutline size={22} className={clsx(header.searchIcon)} />
                  <input
                    type="text"
                    placeholder="Search collections, coats, hoodies, brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className={clsx(header.searchInput)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className={clsx(header.searchClearBtn)}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className={clsx(header.searchCloseBtn)}
                >
                  <IoClose size={24} />
                </button>
              </div>

              <div className={clsx(header.searchQuickTags)}>
                <span className={clsx(header.searchTagsTitle)}>Popular:</span>
                {['Hoodie', 'Dress', 'Leather', 'Shoes', 'Minimalist', 'Discount'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className={clsx(header.quickTagBtn)}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className={clsx(header.searchResults)}>
                {searchQuery.trim() && searchResults.length === 0 && (
                  <div className={clsx(header.noResults)}>
                    <p>No matches found for "{searchQuery}"</p>
                    <span>Try searching for "Hoodie", "Dress", or "Jacket"</span>
                  </div>
                )}

                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className={clsx(header.searchItem)}
                  >
                    <img
                      src={item.images?.[0] || 'https://picsum.photos/100/100'}
                      alt={item.title}
                      className={clsx(header.searchItemImg)}
                    />
                    <div className={clsx(header.searchItemInfo)}>
                      <span className={clsx(header.searchItemCategory)}>
                        {item.category?.name || 'Fashion'}
                      </span>
                      <h4 className={clsx(header.searchItemTitle)}>{item.title}</h4>
                      <div className={clsx(header.searchItemPrice)}>
                        ${item.discountedPrice || item.price}.00
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {searchResults.length > 0 && (
                <div className={clsx(header.searchFooter)}>
                  <Link
                    to="/catalog"
                    onClick={() => setIsSearchOpen(false)}
                    className={clsx(header.viewAllSearchBtn)}
                  >
                    View all in Catalog →
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBurgerOpen && (
          <motion.div
            className={clsx(header.burgerOverlay)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeBurger}
          >
            <motion.div
              className={clsx(header.burgerPanel)}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={clsx(header.burgerHeader)}>
                <div className={clsx(header.logoWrap)}>
                  <span className={clsx(header.logoTitle)}>EVA</span>
                  <span className={clsx(header.logoStudio)}>STUDIO</span>
                </div>
                <button className={clsx(header.burgerClose)} onClick={closeBurger}>
                  <IoClose size={24} />
                </button>
              </div>

              <nav className={clsx(header.burgerNavList)}>
                {NAV_LINKS.map(({ to, label }) => {
                  if (to === '#footer') {
                    return (
                      <a
                        key={label}
                        href="#footer"
                        className={clsx(header.burgerNavItem)}
                        onClick={(e) => {
                          e.preventDefault();
                          closeBurger();
                          document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <span>{label}</span>
                        <IoChevronForward size={18} />
                      </a>
                    );
                  }
                  return (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={closeBurger}
                      className={clsx(header.burgerNavItem)}
                    >
                      <span>{label}</span>
                      <IoChevronForward size={18} />
                    </NavLink>
                  );
                })}

                <button
                  onClick={() => {
                    closeBurger();
                    dispatch(openWishlist());
                  }}
                  className={clsx(header.burgerNavItem)}
                >
                  <span>Wishlist ({wishlistItems.length})</span>
                  <IoChevronForward size={18} />
                </button>

                <button
                  onClick={() => {
                    closeBurger();
                    dispatch(openCart());
                  }}
                  className={clsx(header.burgerNavItem)}
                >
                  <span>Shopping Bag ({totalCartCount})</span>
                  <IoChevronForward size={18} />
                </button>
              </nav>

              <div className={clsx(header.burgerAccountBox)}>
                {login ? (
                  <>
                    <NavLink
                      to="/dashboard"
                      onClick={closeBurger}
                      className={clsx(header.burgerAccountLink)}
                    >
                      Dashboard ({user[0]?.firstName || user[0]?.name || 'Account'})
                    </NavLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeBurger();
                      }}
                      className={clsx(header.burgerLogoutBtn)}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={closeBurger}
                      className={clsx(header.burgerAccountLink)}
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={closeBurger}
                      className={clsx(header.burgerAccountLinkSecondary)}
                    >
                      Create An Account
                    </NavLink>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
