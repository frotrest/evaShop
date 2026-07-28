import styles from './footer.module.css';
import featuresData from '../../data/featuresData.json';
import Icon from './Icon';
import { IoMdCheckmark } from 'react-icons/io';
import clsx from 'clsx';
import Container from '../Container';

const itemsArr = [
  'Duties and Taxes Guaranteed',
  'Free Express Shipping',
  'Customer Love',
  'Easy Returns',
  'Secure Payment',
];

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
            <Icon name="logo-footer" width="102px" height="44px" />
          </a>
          <div className={clsx(styles.footer__list)}>
            <h3 className={clsx(styles['footer__list-title'])}>features</h3>
            <div className={clsx(styles['footer__list-items'])}>
              {featuresData.map((item) => {
                return (
                  <a key={item.name} href="#" className={clsx(styles['footer__list-item'])}>
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>

          <div className={clsx(styles.footer__list)}>
            <h3 className={clsx(styles['footer__list-title'])}>menu</h3>
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
          </div>

          <div className={clsx(styles.footer__list)}>
            <h3 className={clsx(styles['footer__list-title'])}>contact us</h3>
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
                <h4 className={clsx(styles['footer__list-address-title'])}>working days/hours</h4>
                <p className={clsx(styles['footer__list-address'])}>MON - SUN / 9:00AM - 8:00PM</p>
              </div>
            </div>
          </div>

          <div className={clsx(styles.footer__list)}>
            <h3 className={clsx(styles['footer__list-title'])}>follow us</h3>
            <div className={clsx(styles['footer__list-items'], styles['footer__list-items-soc'])}>
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
          </div>

          <div className={clsx(styles.footer__list)}>
            <h3 className={clsx(styles['footer__list-title'])}>join us</h3>
            <div className={clsx(styles['footer__list-items'])}>
              <form action="" className={clsx(styles.footer__form)}>
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
