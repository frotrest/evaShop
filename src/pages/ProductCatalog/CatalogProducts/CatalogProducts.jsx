import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import css from './CatalogProducts.module.css';
import clsx from 'clsx';

export default function CatalogProducts({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className={clsx(css.emptyCatalog)}>
        <h3 className={clsx(css.emptyTitle)}>No Matching Pieces Found</h3>
        <p className={clsx(css.emptySubtitle)}>
          Try resetting the sidebar filters or broadening your price selection to view our full
          collection.
        </p>
      </div>
    );
  }

  return (
    <div className={clsx(css.catalogGrid)}>
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => {
          const productId = product.id ?? product._id ?? index;

          return (
            <motion.div
              key={productId}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={clsx(css.cardWrapper)}
            >
              <ProductCard product={product} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
