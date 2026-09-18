import clsx from 'clsx';
import { motion } from 'framer-motion';
import styles from './offerCards.module.css';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

const OfferCards = () => {
  return (
    <section className={clsx(styles.offerSection)}>
      <div className={clsx(styles.offerGrid)}>
        <div className={clsx(styles.stackCol)}>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className={clsx(styles.offerCard, styles.cardAppearance)}
          >
            <div className={clsx(styles.cardBackdrop)} />
            <div className={clsx(styles.offerCardContent)}>
              <span className={clsx(styles.cardTag)}>Curated Wardrobe</span>
              <h3 className={clsx(styles.offerCardTitle)}>CHOOSE YOUR LOOK</h3>
              <p className={clsx(styles.offerCardText)}>
                Refined silhouettes & timeless everyday essentials
              </p>
              <Link to="/catalog" className={clsx(styles.offerCardButton)}>
                <span>Explore Looks</span>
                <IoArrowForward size={15} />
              </Link>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className={clsx(styles.offerCard, styles.cardStyle)}
          >
            <div className={clsx(styles.cardBackdrop)} />
            <div className={clsx(styles.offerCardContent)}>
              <span className={clsx(styles.cardTag)}>New Arrivals</span>
              <h3 className={clsx(styles.offerCardTitle)}>BRAND NEW STYLE</h3>
              <p className={clsx(styles.offerCardText)}>
                Trending designer pieces from global ateliers
              </p>
              <Link to="/catalog" className={clsx(styles.offerCardButton)}>
                <span>Discover Brands</span>
                <IoArrowForward size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
          className={clsx(styles.offerCard, styles.cardDiscount)}
        >
          <div className={clsx(styles.cardBackdropDark)} />
          <div className={clsx(styles.offerCardContent, styles.tallCardContent)}>
            <span className={clsx(styles.saleTag)}>SPECIAL PROMOTION</span>
            <h3 className={clsx(styles.offerCardTitle, styles.saleTitle)}>UP TO 40% OFF</h3>
            <p className={clsx(styles.offerCardText)}>
              Exclusive end-of-season designer drops & seasonal favorites
            </p>
            <Link to="/catalog" className={clsx(styles.saleButton)}>
              <span>Shop Private Sale</span>
              <IoArrowForward size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferCards;
