import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './shopFilters.module.css';
import { IoBagHandleOutline, IoHeartOutline, IoHeart } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import { selectWishlistItems } from '../../store/selectors';

const ShopItems = ({ shopItems = [] }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleQuickAdd = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const itemId = item._id ?? item.id;
    dispatch(
      addToCart({
        id: itemId,
        title: item.title,
        price: item.price,
        discountedPrice: item.discountedPrice,
        image: item.images?.[0] || 'https://picsum.photos/400/500',
        brand: item.brand || item.category?.name || 'EvaShop',
        size: 'M',
        quantity: 1,
        stock: item.stock || 45,
      }),
    );
    dispatch(
      showNotification({
        severity: 'success',
        message: `Added "${item.title}" to bag`,
      }),
    );
  };

  const handleToggleWishlist = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const itemId = item._id ?? item.id;
    const isSaved = wishlistItems.some((w) => w.id === itemId);
    dispatch(
      toggleWishlist({
        id: itemId,
        title: item.title,
        price: item.price,
        discountedPrice: item.discountedPrice,
        image: item.images?.[0] || 'https://picsum.photos/400/500',
        brand: item.brand || item.category?.name,
      }),
    );
    dispatch(
      showNotification({
        severity: isSaved ? 'info' : 'success',
        message: isSaved ? `Removed from wishlist` : `Saved to wishlist`,
      }),
    );
  };

  if (!shopItems || shopItems.length === 0) {
    return (
      <div className={clsx(styles.emptyState)}>
        <p>No items match the chosen filter.</p>
        <span>Try selecting another silhouette from the sidebar.</span>
      </div>
    );
  }

  return (
    <div className={clsx(styles.shopItemsGrid)}>
      {shopItems.map((item) => {
        const itemId = item._id ?? item.id;
        const isWishlisted = wishlistItems.some((w) => w.id === itemId);
        const hasDiscount = Boolean(item.discountedPrice && item.discountedPrice < item.price);
        const imgUrl = item.images?.[0] || 'https://picsum.photos/400/500';

        return (
          <motion.div
            key={itemId}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className={clsx(styles.shopCard)}
          >
            <div className={clsx(styles.shopCardImgWrap)}>
              <Link to={`/product/${itemId}`} className={clsx(styles.imgLink)}>
                <img
                  src={imgUrl}
                  alt={item.title}
                  className={clsx(styles.shopCardImg)}
                  loading="lazy"
                />
              </Link>

              {hasDiscount && <span className={clsx(styles.badgeSale)}>SALE</span>}

              <button
                className={clsx(styles.wishlistBtn, isWishlisted && styles.wishlistBtnActive)}
                onClick={(e) => handleToggleWishlist(e, item)}
              >
                {isWishlisted ? (
                  <IoHeart size={16} color="#ef4444" />
                ) : (
                  <IoHeartOutline size={16} />
                )}
              </button>

              <button
                className={clsx(styles.quickAddTrigger)}
                onClick={(e) => handleQuickAdd(e, item)}
              >
                <IoBagHandleOutline size={15} />
                <span>Quick Add</span>
              </button>
            </div>

            <div className={clsx(styles.shopCardInfo)}>
              <span className={clsx(styles.shopCardCategory)}>
                {item.category?.name || 'Collection'}
              </span>
              <Link to={`/product/${itemId}`} className={clsx(styles.titleLink)}>
                <h4 className={clsx(styles.shopCardTitle)} title={item.title}>
                  {item.title}
                </h4>
              </Link>

              <div className={clsx(styles.shopCardPrices)}>
                <span className={clsx(styles.currentPrice)}>
                  ${item.discountedPrice || item.price}.00
                </span>
                {hasDiscount && <span className={clsx(styles.oldPrice)}>${item.price}.00</span>}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ShopItems;
