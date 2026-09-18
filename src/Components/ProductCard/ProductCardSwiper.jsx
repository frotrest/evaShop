import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import clsx from 'clsx';
import ProductCard from './ProductCard';
import styles from './ProductCard.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';

const ProductCardSwiper = ({ swiperId = 'default', categoryFilter = null }) => {
  const [products, setProducts] = useState([]);

  const prevClass = `swiper-button-prev-${swiperId}`;
  const nextClass = `swiper-button-next-${swiperId}`;

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://crisp-project-server.onrender.com/products');
        if (isMounted && Array.isArray(response.data) && response.data.length > 0) {
          let list = response.data;
          if (categoryFilter) {
            const filtered = list.filter(
              (p) => p.category?.type === categoryFilter || p.category?.name === categoryFilter,
            );
            if (filtered.length > 0) list = filtered;
          }
          setProducts(list.slice(0, 16));
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [categoryFilter]);

  return (
    <div className={clsx(styles.swiper)}>
      <Swiper
        spaceBetween={24}
        slidesPerView={4}
        loop={products.length >= 4}
        watchOverflow={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.25,
            spaceBetween: 14,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1120: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
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
