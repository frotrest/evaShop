import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose, IoTrashOutline, IoHeartOutline, IoBagAddOutline } from 'react-icons/io5';
import { closeWishlist, removeFromWishlist, clearWishlist } from '../../store/slices/wishlistSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import styles from './WishlistDrawer.module.css';
import clsx from 'clsx';

export default function WishlistDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.wishlist);

  const handleMoveToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        discountedPrice: product.discountedPrice,
        image: product.images?.[0] || product.image,
        brand: product.brand,
        size: 'M',
        quantity: 1,
        stock: product.stock || 45,
      }),
    );
    dispatch(removeFromWishlist(product.id));
    dispatch(
      showNotification({
        severity: 'success',
        message: `${product.title} moved to cart!`,
      }),
    );
  };

  const handleMoveAllToCart = () => {
    items.forEach((product) => {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          discountedPrice: product.discountedPrice,
          image: product.images?.[0] || product.image,
          brand: product.brand,
          size: 'M',
          quantity: 1,
        }),
      );
    });
    dispatch(clearWishlist());
    dispatch(
      showNotification({
        severity: 'success',
        message: 'All wishlist items moved to your bag!',
      }),
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={clsx(styles.overlay)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => dispatch(closeWishlist())}
        >
          <motion.div
            className={clsx(styles.drawer)}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={clsx(styles.header)}>
              <div className={clsx(styles.title)}>
                <IoHeartOutline size={24} style={{ color: '#ef4444' }} />
                <span>Wishlist</span>
                <span className={clsx(styles.badge)}>{items.length}</span>
              </div>
              <button className={clsx(styles.closeBtn)} onClick={() => dispatch(closeWishlist())}>
                <IoClose size={22} />
              </button>
            </div>

            <div className={clsx(styles.body)}>
              {items.length === 0 ? (
                <div className={clsx(styles.emptyState)}>
                  <IoHeartOutline className={clsx(styles.emptyIcon)} />
                  <h4 className={clsx(styles.emptyTitle)}>Wishlist is Empty</h4>
                  <p style={{ fontSize: 14, color: '#64748b' }}>
                    Save your favorite clothing, hoodies, and accessories to review or purchase
                    later.
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className={clsx(styles.item)}
                    >
                      <img
                        src={item.images?.[0] || item.image || 'https://picsum.photos/200/300/'}
                        alt={item.title}
                        className={clsx(styles.itemImg)}
                      />
                      <div className={clsx(styles.itemDetails)}>
                        <div>
                          <h4 className={clsx(styles.itemTitle)}>{item.title}</h4>
                          <div className={clsx(styles.itemPrice)}>
                            ${(item.discountedPrice || item.price || 0).toFixed(2)}
                          </div>
                        </div>

                        <button
                          className={clsx(styles.moveToCartBtn)}
                          onClick={() => handleMoveToCart(item)}
                        >
                          <IoBagAddOutline size={16} />
                          <span>Add To Bag</span>
                        </button>
                      </div>

                      <button
                        className={clsx(styles.removeBtn)}
                        onClick={() => dispatch(removeFromWishlist(item.id))}
                      >
                        <IoTrashOutline size={17} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className={clsx(styles.footer)}>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={clsx(styles.moveAllBtn)}
                  onClick={handleMoveAllToCart}
                >
                  Move All To Bag
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
