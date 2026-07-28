import header from './Header.module.css';
import logo from '@assets/Header/logo.webp';
import { memo, useRef, useState, useMemo } from 'react';
import { PiHandbagBold } from 'react-icons/pi';
import modalPreview from '@assets/Header/women-modal.webp';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import Container from '../Container';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/loginSlice';
import { selectLogin } from '../../store/selectors';

const NAV_LINKS = [
  { to: '/', label: 'home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/shop', label: 'Electronic shop' },
  { to: '/blog', label: 'blog' },
  { to: '#footer', label: 'Contact us' },
];

const CLOSE_DELAY = 200;

const navLinkClassName = ({ isActive }) =>
  clsx(header.headerLink, isActive && header.headerLinkActive);

const ModalCategory = memo(function ModalCategory({ title, links, onLinkClick }) {
  return (
    <div className={clsx(header.modalBlockText)}>
      <h5>{title}</h5>
      <div className={clsx(header.modalLinkBox)}>
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} className={navLinkClassName} onClick={onLinkClick}>
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
});

export default function Header() {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeTimerRef = useRef(null);

  const { login, user } = useSelector(selectLogin);
  const dispatch = useDispatch();
  const modalCategories = useMemo(() => {
    return [
      {
        title: 'Account',
        links: login
          ? [{ to: '/dashboard', label: 'Dashboard' }]
          : [
              { to: '/register', label: 'Register' },
              { to: '/login', label: 'Login' },
              { to: '/dashboard', label: 'Dashboard' },
            ],
      },
      {
        title: 'Shopping',
        links: [
          { to: '/catalog', label: 'Catalog' },
          { to: '/shop', label: 'Electronics' },
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
    dispatch(logoutUser());
  };

  return (
    <header className={clsx(header.header)}>
      <Container className={clsx(header.headerContainer)}>
        <NavLink to="/dashboard">
          <img src={logo} alt="Logo" className={clsx(header.logo)} fetchPriority="high" />
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
                    document.querySelector('#footer').scrollIntoView({ behavior: 'smooth' });
                  }}
                  onMouseEnter={openModal}
                  className={clsx(header.headerLink)}
                >
                  {label}
                </a>
              );
            }
            return (
              <NavLink
                key={to}
                to={to}
                onClick={closeModalNow}
                onMouseEnter={openModal}
                className={navLinkClassName}
              >
                {label}
              </NavLink>
            );
          })}
        </nav>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className={clsx(header.modalWindow)}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {modalCategories.map((category) => (
                <ModalCategory
                  key={category.title}
                  title={category.title}
                  links={category.links}
                  onLinkClick={closeModalNow}
                />
              ))}
              <img src={modalPreview} alt="modal-preview" fetchPriority="high" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={clsx(header.headerAccountBox)}>
          <div className={clsx(header.headerAccountBoxLink)}>
            {login ? (
              <button
                onClick={handleLogout}
                className={clsx(header.headerLink, header.logoutBtn)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                LOG OUT ({user[0]?.firstName || user[0]?.name || ''})
              </button>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClassName}>
                  SIGN IN
                </NavLink>
                <NavLink to="/register" className={navLinkClassName}>
                  CREATE AN ACCOUNT
                </NavLink>
              </>
            )}
          </div>

          <svg
            className={clsx(header.like, isLiked && header.likeActive)}
            onClick={() => setIsLiked((prev) => !prev)}
            viewBox="0 0 22 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.7252 1.19971C17.9598 1.19981 20.6002 3.66229 20.6002 6.896C20.6002 8.84688 19.6741 10.5189 18.3219 12.1099C16.9813 13.6871 15.0857 15.3378 12.9215 17.2251L11.6901 18.3032L10.9 18.9946L10.11 18.3032L8.87854 17.2251C6.71434 15.3378 4.81878 13.6871 3.47815 12.1099C2.12597 10.5189 1.19989 8.84688 1.19983 6.896C1.19983 3.66229 3.84024 1.19981 7.07483 1.19971C8.47459 1.19971 9.82622 1.67813 10.9 2.48291C11.9738 1.67813 13.3255 1.19971 14.7252 1.19971Z"
              stroke="white"
              strokeWidth="2.4"
            />
          </svg>
        </div>
      </Container>
    </header>
  );
}
