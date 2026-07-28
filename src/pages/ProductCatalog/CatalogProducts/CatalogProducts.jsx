// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import css from './CatalogProducts.module.css';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

function ProductItem({ images = [], title, price, type, id, _id }) {
  const productId = id ?? _id;
  const imageSrc = images[0] || '';

  return (
    <Link to={`/product/${productId}`} className={clsx(css.productItem)}>
      <img src={imageSrc} alt={title} className={clsx(css.productItem__photo)} loading="lazy" />
      <div className={clsx(css.productItem__productInfo)}>
        <span className={clsx(css.productItem__type)}>{type}</span>
        <span className={clsx(css.productItem__title)}>{title}</span>
        <span className={clsx(css.productItem__price)}> {price},00 EUR </span>
      </div>
    </Link>
  );
}

export default function CatalogProducts({ products = [] }) {
  return (
    <div className={clsx(css.catalogProducts)}>
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => {
          const productId = product.id ?? product._id ?? index;

          return (
            <motion.div
              key={productId}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ProductItem {...product} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
