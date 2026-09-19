import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './hero-settings.css';
import styles from './hero.module.css';
import { Link } from 'react-router-dom';
import {
  IoArrowForward,
  IoChevronBack,
  IoChevronForward,
  IoSparklesOutline,
} from 'react-icons/io5';
import summerPrimary from '@assets/HomePage/slider/summer-fashion-one.webp';
import summerSecondary from '@assets/HomePage/slider/summer-fashion-second.webp';
import casualPrimary from '@assets/HomePage/slider/casual-one.webp';
import casualSecondary from '@assets/HomePage/slider/casual-second.webp';
import winterPrimary from '@assets/HomePage/slider/winter-collection-one.webp';
import winterSecondary from '@assets/HomePage/slider/winter-collection-second.webp';
import holidayPrimary from '@assets/HomePage/slider/holiday-one.webp';
import holidaySecondary from '@assets/HomePage/slider/holiday-second.webp';

const SLIDES_CONTENT = [
  {
    tag: 'SPRING / SUMMER 2026',
    title: 'Modern Tailoring & Fluid Silhouettes',
    description:
      'Elevate your daily capsule with understated luxury, architectural cuts, and breathable natural fibers.',
    offer: 'GET 30% OFF',
    lookName: 'Sculpted Linen Trench',
    lookPrice: '$315.00',
    primaryImg: summerPrimary,
    secondaryImg: summerSecondary,
  },
  {
    tag: 'EXCLUSIVE ARCHIVE',
    title: 'Winter Layers & Cozy Cashmere',
    description:
      'Impeccably woven coats, structured blazers, and pure wool knitwear engineered for timeless warmth.',
    offer: '40% OFF STOREWIDE',
    lookName: 'Double-Breasted Wool Coat',
    lookPrice: '$420.00',
    primaryImg: winterPrimary,
    secondaryImg: winterSecondary,
  },
  {
    tag: 'NEW MINIMALISM',
    title: 'Casual Precision & Everyday Ease',
    description:
      'Neutral palettes, effortless draping, and considered accessories designed to transition seamlessly from day to dusk.',
    offer: 'SPECIAL EDITION',
    lookName: 'Monochrome Set',
    lookPrice: '$180.00',
    primaryImg: casualPrimary,
    secondaryImg: casualSecondary,
  },
  {
    tag: 'HOLIDAY CAPSULE',
    title: 'Evening Statement & Party Edit',
    description:
      'Rich satins, bold silhouettes, and luminous tailoring crafted to command every room.',
    offer: 'LIMITED DROP',
    lookName: 'Tailored Silk Blazer',
    lookPrice: '$290.00',
    primaryImg: holidayPrimary,
    secondaryImg: holidaySecondary,
  },
];

const Hero = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className={clsx(styles.heroSection)}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: '.hero-next-btn',
          prevEl: '.hero-prev-btn',
        }}
        pagination={{
          el: '.hero-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${clsx(className, styles.customBullet)}">0${index + 1}</span>`;
          },
        }}
        onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
        loop={true}
        speed={700}
        className={clsx(styles.heroSwiper)}
      >
        {SLIDES_CONTENT.map((content, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={clsx(styles.slideContainer)}>
                <div className={clsx(styles.contentCol)}>
                  <div className={clsx(styles.tagBadge)}>
                    <IoSparklesOutline size={14} />
                    <span>{content.tag}</span>
                  </div>

                  <h1 className={clsx(styles.headline)}>
                    {content.title.split('&').map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && <em className={clsx(styles.ampersand)}>&amp;</em>}
                      </span>
                    ))}
                  </h1>

                  <p className={clsx(styles.subtext)}>{content.description}</p>

                  <div className={clsx(styles.buttonGroup)}>
                    <Link to="/catalog" className={clsx(styles.primaryBtn)}>
                      <span>Explore Collection</span>
                      <IoArrowForward size={16} />
                    </Link>
                    <Link to="/shop" className={clsx(styles.secondaryBtn)}>
                      Shop Electronics
                    </Link>
                  </div>

                  <div className={clsx(styles.trustBadges)}>
                    <div className={clsx(styles.trustItem)}>
                      <span className={clsx(styles.trustNumber)}>{content.offer}</span>
                      <span className={clsx(styles.trustLabel)}>Limited Promotion</span>
                    </div>
                    <div className={clsx(styles.trustDivider)} />
                    <div className={clsx(styles.trustItem)}>
                      <span className={clsx(styles.trustNumber)}>FREE</span>
                      <span className={clsx(styles.trustLabel)}>Worldwide Express</span>
                    </div>
                    <div className={clsx(styles.trustDivider)} />
                    <div className={clsx(styles.trustItem)}>
                      <span className={clsx(styles.trustNumber)}>4.9/5</span>
                      <span className={clsx(styles.trustLabel)}>Customer Rating</span>
                    </div>
                  </div>
                </div>

                <div className={clsx(styles.visualCol)}>
                  <div className={clsx(styles.imageStage)}>
                    <div className={clsx(styles.primaryImgWrap)}>
                      <img
                        src={content.primaryImg}
                        alt={`img-${index + 1}`}
                        className={clsx(styles.mainImg)}
                        fetchPriority="high"
                      />
                      <div className={clsx(styles.floatingProductCard)}>
                        <span className={clsx(styles.floatingTag)}>Featured Look</span>
                        <h4 className={clsx(styles.floatingTitle)}>{content.lookName}</h4>
                        <span className={clsx(styles.floatingPrice)}>{content.lookPrice}</span>
                      </div>
                    </div>

                    <div className={clsx(styles.secondaryImgWrap)}>
                      <img
                        src={content.secondaryImg}
                        alt={`sub-img-${index + 1}`}
                        className={clsx(styles.secImg)}
                      />
                      <div className={clsx(styles.stampBadge)}>
                        <span>EVA SHOP</span>
                        <strong>2026</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={clsx(styles.controlsBar)}>
        <div className="hero-pagination" />
        <div className={clsx(styles.arrowControls)}>
          <button className={clsx('hero-prev-btn')}>
            <IoChevronBack size={18} />
          </button>
          <div className={clsx(styles.counterDisplay)}>
            <span>0{activeIdx + 1}</span>
            <em>/</em>
            <span>04</span>
          </div>
          <button className={clsx('hero-next-btn')}>
            <IoChevronForward size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
