import { useCallback, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import styles from './shopFilters.module.css';
import { MdZoomOutMap, MdOutlineZoomInMap } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ShopItems = ({ shopItems }) => {
  const [zoomItemId, setZoomId] = useState(null);

  const zoomingHandle = useCallback((e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setZoomId((prevId) => (prevId === id ? null : id));
  }, []);

  return (
    <div className={clsx(styles.shopItems)} id="shopItems">
      <AnimatePresence mode="popLayout">
        {shopItems.map((shopItem) => {
          const productId = shopItem._id ?? shopItem.id;
          return (
            <motion.div
              key={shopItem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              layout
            >
              <Link to={`/product/${productId}`} className={clsx(styles.shopItem)}>
                <div className={clsx(styles.shopItemImgContent)}>
                  <img
                    src={shopItem.images[0]}
                    alt={shopItem.slug}
                    className={clsx(
                      styles.shopItemImg,
                      zoomItemId === shopItem.id && styles.zoomed,
                    )}
                    loading="lazy"
                  />
                  <button
                    className={clsx(styles.shopItemButton)}
                    onClick={(e) => zoomingHandle(e, shopItem.id)}
                  >
                    {zoomItemId === shopItem.id ? (
                      <>
                        <MdOutlineZoomInMap /> Zoom out
                      </>
                    ) : (
                      <>
                        <MdZoomOutMap /> Zoom in
                      </>
                    )}
                  </button>
                </div>
                <h5 className={clsx(styles.shopItemType)}>{shopItem.category.name}</h5>
                <h2 className={clsx(styles.shopItemTitle)}>{shopItem.title}</h2>
                {shopItem.discountedPrice ? (
                  <div className={clsx(styles.shopItemPrices)}>
                    <p className={clsx(styles.shopItemDiscount)}>{shopItem.discountedPrice} EUR</p>
                    <p className={clsx(styles.shopItemPriceDiscount)}>{shopItem.price} EUR</p>
                  </div>
                ) : (
                  <p className={clsx(styles.shopItemPrice)}>{shopItem.price} EUR</p>
                )}
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ShopItems;
