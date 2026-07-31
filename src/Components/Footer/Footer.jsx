import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import styles from './footer.module.css';
import featuresData from '../../data/featuresData.json';
import Icon from './Icon';
import { IoMdCheckmark } from 'react-icons/io';
import clsx from 'clsx';
import Container from '../Container';
import logo from '@assets/Header/logo.webp';

const itemsArr = [
  'Duties and Taxes Guaranteed',
  'Free Express Shipping',
  'Customer Love',
  'Easy Returns',
  'Secure Payment',
];

const accordionVariants = {
  open: { height: 'auto', opacity: 1 },
  collapsed: { height: 0, opacity: 0 },
};

function useIsMobile(breakpoint = 1280) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleChange = (e) => setIsMobile(e.matches);
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return isMobile;
}

const Item = ({ information }) => {
  return (
    <>
      <div className={clsx(styles['item-box'])}>
        <IoMdCheckmark className={clsx(styles['checkmark'])} />
        <p>{information}</p>
      </div>
    </>
  );
};

export default function Footer({
  address = '123 STREET NAME, CITY, ENGLAND',
  phone = '(123) 456-7890',
  email = 'MAIL@EXAMPLE.COM',
}) {
  const isMobile = useIsMobile(1280);
  const [openSections, setOpenSections] = useState([]);

  const toggleSection = (key) => {
    if (!isMobile) return;
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const isSectionOpen = (key) => !isMobile || openSections.includes(key);

  return (
    <>
      <section className={clsx(styles['items-box'])}>
        <Container className={clsx(styles['items-box--content'])}>
          {itemsArr.map((elem, index) => (
            <Item information={elem} key={index} />
          ))}
        </Container>
      </section>
      <footer className={clsx(styles.footer)} id="footer">
        <Container className={clsx(styles.footer__content)}>
          <a href="#" className={clsx(styles['footer__logo-link'])}>
            <img src={logo} alt="Logo" fetchPriority="high" />
          </a>
          <div className={clsx(styles.footer__list)}>
            <h3
              className={clsx(styles['footer__list-title'])}
              onClick={() => toggleSection('features')}
            >
              features
              <span
                className={clsx(
                  styles['footer__list-icon'],
                  isSectionOpen('features') && styles['footer__list-icon--open'],
                )}
              />
            </h3>
            <AnimatePresence initial={false}>
              {isSectionOpen('features') && (
                <motion.div
                  key="content"
                  className={clsx(styles['footer__list-content'])}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={accordionVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className={clsx(styles['footer__list-items'])}>
                    {featuresData.map((item) => (
                      <a key={item.name} href="#" className={clsx(styles['footer__list-item'])}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={clsx(styles.footer__list)}>
            <h3
              className={clsx(styles['footer__list-title'])}
              onClick={() => toggleSection('menu')}
            >
              menu
              <span
                className={clsx(
                  styles['footer__list-icon'],
                  isSectionOpen('menu') && styles['footer__list-icon--open'],
                )}
              />
            </h3>
            <AnimatePresence initial={false}>
              {isSectionOpen('menu') && (
                <motion.div
                  key="content"
                  className={clsx(styles['footer__list-content'])}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={accordionVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className={clsx(styles['footer__list-items'])}>
                    <a href="#" className={clsx(styles['footer__list-item'])}>
                      about us
                    </a>
                    <a href="#" className={clsx(styles['footer__list-item'])}>
                      contact us
                    </a>
                    <a href="#" className={clsx(styles['footer__list-item'])}>
                      my account
                    </a>
                    <a href="#" className={clsx(styles['footer__list-item'])}>
                      orders history
                    </a>
                    <a href="#" className={clsx(styles['footer__list-item'])}>
                      my wishlist
                    </a>
                    <a href="#" className={clsx(styles['footer__list-item'])}>
                      blog
                    </a>
                    <a href="#" className={clsx(styles['footer__list-item'])}>
                      login
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={clsx(styles.footer__list)}>
            <h3
              className={clsx(styles['footer__list-title'])}
              onClick={() => toggleSection('contactUs')}
            >
              contact us
              <span
                className={clsx(
                  styles['footer__list-icon'],
                  isSectionOpen('contactUs') && styles['footer__list-icon--open'],
                )}
              />
            </h3>
            <AnimatePresence initial={false}>
              {isSectionOpen('contactUs') && (
                <motion.div
                  key="content"
                  className={clsx(styles['footer__list-content'])}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={accordionVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className={clsx(styles['footer__list-items'])}>
                    <div className={clsx(styles['footer__list-item-container'])}>
                      <h4 className={clsx(styles['footer__list-address-title'])}>Address:</h4>
                      <p className={clsx(styles['footer__list-address'])}> {address} </p>
                    </div>
                    <div className={clsx(styles['footer__list-item-container'])}>
                      <h4 className={clsx(styles['footer__list-address-title'])}>Phone:</h4>
                      <p className={clsx(styles['footer__list-address'])}> {phone} </p>
                    </div>
                    <div className={clsx(styles['footer__list-item-container'])}>
                      <h4 className={clsx(styles['footer__list-address-title'])}>email:</h4>
                      <p className={clsx(styles['footer__list-address'])}> {email} </p>
                    </div>
                    <div className={clsx(styles['footer__list-item-container'])}>
                      <h4 className={clsx(styles['footer__list-address-title'])}>
                        working days/hours
                      </h4>
                      <p className={clsx(styles['footer__list-address'])}>
                        MON - SUN / 9:00AM - 8:00PM
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={clsx(styles.footer__list)}>
            <h3
              className={clsx(styles['footer__list-title'])}
              onClick={() => toggleSection('followUs')}
            >
              follow us
              <span
                className={clsx(
                  styles['footer__list-icon'],
                  isSectionOpen('followUs') && styles['footer__list-icon--open'],
                )}
              />
            </h3>
            <AnimatePresence initial={false}>
              {isSectionOpen('followUs') && (
                <motion.div
                  key="content"
                  className={clsx(styles['footer__list-content'])}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={accordionVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div
                    className={clsx(styles['footer__list-items'], styles['footer__list-items-soc'])}
                  >
                    <a href="#" className={clsx(styles['footer__list-soc'])}>
                      <Icon name="facebook-logo" width="21px" height="21px" />
                      <span className={clsx(styles['footer__list-soc-item'])}>FACEBOOK</span>
                    </a>
                    <a href="#" className={clsx(styles['footer__list-soc'])}>
                      <Icon name="twitter-logo" width="21px" height="21px" />
                      <span className={clsx(styles['footer__list-soc-item'])}>TWITTER</span>
                    </a>
                    <a href="#" className={clsx(styles['footer__list-soc'])}>
                      <Icon name="instagram-logo" width="21px" height="21px" />
                      <span className={clsx(styles['footer__list-soc-item'])}>INSTAGRAM</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={clsx(styles.footer__list)}>
            <h3 className={clsx(styles['footer__list-title'])}>join us</h3>
            <div className={clsx(styles['footer__list-items'])}>
              <form className={clsx(styles.footer__form)}>
                <p className={clsx(styles['footer__form-title'])}>Subscribe to our newsletters</p>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={clsx(styles['footer__form-input'])}
                />
                <button type="submit" className={clsx(styles['footer__form-btn'])}>
                  Subscribe!
                </button>
              </form>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
