import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import clsx from 'clsx';
import Container from '../../Components/Container.jsx';
import { fetchOtherProducts } from '../../store/async/otherProductsFetch.js';
import { fetchProducts } from '../../store/slices/productsSlice.js';
import { showNotification, hideNotification } from '../../store/slices/notificationSlice.js';
import { addToCart, openCart } from '../../store/slices/cartSlice.js';
import { toggleWishlist } from '../../store/slices/wishlistSlice.js';
import { makeSelectProductById, selectProductsLoadingState } from '../../store/selectors.js';
import 'swiper/css';
import styles from './productPage.module.css';
import { IoStar, IoStarOutline, IoHeartSharp, IoChevronDown } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCardList from '../../Components/ProductCard/ProductCardList.jsx';
import ProductCardSwiper from '../../Components/ProductCard/ProductCardSwiper.jsx';
import { Link } from 'react-router-dom';
import placeholderImg from '@assets/placeholder.webp';

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const getCategoryValue = (category) => {
  if (typeof category === 'string') return category;
  return category?.name || category?.slug || '';
};

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const selectProductById = useMemo(() => makeSelectProductById(), []);
  const resolvedProduct = useSelector((state) => selectProductById(state, id));

  const { bothLoaded, eitherLoading, hasError, error, baseStatus, otherStatus } = useSelector(
    selectProductsLoadingState,
  );

  const [openSections, setOpenSections] = useState(['productDetails']);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const mainSwiperRef = useRef(null);

  const accordionVariants = {
    open: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  useEffect(() => {
    if (otherStatus === 'idle') dispatch(fetchOtherProducts());
    if (baseStatus === 'idle') dispatch(fetchProducts());
  }, [otherStatus, baseStatus, dispatch]);
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedSize('');
    setQuantity(1);
    dispatch(hideNotification());
  }, [id, dispatch]);

  const productData = useMemo(() => {
    if (!resolvedProduct) return null;
    const priceNum = Number(resolvedProduct.price) || 0;
    const oldPriceNum = resolvedProduct.oldPrice
      ? Number(resolvedProduct.oldPrice)
      : resolvedProduct.discountedPrice != null
        ? priceNum
        : null;
    const discountedNum =
      resolvedProduct.discountedPrice != null ? Number(resolvedProduct.discountedPrice) : null;

    return {
      _id: resolvedProduct.id ?? resolvedProduct._id,
      brand: resolvedProduct.brand || '',
      title: resolvedProduct.title || '',
      price: priceNum,
      oldPrice: oldPriceNum,
      discountedPrice: discountedNum,
      description: resolvedProduct.description || '',
      category: getCategoryValue(resolvedProduct.category),
      type: resolvedProduct.type || '',
      stock: Number.isFinite(resolvedProduct.stock) ? resolvedProduct.stock : 10,
      size:
        Array.isArray(resolvedProduct.size) && resolvedProduct.size.length
          ? resolvedProduct.size
          : DEFAULT_SIZES,
      rating: Number(resolvedProduct.rating) || 0,
      isNew: Boolean(resolvedProduct.isNew),
    };
  }, [resolvedProduct]);

  const images = useMemo(() => {
    if (!resolvedProduct) return [placeholderImg];
    return Array.isArray(resolvedProduct.images) && resolvedProduct.images.length
      ? resolvedProduct.images
      : [placeholderImg];
  }, [resolvedProduct]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === 'increment') {
        return productData?.stock ? Math.min(prev + 1, productData.stock) : prev + 1;
      }
      if (type === 'decrement') {
        return prev > 1 ? prev - 1 : 1;
      }
      return prev;
    });
  };

  const toggleSection = (key) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleImageError = (e) => {
    e.target.src = placeholderImg;
  };

  const displayPrice = productData ? (productData.discountedPrice ?? productData.price) : 0;
  const totalPrice = (displayPrice * quantity).toFixed(2);

  const discountPercent = useMemo(() => {
    if (!productData?.discountedPrice || !productData?.price) return 0;
    return Math.round((1 - productData.discountedPrice / productData.price) * 100);
  }, [productData]);

  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const isWishlisted = wishlistItems.some((item) => item.id === productData?._id);

  const handleAddToBag = () => {
    if (!productData) return;

    if (productData.size?.length && !selectedSize) {
      dispatch(
        showNotification({
          severity: 'error',
          message: 'Please select a size first',
        }),
      );
      return;
    }

    if (quantity > productData.stock) {
      dispatch(
        showNotification({
          severity: 'error',
          message: `Only ${productData.stock} items available in stock`,
        }),
      );
      return;
    }

    dispatch(
      addToCart({
        id: productData._id,
        title: productData.title,
        price: productData.price,
        discountedPrice: productData.discountedPrice,
        image: images[0] || placeholderImg,
        brand: productData.brand,
        size: selectedSize || productData.size?.[0] || 'M',
        quantity,
        stock: productData.stock || 45,
      }),
    );

    dispatch(
      showNotification({
        severity: 'success',
        message: `Added ${quantity} item(s) to your bag!`,
      }),
    );
    dispatch(openCart());
  };

  const handleSave = () => {
    if (!productData) return;

    dispatch(
      toggleWishlist({
        id: productData._id,
        title: productData.title,
        price: productData.price,
        discountedPrice: productData.discountedPrice,
        image: images[0] || placeholderImg,
        images,
        brand: productData.brand,
      }),
    );

    dispatch(
      showNotification({
        severity: isWishlisted ? 'info' : 'success',
        message: isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist!',
      }),
    );
  };

  const retry = () => {
    dispatch(fetchOtherProducts());
    dispatch(fetchProducts());
  };

  if (!resolvedProduct && eitherLoading) {
    return <h2 className="pageLoader">Loading...</h2>;
  }

  if (!resolvedProduct && bothLoaded) {
    return (
      <Container className={clsx(styles.errorContainer)}>
        <div className={clsx(styles.errorMessage)}>Product with ID "{id}" was not found</div>
      </Container>
    );
  }

  if (!resolvedProduct && hasError) {
    return (
      <Container className={clsx(styles.errorContainer)}>
        <div className={clsx(styles.errorMessage)}>
          Error: {error || 'Failed to load product details'}
        </div>
        <button onClick={retry} className={clsx(styles.retryBtn)}>
          Try Again
        </button>
      </Container>
    );
  }

  if (!productData) return null;

  return (
    <>
      <Container className={clsx(styles.productPage)}>
        <div className={clsx(styles.productContainer)}>
          <div className={clsx(styles.productGalleryWrapper)}>
            <div className={clsx(styles.galleryThumbs)}>
              {images.map((img, index) => (
                <button
                  key={index}
                  className={clsx(
                    styles.thumbBtn,
                    index === activeImageIndex && styles.thumbBtnActive,
                  )}
                  onClick={() => mainSwiperRef.current?.slideTo(index)}
                >
                  <img src={img} alt={`thumb-${index}`} onError={handleImageError} loading="lazy" />
                </button>
              ))}
            </div>
            <Swiper
              key={`main-${productData._id}`}
              onSwiper={(swiper) => {
                mainSwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
              spaceBetween={5}
              slidesPerView={1}
              observer={true}
              observeParents={true}
              className={clsx(styles.galleryMain)}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`main-${index}`} onError={handleImageError} loading="lazy" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={clsx(styles.productInfoWrapper)}>
            <div className={clsx(styles.breadcrumb)}>
              <Link to="/" className={clsx(styles.breadcrumbItem)}>
                Home
              </Link>
              <span className={clsx(styles.separator)}>/</span>
              <span className={clsx(styles.breadcrumbItem)}>
                {productData.category || 'Category'}
              </span>
              <span className={clsx(styles.separator)}>/</span>
              <span className={clsx(styles.breadcrumbItem)}>{productData.type || 'Product'}</span>
            </div>
            <div className={clsx(styles.brandHeader)}>
              <div className={clsx(styles.brand)}>{productData.brand}</div>
              {productData.isNew && <span className={clsx(styles.newBadge)}>NEW</span>}
            </div>

            <h1 className={clsx(styles.productTitle)}>{productData.title}</h1>

            {productData.rating > 0 && (
              <div className={clsx(styles.rating)}>
                {Array.from({ length: 5 }).map((item, index) =>
                  index < Math.floor(productData.rating) ? (
                    <IoStar key={index} className={clsx(styles.starIcon)} />
                  ) : (
                    <IoStarOutline key={index} className={clsx(styles.starIcon)} />
                  ),
                )}
                <span className={clsx(styles.ratingQuantity)}>({productData.rating})</span>
              </div>
            )}

            {productData.description && (
              <p className={clsx(styles.description)}>{productData.description}</p>
            )}
            <div className={clsx(styles.productManagement)}>
              {productData.size?.length > 0 && (
                <div className={clsx(styles.infoSection)}>
                  <h3 className={clsx(styles.sectionTitle)}>SELECT SIZE</h3>
                  <div className={clsx(styles.sizeGrid)}>
                    {productData.size.map((size, index) => (
                      <button
                        key={index}
                        className={clsx(styles.sizeBtn, selectedSize === size && styles.selected)}
                        onClick={() => {
                          setSelectedSize(size);
                          dispatch(hideNotification());
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className={clsx(styles.infoSection)}>
                <h3 className={clsx(styles.sectionTitle)}>QUANTITY</h3>
                <div className={clsx(styles.quantityControl)}>
                  <button
                    className={clsx(styles.quantityBtn)}
                    onClick={() => handleQuantityChange('decrement')}
                  >
                    −
                  </button>
                  <span className={clsx(styles.quantityValue)}>{quantity}</span>
                  <button
                    className={clsx(styles.quantityBtn)}
                    onClick={() => handleQuantityChange('increment')}
                  >
                    +
                  </button>
                </div>
                {productData.stock > 0 ? (
                  <div className={clsx(styles.stockInfo)}>In stock: {productData.stock}</div>
                ) : (
                  <div className={clsx(styles.stockInfo)}>Out of stock</div>
                )}
              </div>
            </div>
            <div className={clsx(styles.priceSection)}>
              <div className={clsx(styles.priceLabel)}>PRICE TOTAL</div>
              <div className={clsx(styles.priceValue)}>
                {productData.discountedPrice ? (
                  <>
                    <span className={clsx(styles.oldPrice)}>
                      ${Number(productData.oldPrice || productData.price).toFixed(2)}
                    </span>
                    <span className={clsx(styles.currentPrice)}>
                      ${Number(totalPrice).toFixed(2)}
                    </span>
                    {discountPercent > 0 && (
                      <span className={clsx(styles.discountBadge)}>-{discountPercent}%</span>
                    )}
                  </>
                ) : (
                  <span className={clsx(styles.currentPrice)}>
                    ${Number(totalPrice).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className={clsx(styles.actionButtons)}>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={clsx(styles.addToBag)}
                onClick={handleAddToBag}
                disabled={productData.stock === 0}
              >
                {productData.stock > 0 ? 'ADD TO BAG' : 'OUT OF STOCK'}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={clsx(styles.saveBtn)}
                style={
                  isWishlisted
                    ? {
                        color: '#dc2626',
                        borderColor: '#dc2626',
                        backgroundColor: '#fef2f2',
                      }
                    : {}
                }
                onClick={handleSave}
              >
                {isWishlisted ? 'SAVED' : 'SAVE'}{' '}
                <IoHeartSharp size={20} color={isWishlisted ? '#dc2626' : 'currentColor'} />
              </motion.button>
            </div>
          </div>
        </div>

        <div className={clsx(styles.productPageExtraInformation)}>
          <h2 className={clsx(styles.productPageExtraInformationTitle)}>Details</h2>
          <div className={clsx(styles.accordion)} id="accordionExample">
            <div className={clsx(styles.accordionItem)}>
              <h2 className={clsx(styles.accordionHeader)}>
                <button
                  className={clsx(
                    styles.accordionButton,
                    !openSections.includes('productDetails') && styles.collapsed,
                  )}
                  onClick={() => toggleSection('productDetails')}
                >
                  <span>Product Details</span>
                  <IoChevronDown
                    className={clsx(
                      styles.accordionIcon,
                      openSections.includes('productDetails') && styles.accordionIconOpen,
                    )}
                    size={18}
                  />
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {openSections.includes('productDetails') && (
                  <motion.div
                    key="content"
                    id="collapseOne"
                    className={clsx(styles.accordionCollapse)}
                    style={{ overflow: 'hidden' }}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={accordionVariants}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className={clsx(styles.accordionBody)}>
                      <strong>Product description:</strong>{' '}
                      {productData.description || 'No description available.'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className={clsx(styles.accordionItem)}>
              <h2 className={clsx(styles.accordionHeader)}>
                <button
                  className={clsx(
                    styles.accordionButton,
                    !openSections.includes('sizeGuide') && styles.collapsed,
                  )}
                  onClick={() => toggleSection('sizeGuide')}
                >
                  <span>Size Guide</span>
                  <IoChevronDown
                    className={clsx(
                      styles.accordionIcon,
                      openSections.includes('sizeGuide') && styles.accordionIconOpen,
                    )}
                    size={18}
                  />
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {openSections.includes('sizeGuide') && (
                  <motion.div
                    key="content"
                    id="collapseTwo"
                    className={clsx(styles.accordionCollapse)}
                    style={{ overflow: 'hidden' }}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={accordionVariants}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className={clsx(styles.accordionBody)}>
                      Available sizes:{' '}
                      {productData.size?.length
                        ? productData.size.join(', ')
                        : 'Standard sizes apply (XS - XL)'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className={clsx(styles.accordionItem)}>
              <h2 className={clsx(styles.accordionHeader)}>
                <button
                  className={clsx(
                    styles.accordionButton,
                    !openSections.includes('shipping') && styles.collapsed,
                  )}
                  onClick={() => toggleSection('shipping')}
                >
                  <span>Shipping & Returns</span>
                  <IoChevronDown
                    className={clsx(
                      styles.accordionIcon,
                      openSections.includes('shipping') && styles.accordionIconOpen,
                    )}
                    size={18}
                  />
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {openSections.includes('shipping') && (
                  <motion.div
                    key="content"
                    id="collapseThree"
                    className={clsx(styles.accordionCollapse)}
                    style={{ overflow: 'hidden' }}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={accordionVariants}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className={clsx(styles.accordionBody)}>
                      Complimentary express shipping on all orders over $100. Hassle-free returns
                      accepted within 30 days of delivery.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
      <ProductCardList title="You May Also Like">
        <ProductCardSwiper swiperId="cardSwiper" />
      </ProductCardList>
    </>
  );
}
