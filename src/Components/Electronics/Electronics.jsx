import styles from './electronics.module.css';
import clsx from 'clsx';
import Container from '../Container';
import { IoArrowForward, IoSparklesOutline } from 'react-icons/io5';

const Electronic = () => {
  return (
    <section className={clsx(styles.electronics)}>
      <div className={clsx(styles.backdrop)} />
      <Container className={clsx(styles.electronicsContent)}>
        <div className={clsx(styles.card)}>
          <div className={clsx(styles.tag)}>
            <IoSparklesOutline size={14} />
            <span>CURATED TECH & ACOUSTICS</span>
          </div>
          <h1 className={clsx(styles.title)}>
            High-Performance <em>Sound & Living</em>
          </h1>
          <p className={clsx(styles.description)}>
            Sculptural aesthetics meet audiophile clarity. Explore acoustic engineering and
            minimalist gadgets curated for the design-conscious home.
          </p>
          <a href="#mainFilters" className={clsx(styles.btn)}>
            <span>Explore Electronics</span>
            <IoArrowForward size={16} />
          </a>
        </div>
      </Container>
    </section>
  );
};

export default Electronic;
