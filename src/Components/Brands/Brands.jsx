import React from 'react';
import styles from './brands.module.css';
import './brandsSwiper.css';
import {
  SiApple,
  SiTesla,
  SiDior,
  SiNike,
  SiSony,
  SiAntdesign,
  SiGoogle,
  SiMeta,
} from 'react-icons/si';
import clsx from 'clsx';
import Container from '../Container.jsx';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const luxuryBrandIcons = [SiApple, SiTesla, SiDior, SiNike, SiSony, SiAntdesign, SiGoogle, SiMeta];

const Brands = () => {
  return (
    <section className={clsx(styles.brands)}>
      <Container className={clsx(styles.brandsContent)}>
        <h2 className={clsx(styles.brandsContentTitle)}>Choose your brand</h2>
      </Container>
      <Swiper
        modules={[Autoplay, FreeMode]}
        freeMode={{ enabled: true, momentum: false }}
        loop={true}
        slidesPerView="5"
        spaceBetween={0}
        speed={5500}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        centeredSlides={true}
        className="brands-swiper"
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
            speed: 5500,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
        }}
      >
        {luxuryBrandIcons.map((BrandIcon, index) => (
          <SwiperSlide key={index}>
            <div className={clsx(styles.brand)}>
              <BrandIcon size={80} className={clsx(styles.brandImg)} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Brands;
