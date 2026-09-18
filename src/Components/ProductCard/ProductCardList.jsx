import clsx from 'clsx';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

const ProductCardList = ({
  title = 'Trending Pieces',
  eyebrow = 'CURATED COLLECTION',
  viewAllLink = '/catalog',
  children,
  swiperId = 'default',
}) => {
  return (
    <section className={clsx(styles.list)}>
      <div className={clsx(styles.headerRow)}>
        <div className={clsx(styles.titleBox)}>
          {eyebrow && <span className={clsx(styles.sectionEyebrow)}>{eyebrow}</span>}
          <h2 className={clsx(styles.listTitle)}>{title}</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: '13px',
                fontWeight: 600,
                color: '#18181b',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
              }}
            >
              <span>Explore All</span>
              <IoArrowForward size={14} />
            </Link>
          )}

          <div className={clsx(styles.nav)}>
            <button className={clsx(styles.btnPrev, `swiper-button-prev-${swiperId}`)}>←</button>
            <button className={clsx(styles.btnNext, `swiper-button-next-${swiperId}`)}>→</button>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};

export default ProductCardList;
