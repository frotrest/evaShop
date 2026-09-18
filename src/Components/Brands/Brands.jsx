import styles from './brands.module.css';
import './brandsSwiper.css';
import { SiNike, SiAdidas } from 'react-icons/si';
import clsx from 'clsx';
import Container from '../Container.jsx';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const luxuryFashionBrands = [
  { name: 'PRADA', type: 'text', font: 'serif', subtitle: 'MILANO' },
  { name: 'SAINT LAURENT', type: 'text', font: 'sans', subtitle: 'PARIS' },
  { name: 'BALENCIAGA', type: 'text', font: 'sans', subtitle: 'PARIS' },
  { name: 'NIKE LAB', type: 'icon', Icon: SiNike },
  { name: 'BOTTEGA VENETA', type: 'text', font: 'serif', subtitle: 'VICENZA' },
  { name: 'JACQUEMUS', type: 'text', font: 'sans', subtitle: 'PARIS' },
  { name: 'ACNE STUDIOS', type: 'text', font: 'sans', subtitle: 'STOCKHOLM' },
  { name: 'ADIDAS ORIGINALS', type: 'icon', Icon: SiAdidas },
  { name: 'LOEWE', type: 'text', font: 'serif', subtitle: 'MADRID' },
  { name: 'THE ROW', type: 'text', font: 'sans', subtitle: 'NEW YORK' },
];

const Brands = () => {
  return (
    <section className={clsx(styles.brandsSection)}>
      <Container className={clsx(styles.headerBox)}>
        <span className={clsx(styles.eyebrow)}>CURATED ATELIER</span>
        <h2 className={clsx(styles.title)}>Official Brand Partners</h2>
      </Container>

      <Swiper
        modules={[Autoplay, FreeMode]}
        freeMode={{ enabled: true, momentum: false }}
        loop={true}
        slidesPerView="auto"
        spaceBetween={24}
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="brands-swiper"
      >
        {luxuryFashionBrands.concat(luxuryFashionBrands).map((brand, index) => (
          <SwiperSlide key={index} style={{ width: 'auto' }}>
            <div className={clsx(styles.brandCard)}>
              {brand.type === 'icon' ? (
                <div className={clsx(styles.brandIconWrap)}>
                  <brand.Icon size={38} className={clsx(styles.brandIcon)} />
                  <span className={clsx(styles.brandLabel)}>{brand.name}</span>
                </div>
              ) : (
                <div
                  className={clsx(styles.brandTextWrap, brand.font === 'serif' && styles.serifFont)}
                >
                  <span className={clsx(styles.brandName)}>{brand.name}</span>
                  {brand.subtitle && (
                    <span className={clsx(styles.brandSub)}>{brand.subtitle}</span>
                  )}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Brands;
