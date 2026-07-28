import clsx from 'clsx';
import styles from './offerCards.module.css';
import { Link } from 'react-router-dom';

const OfferCard = () => {
  return (
    <section className={clsx(styles.offerSection)}>
      <div className={clsx(styles.offerCardFirstSecond)}>
        <div className={clsx(styles.offerCard, styles.offerCardFirst)}>
          <div className={clsx(styles.offerCardContent)}>
            <h1 className={clsx(styles.offerCardTitle)}>choose your look</h1>
            <p className={clsx(styles.offerCardText)}>See our clothing collections</p>
            <Link to="/shop" className={clsx(styles.offerCardButton)}>
              see offers
            </Link>
          </div>
        </div>
        <div className={clsx(styles.offerCard, styles.offerCardSecond)}>
          <div className={clsx(styles.offerCardContent)}>
            <h1 className={clsx(styles.offerCardTitle)}>brand new style</h1>
            <p className={clsx(styles.offerCardText)}>Popular clothing brands</p>
            <Link to="/shop" className={clsx(styles.offerCardButton)}>
              see offers
            </Link>
          </div>
        </div>
      </div>
      <div className={clsx(styles.offerCard, styles.offerCardThird)}>
        <div className={clsx(styles.offerCardContent)}>
          <h1 className={clsx(styles.offerCardTitle)}>Up to 40% off</h1>
          <p className={clsx(styles.offerCardText)}>Special offers and great deals</p>
          <Link to="/shop" className={clsx(styles.offerCardButton)}>
            shop now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OfferCard;
