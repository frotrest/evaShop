import { lazy, useState, Suspense } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoHeart, IoHeartOutline, IoBagAddOutline, IoEyeOutline } from 'react-icons/io5';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import styles from './ProductCard.module.css';
import { selectWishlistItems } from '../../store/selectors';
const QuickViewModal = lazy(() => import('../QuickView/QuickViewModal'));

const ProductCard = ({ product = {} }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const { title, price, oldPrice, category, discountedPrice } = product;
  const currentPrice = discountedPrice || price || 0;
  const originalPrice = parseInt(oldPrice, 10) || price;
  const hasDiscount = Boolean(oldPrice && currentPrice < originalPrice);
  const imageUrl =
    product.image || (product.images && product.images[0]) || 'https://picsum.photos/400/500/';

  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : null;

  const categoryName =
    typeof category === 'object' && category !== null ? category.name : category || 'Collection';
  const productId = product._id ?? product.id;
  const isWishlisted = wishlistItems.some((item) => item.id === productId);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: productId,
        title: title || 'Fashion Piece',
        price,
        discountedPrice,
        image: imageUrl,
        brand: product.brand || 'EvaShop',
        size: Array.isArray(product.size) && product.size[0] ? product.size[0] : 'M',
        quantity: 1,
        stock: product.stock || 45,
      }),
    );
    dispatch(
      showNotification({
        severity: 'success',
        message: `Added "${title || 'Piece'}" to your bag!`,
      }),
    );
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    dispatch(
      showNotification({
        severity: isWishlisted ? 'info' : 'success',
        message: isWishlisted
          ? `Removed "${title || 'Piece'}" from wishlist`
          : `Saved "${title || 'Piece'}" to wishlist`,
      }),
    );
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <div className={clsx(styles.productCard)}>
        <div className={clsx(styles.imgBox)}>
          <Link to={`/product/${productId}`} className={clsx(styles.imgLink)}>
            <img
              src={imageUrl}
              alt={title || 'Product Image'}
              className={clsx(styles.productImg, imgLoaded && styles.imgLoaded)}
              onLoad={() => setImgLoaded(true)}
              loading="lazy"
            />
          </Link>

          <div className={clsx(styles.badgesGroup)}>
            {hasDiscount && (
              <span className={clsx(styles.discountBadge)}>-{discountPercentage}%</span>
            )}
            {product.isNew && <span className={clsx(styles.newBadge)}>NEW</span>}
          </div>

          <div className={clsx(styles.floatingActions)}>
            <button
              className={clsx(styles.iconActionBtn, isWishlisted && styles.iconActive)}
              onClick={handleWishlistClick}
            >
              {isWishlisted ? <IoHeart size={17} color="#ef4444" /> : <IoHeartOutline size={17} />}
            </button>

            <button className={clsx(styles.iconActionBtn)} onClick={handleQuickViewClick}>
              <IoEyeOutline size={17} />
            </button>
          </div>

          <button className={clsx(styles.quickAddBar)} onClick={handleQuickAdd}>
            <IoBagAddOutline size={16} />
            <span>QUICK ADD TO BAG</span>
          </button>
        </div>

        <div className={clsx(styles.productInfo)}>
          <div className={clsx(styles.categoryRow)}>
            <span className={clsx(styles.brandLabel)}>{product.brand || 'EVA ATELIER'}</span>
            <span className={clsx(styles.dotSeparator)}>•</span>
            <span className={clsx(styles.categoryLabel)}>{categoryName}</span>
          </div>

          <Link to={`/product/${productId}`} className={clsx(styles.titleLink)}>
            <h4 className={clsx(styles.productTitle)} title={title}>
              {title}
            </h4>
          </Link>

          <div className={clsx(styles.priceRow)}>
            <span className={clsx(styles.currentPrice)}>${currentPrice}.00</span>
            {hasDiscount && <span className={clsx(styles.oldPrice)}>${originalPrice}.00</span>}
          </div>

          {Array.isArray(product.size) && product.size.length > 0 && (
            <div className={clsx(styles.sizesRow)}>
              {product.size.slice(0, 4).map((s) => (
                <span key={s} className={clsx(styles.sizeChip)}>
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {quickViewOpen && (
        <Suspense fallback={null}>
          <QuickViewModal
            isOpen={quickViewOpen}
            onClose={() => setQuickViewOpen(false)}
            product={product}
          />
        </Suspense>
      )}
    </>
  );
};

export default ProductCard;
