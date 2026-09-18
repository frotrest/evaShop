import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  IoClose,
  IoHeart,
  IoHeartOutline,
  IoBagAddOutline,
  IoArrowForwardOutline,
} from 'react-icons/io5';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import styles from './QuickViewModal.module.css';
import { selectWishlistItems } from '../../store/selectors';
import clsx from 'clsx';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const [selectedSize, setSelectedSize] = useState('M');

  const rootModal = document.getElementById('root-modal');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!product || typeof document === 'undefined') return null;

  const productId = product.id ?? product._id;
  const isWishlisted = wishlistItems.some(
    (item) => String(item.id ?? item._id) === String(productId),
  );
  const sizes =
    Array.isArray(product.size) && product.size.length > 0 ? product.size : ['S', 'M', 'L', 'XL'];
  const price = Number(product.discountedPrice || product.price) || 0;
  const oldPrice = product.oldPrice
    ? Number(product.oldPrice)
    : product.discountedPrice
      ? Number(product.price)
      : null;
  const image =
    (Array.isArray(product.images) && product.images[0]) ||
    product.image ||
    'https://picsum.photos/400/500/';

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productId,
        title: product.title,
        price: product.price,
        discountedPrice: product.discountedPrice,
        image,
        brand: product.brand,
        size: selectedSize,
        quantity: 1,
        stock: product.stock || 45,
      }),
    );
    dispatch(
      showNotification({
        severity: 'success',
        message: `${product.title} (${selectedSize}) added to bag!`,
      }),
    );
    onClose();
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
    dispatch(
      showNotification({
        severity: isWishlisted ? 'info' : 'success',
        message: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!',
      }),
    );
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={clsx(styles.modalOverlay)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={clsx(styles.modalContent)}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={clsx(styles.closeBtn)} onClick={onClose}>
              <IoClose size={20} />
            </button>

            <div className={clsx(styles.imageSection)}>
              <img src={image} alt={product.title} className={clsx(styles.modalImage)} />
            </div>

            <div className={clsx(styles.infoSection)}>
              <div>
                {product.brand && <div className={clsx(styles.brandName)}>{product.brand}</div>}
                <h3 className={clsx(styles.productTitle)}>{product.title}</h3>

                <div className={clsx(styles.priceBox)}>
                  <span className={clsx(styles.currentPrice)}>${price.toFixed(2)}</span>
                  {oldPrice && (
                    <span className={clsx(styles.oldPrice)}>${Number(oldPrice).toFixed(2)}</span>
                  )}
                  {product.discountedPrice && (
                    <span className={clsx(styles.discountBadge)}>SALE</span>
                  )}
                </div>

                <p className={clsx(styles.description)}>
                  {product.description ||
                    'Elevate your wardrobe with this signature piece. Designed for both casual elegance and sophisticated everyday wear.'}
                </p>

                <div className={clsx(styles.sectionLabel)}>Select Size</div>
                <div className={clsx(styles.sizeSelector)}>
                  {sizes.map((s) => (
                    <button
                      key={s}
                      className={clsx(styles.sizeBtn, selectedSize === s && styles.sizeBtnActive)}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className={clsx(styles.actionRow)}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={clsx(styles.addToBagBtn)}
                  onClick={handleAddToCart}
                >
                  <IoBagAddOutline size={18} />
                  <span>Add To Bag</span>
                </motion.button>

                <button
                  className={clsx(styles.wishlistBtn, isWishlisted && styles.wishlistBtnActive)}
                  onClick={handleWishlistToggle}
                >
                  {isWishlisted ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
                </button>
              </div>

              <Link
                to={`/product/${productId}`}
                className={clsx(styles.viewFullDetailsLink)}
                onClick={onClose}
              >
                <span>View Full Product Details</span>
                <IoArrowForwardOutline size={16} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    rootModal,
  );
}
