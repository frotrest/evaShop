import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import clsx from 'clsx';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import styles from './ProductCard.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';

const ProductCardSwiper = ({ swiperId = 'default' }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const prevClass = `swiper-button-prev-${swiperId}`;
  const nextClass = `swiper-button-next-${swiperId}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://crisp-project-server.onrender.com/products');
        setProducts(response.data.slice(0, 8));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="pageLoader">Загрузка товаров...</div>;
  }

  if (error) {
    return <div className="pageLoader">Не удалось загрузить товары: {error}</div>;
  }

  return (
    <div className={clsx(styles.swiper)}>
      <div className={clsx(styles.nav)}>
        <button className={clsx(styles.btnPrev, prevClass)} aria-label="Previous slide">
          <FiChevronLeft size={20} />
        </button>
        <button className={clsx(styles.btnNext, nextClass)} aria-label="Next slide">
          <FiChevronRight size={20} />
        </button>
      </div>

      <Swiper
        spaceBetween={31}
        slidesPerView={4}
        slidesPerGroup={4}
        loop={products.length >= 5}
        watchOverflow={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20, slidesPerGroup: 2 },
          1024: { slidesPerView: 5, spaceBetween: 31, slidesPerGroup: 2 },
        }}
        navigation={{
          nextEl: `.${nextClass}`,
          prevEl: `.${prevClass}`,
        }}
        modules={[Navigation, Autoplay]}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id || product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCardSwiper;
