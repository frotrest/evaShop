import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './footer.module.css';
import clsx from 'clsx';
import Container from '../Container';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/slices/notificationSlice';
import {
  IoShieldCheckmarkOutline,
  IoCubeOutline,
  IoRefreshOutline,
  IoRibbonOutline,
  IoArrowForward,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTiktok,
  IoChevronDown,
} from 'react-icons/io5';
import { SiVisa, SiMastercard, SiApplepay, SiPaypal, SiAmericanexpress } from 'react-icons/si';

const TRUST_BENEFITS = [
  {
    Icon: IoCubeOutline,
    title: 'COMPLIMENTARY SHIPPING',
    description: 'On all orders above $100 with tracked courier',
  },
  {
    Icon: IoRefreshOutline,
    title: '30-DAY EASY RETURNS',
    description: 'Hassle-free worldwide returns & exchanges',
  },
  {
    Icon: IoShieldCheckmarkOutline,
    title: '100% ATELIER AUTHENTICITY',
    description: 'Guaranteed genuine verified designer items',
  },
  {
    Icon: IoRibbonOutline,
    title: 'PRIVATE CONCIERGE',
    description: 'Dedicated personal styling & sizing advisors',
  },
];

const FOOTER_SECTIONS = [
  {
    id: 'collections',
    title: 'COLLECTIONS',
    links: [
      { label: 'Spring / Summer 2026', to: '/catalog' },
      { label: 'Minimalist Tailoring', to: '/catalog' },
      { label: 'Coats & Trench', to: '/catalog' },
      { label: 'Electronics & Audio', to: '/shop' },
      { label: 'Archive Sale (-40%)', to: '/catalog' },
    ],
  },
  {
    id: 'clientCare',
    title: 'CLIENT CONCIERGE',
    links: [
      { label: 'Account Management', to: '/dashboard' },
      { label: 'Returns & Exchanges', to: '#footer' },
      { label: 'Size & Fit Consultation', to: '#footer' },
      { label: 'VIP Private Appointments', to: '#footer' },
    ],
  },
  {
    id: 'atelier',
    title: 'THE ATELIER',
    links: [
      { label: 'Editorial & Journal', to: '/blog' },
      { label: 'Sustainability Pledge', to: '#footer' },
      { label: 'Craftsmanship & Mills', to: '#footer' },
      { label: 'Careers at EvaShop', to: '#footer' },
      { label: 'Store Locator', to: '#footer' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [openSections, setOpenSections] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      return ['collections', 'clientCare', 'atelier'];
    }
    return [];
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpenSections((prev) =>
          prev.length === 0 ? ['collections', 'clientCare', 'atelier'] : prev,
        );
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      dispatch(
        showNotification({
          severity: 'error',
          message: 'Please enter a valid email address',
        }),
      );
      return;
    }
    dispatch(
      showNotification({
        severity: 'success',
        message: 'Welcome to the EVA Atelier circle! Your 10% code is EVA10',
      }),
    );
    setEmail('');
  };

  const toggleSection = (key) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  return (
    <>
      <section className={clsx(styles.trustSection)}>
        <Container className={clsx(styles.trustGrid)}>
          {TRUST_BENEFITS.map((item, idx) => (
            <div key={idx} className={clsx(styles.trustCard)}>
              <div className={clsx(styles.trustIconWrap)}>
                <item.Icon size={24} />
              </div>
              <div className={clsx(styles.trustContent)}>
                <h4 className={clsx(styles.trustTitle)}>{item.title}</h4>
                <p className={clsx(styles.trustDesc)}>{item.description}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <footer className={clsx(styles.footer)} id="footer">
        <Container className={clsx(styles.footerInner)}>
          <div className={clsx(styles.brandCol)}>
            <Link to="/" className={clsx(styles.footerLogo)}>
              <span className={clsx(styles.logoTitle)}>EVA</span>
              <span className={clsx(styles.logoStudio)}>SHOP</span>
            </Link>
            <p className={clsx(styles.brandBio)}>
              Curating elevated wardrobes, architectural cuts, and timeless craftsmanship for the
              modern individual.
            </p>

            <form onSubmit={handleSubscribe} className={clsx(styles.newsletterForm)}>
              <span className={clsx(styles.newsletterTitle)}>JOIN THE PRIVATE ATELIER CIRCLE</span>
              <p className={clsx(styles.newsletterSubtitle)}>
                Receive early access to seasonal drops, secret sales, and 10% off your first
                purchase.
              </p>
              <div className={clsx(styles.newsletterInputWrap)}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={clsx(styles.newsletterInput)}
                />
                <button type="submit" className={clsx(styles.newsletterBtn)}>
                  <IoArrowForward size={18} />
                </button>
              </div>
            </form>
          </div>

          <div className={clsx(styles.navColsGrid)}>
            {FOOTER_SECTIONS.map((section) => {
              const isOpen = openSections.includes(section.id);
              return (
                <div key={section.id} className={clsx(styles.navCol)}>
                  <button
                    className={clsx(styles.colTitle)}
                    onClick={() => toggleSection(section.id)}
                  >
                    <span>{section.title}</span>
                    <motion.span
                      className={clsx(styles.arrowWrap)}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <IoChevronDown size={16} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`content-${section.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className={clsx(styles.accordionContent)}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className={clsx(styles.linksList)}>
                          {section.links.map((link, lIdx) =>
                            link.to.startsWith('#') ? (
                              <a key={lIdx} href={link.to}>
                                {link.label}
                              </a>
                            ) : (
                              <Link key={lIdx} to={link.to}>
                                {link.label}
                              </Link>
                            ),
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>

        <div className={clsx(styles.bottomBar)}>
          <Container className={clsx(styles.bottomInner)}>
            <div className={clsx(styles.socialsGroup)}>
              <a href="https://instagram.com" target="_blank">
                <IoLogoInstagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank">
                <IoLogoFacebook size={18} />
              </a>
              <a href="https://tiktok.com" target="_blank">
                <IoLogoTiktok size={18} />
              </a>
            </div>

            <div className={clsx(styles.copyright)}>
              © {new Date().getFullYear()} EVA SHOP INC. ALL RIGHTS RESERVED.
            </div>

            <div className={clsx(styles.paymentMethods)}>
              <SiVisa size={26} title="Visa" />
              <SiMastercard size={26} title="Mastercard" />
              <SiAmericanexpress size={26} title="American Express" />
              <SiApplepay size={28} title="Apple Pay" />
              <SiPaypal size={22} title="PayPal" />
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
}
