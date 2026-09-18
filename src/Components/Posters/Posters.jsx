import styles from './posters.module.css';
import clsx from 'clsx';
import Container from '../Container';
import { Link } from 'react-router-dom';
import { IoArrowForward, IoAirplaneOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

const Shopping = () => {
  return (
    <section className={clsx(styles.shoppingBanner)}>
      <div className={clsx(styles.bannerBackdrop)} />
      <Container className={clsx(styles.bannerContainer)}>
        <div className={clsx(styles.bannerCard)}>
          <span className={clsx(styles.bannerEyebrow)}>GLOBAL ATELIER DISPATCH</span>
          <h2 className={clsx(styles.bannerTitle)}>
            Shopping Without <em>Boundaries</em>
          </h2>
          <p className={clsx(styles.bannerDescription)}>
            From the historic avenues of Paris to the skyline of San Francisco, experience bespoke
            fashion delivered directly to your doorstep with carbon-neutral express courier
            shipping.
          </p>

          <div className={clsx(styles.bannerFeatures)}>
            <div className={clsx(styles.featureBadge)}>
              <IoShieldCheckmarkOutline size={16} />
              <span>Complimentary Duties & Taxes Included</span>
            </div>
          </div>

          <Link to="/catalog" className={clsx(styles.bannerButton)}>
            <span>Explore The Collection</span>
            <IoArrowForward size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
};

const Traveling = () => {
  return (
    <section className={clsx(styles.travelingBanner)}>
      <div className={clsx(styles.bannerBackdropDark)} />
      <Container className={clsx(styles.bannerContainer, styles.alignRight)}>
        <div className={clsx(styles.bannerCard, styles.darkCard)}>
          <div className={clsx(styles.bannerTag)}>
            <IoAirplaneOutline size={15} />
            <span>THE VOYAGE CAPSULE</span>
          </div>
          <h2 className={clsx(styles.bannerTitle, styles.whiteTitle)}>
            EXPLORE THE BEST <em>OF YOU</em>
          </h2>
          <p className={clsx(styles.bannerDescription, styles.lightDescription)}>
            Wrinkle-resistant linens, modular layering systems, and packable Italian leather
            accessories curated for the effortless global traveler.
          </p>
          <Link to="/catalog" className={clsx(styles.bannerButtonLight)}>
            <span>Shop The Travel Edit</span>
            <IoArrowForward size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export { Shopping, Traveling };
