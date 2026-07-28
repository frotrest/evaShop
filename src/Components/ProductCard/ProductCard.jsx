import React from 'react';
import clsx from 'clsx';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product = {} }) => {
  const { title, price, oldPrice, category, description, discountedPrice } = product;

  const currentPrice = discountedPrice || price;
  const originalPrice = parseInt(oldPrice, 10) || price;
  const hasDiscount = Boolean(oldPrice && currentPrice < originalPrice);
  const imageUrl = product.image || (product.images && product.images[0]);

  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : null;

  const categoryName = typeof category === 'object' && category !== null ? category.name : category;
  const productId = product._id ?? product.id;
  return (
    <Link to={`/product/${productId}`} className={clsx(styles.productCard)}>
      <div className={clsx(styles.imgWrp)}>
        {hasDiscount && <span className={clsx(styles.discount)}>-{discountPercentage}%</span>}
        <img
          className={clsx(styles.image)}
          src={imageUrl}
          alt={title || 'Product'}
          loading="lazy"
        />
      </div>

      <p className={clsx(styles.category)}>{categoryName || 'TOP WOMAN'}</p>
      <p className={clsx(styles.description)}>{description}</p>

      <div className={clsx(styles.priceWrp)}>
        <span className={clsx(styles.price)}>{currentPrice},00 EUR</span>
        {hasDiscount && (
          <span className={clsx(styles.oldPrice)}>
            <del>{originalPrice},00 EUR</del>
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
