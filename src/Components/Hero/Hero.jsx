import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './hero-settings.css';
import styles from './hero.module.css';
import Data from '../../data/photos.json';
import { Link } from 'react-router-dom';

const Hero = () => {
  const titles = [
    <>
      SUMMER SALE GET <span className={styles.discount}>30% OFF</span> On all dress
    </>,
    <>
      WINTER COLLECTION GET <span className={styles.discount}>40% OFF</span>
    </>,
    <>
      CASUAL STYLE Comfort <span className={styles.discount}>Up to 40% OFF</span>
    </>,
    <>
      HOLIDAY SALE Get <span className={styles.discount}>30% off now!</span>
    </>,
  ];
  return (
    <>
      <section className={styles.hero}>
        <Swiper
          spaceBetween={60}
          slidesPerView={1}
          modules={[Navigation, Pagination, Autoplay]}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{
            el: '.custom-paginate',
            clickable: true,
          }}
          direction="horizontal"
          loop={true}
          speed={300}
        >
          {Data.data.map((item, index) => (
            <SwiperSlide key={item._id}>
              <div className={`${styles.swiperBlock} container`}>
                <div className={styles.swiperCardContent}>
                  <h2 className={styles.swiperCardTitle}>{titles[index]}</h2>
                  <Link to="/shop" className={styles.swiperCardBtn}>
                    Shop now
                  </Link>
                </div>
                <div className={styles.photos}>
                  <img
                    src={item.urls[1]}
                    alt={item.title}
                    className={styles.swiperCardBottom}
                    fetchPriority="high"
                  />
                  <img
                    src={item.urls[0]}
                    alt={item.title}
                    className={styles.swiperCardImg}
                    fetchPriority="high"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-buttons">
          <div className="custom-paginate"></div>
          <div className="swipers">
            <button className="custom-prev">
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.48505 0.707153L1.4142 7.778L8.48504 14.8488"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="custom-next">
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.707092 14.8488L7.77794 7.77791L0.707095 0.707061"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
