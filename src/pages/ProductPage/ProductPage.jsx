import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import clsx from 'clsx';
import Container from '../../Components/Container.jsx';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import { fetchOtherProducts } from '../../store/async/otherProductsFetch.js';
import { fetchProducts } from '../../store/slices/productsSlice.js';
import { showNotification, hideNotification } from '../../store/slices/notificationSlice.js';
import {
  makeSelectProductById,
  selectNotifications,
  selectProductsLoadingState,
} from '../../store/selectors.js';
import 'swiper/css';
import styles from './productPage.module.css';
import { IoStar, IoStarOutline, IoHeartSharp } from 'react-icons/io5';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ProductCardList from '../../Components/ProductCard/ProductCardList.jsx';
import ProductCardSwiper from '../../Components/ProductCard/ProductCardSwiper.jsx';
import { Link } from 'react-router-dom';
import placeholderImg from '@assets/placeholder.webp';

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const getCategoryValue = (category) => {
  if (typeof category === 'string') return category;
  return category.name || category.slug || '';
};

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const selectProductById = useMemo(() => makeSelectProductById(), []);
  const rawProduct = useSelector((state) => selectProductById(state, id));

  const { bothLoaded, eitherLoading, hasError, error, baseStatus, otherStatus } = useSelector(
    selectProductsLoadingState,
  );

  const notification = useSelector(selectNotifications);

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveImageIndex(0);
    setSelectedSize('');
    setQuantity(1);
    dispatch(hideNotification());
  }, [id, dispatch]);

  const productData = useMemo(() => {
    if (!rawProduct) return null;
    return {
      _id: rawProduct.id ?? rawProduct._id,
      brand: rawProduct.brand || '',
      title: rawProduct.title || '',
      price: Number(rawProduct.price) || 0,
      oldPrice: rawProduct.oldPrice || '',
      discountedPrice:
        rawProduct.discountedPrice != null ? Number(rawProduct.discountedPrice) : null,
      description: rawProduct.description || '',
      category: getCategoryValue(rawProduct.category),
      type: rawProduct.type || '',
      stock: Number.isFinite(rawProduct.stock) ? rawProduct.stock : 10,
      size:
        Array.isArray(rawProduct.size) && rawProduct.size.length ? rawProduct.size : DEFAULT_SIZES,
      rating: Number(rawProduct.rating) || 0,
      isNew: Boolean(rawProduct.isNew),
    };
  }, [rawProduct]);

  const images = useMemo(() => {
    if (!rawProduct) return [placeholderImg];
    return Array.isArray(rawProduct.images) && rawProduct.images.length
      ? rawProduct.images
      : [placeholderImg];
  }, [rawProduct]);

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

  const handleAddToBag = () => {
    if (!productData) return;

    if (productData.size?.length && !selectedSize) {
      dispatch(showNotification({ severity: 'error', message: 'Please select a size' }));
      return;
    }

    if (quantity > productData.stock) {
      dispatch(
        showNotification({
          severity: 'error',
          message: `Only ${productData.stock} items available`,
        }),
      );
      return;
    }

    dispatch(showNotification({ severity: 'success', message: 'Added to bag' }));

    console.log({
      productId: productData._id,
      title: productData.title,
      size: selectedSize,
      quantity,
      price: displayPrice,
      totalPrice,
      brand: productData.brand,
    });
  };

  const handleSave = () => {
    if (!productData) return;

    dispatch(showNotification({ severity: 'success', message: 'Saved to wishlist' }));

    console.log('Saved to wishlist', {
      productId: productData._id,
      title: productData.title,
    });
  };

  const retry = () => {
    dispatch(fetchOtherProducts());
    dispatch(fetchProducts());
  };

  if (!rawProduct && eitherLoading) {
    return <h2 className="pageLoader">Loading...</h2>;
  }

  if (!rawProduct && bothLoaded) {
    return (
      <Container className={clsx(styles.errorContainer)}>
        <div className={clsx(styles.errorMessage)}>Товар з id "{id}" не знайдено</div>
      </Container>
    );
  }

  if (!rawProduct && hasError) {
    return (
      <Container className={clsx(styles.errorContainer)}>
        <div className={clsx(styles.errorMessage)}>
          Помилка: {error || 'не вдалося завантажити товар'}
        </div>
        <button onClick={retry} className={clsx(styles.retryBtn)}>
          Спробувати знову
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
                  type="button"
                  className={clsx(
                    styles.thumbBtn,
                    index === activeImageIndex && styles.thumbBtnActive,
                  )}
                  onClick={() => mainSwiperRef.current.slideTo(index)}
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
              spaceBetween={10}
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
                      {productData.oldPrice || productData.price} EUR
                    </span>
                    <span className={clsx(styles.currentPrice)}>{totalPrice} EUR</span>
                    {discountPercent > 0 && (
                      <span className={clsx(styles.discountBadge)}>-{discountPercent}%</span>
                    )}
                  </>
                ) : (
                  <span>{totalPrice} EUR</span>
                )}
              </div>
            </div>

            <div className={clsx(styles.actionButtons)}>
              <button
                className={clsx(styles.addToBag)}
                onClick={handleAddToBag}
                disabled={productData.stock === 0}
              >
                {productData.stock > 0 ? 'ADD TO BAG' : 'OUT OF STOCK'}
              </button>
              <button className={clsx(styles.saveBtn)} onClick={handleSave}>
                SAVE <IoHeartSharp size={20} />
              </button>
            </div>
          </div>
        </div>

        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={() => dispatch(hideNotification())}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          TransitionComponent={Fade}
        >
          <Alert
            severity={notification.severity}
            onClose={() => dispatch(hideNotification())}
            variant="filled"
            sx={{ boxShadow: 3 }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
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
                  type="button"
                  onClick={() => toggleSection('productDetails')}
                >
                  Product Details
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
                  type="button"
                  onClick={() => toggleSection('sizeGuide')}
                >
                  Size Guide
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
                        : 'Standard sizes apply'}
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
                  type="button"
                  onClick={() => toggleSection('shipping')}
                >
                  Shipping & Returns
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
                      Free shipping on orders over 50 EUR. Returns accepted within 30 days.
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
                    !openSections.includes('comments') && styles.collapsed,
                  )}
                  type="button"
                  onClick={() => toggleSection('comments')}
                >
                  Comments
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {openSections.includes('comments') && (
                  <motion.div
                    key="content"
                    id="collapseFour"
                    className={clsx(styles.accordionCollapse)}
                    style={{ overflow: 'hidden' }}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={accordionVariants}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className={clsx(styles.accordionBody)}>
                      <span>Temporarily not working</span>
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
