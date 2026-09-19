import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose, IoTrashOutline, IoBagHandleOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { PiHandbagBold } from 'react-icons/pi';
import {
  closeCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import { selectCart, selectLogin } from '../../store/selectors';
import styles from './CartDrawer.module.css';
import clsx from 'clsx';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen, appliedCoupon, discountPercent } = useSelector(selectCart);
  const { user } = useSelector(selectLogin);

  const [promoInput, setPromoInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.[0]?.firstName ? `${user[0].firstName} ${user[0].lastName || ''}`.trim() : '',
    email: user?.[0]?.email || '',
    address: user?.[0]?.address || '',
    cardNumber: '•••• •••• •••• 4242',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discountPercent;
  const freeShippingThreshold = 100;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const code = promoInput.trim().toUpperCase();
    if (['EVA', 'KATYA', 'SUMMER25'].includes(code)) {
      dispatch(applyCoupon(code));
      dispatch(
        showNotification({
          severity: 'success',
          message: `Promo code ${code} applied successfully!`,
        }),
      );
      setPromoInput('');
    } else {
      dispatch(
        showNotification({
          severity: 'error',
          message: 'Invalid promo code. Try EVA or KATYA',
        }),
      );
    }
  };

  const handleStartCheckout = () => {
    setIsCheckingOut(true);
    setCheckoutSuccess(false);
  };

  const handleFinishCheckout = (e) => {
    e.preventDefault();
    setCheckoutSuccess(true);
    dispatch(clearCart());
    dispatch(
      showNotification({
        severity: 'success',
        message: 'Order placed successfully!',
      }),
    );
    setTimeout(() => {
      setCheckoutSuccess(false);
      setIsCheckingOut(false);
      dispatch(closeCart());
    }, 2800);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={clsx(styles.cartOverlay)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => dispatch(closeCart())}
          >
            <motion.div
              className={clsx(styles.cartDrawer)}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={clsx(styles.cartHeader)}>
                <div className={clsx(styles.cartTitle)}>
                  <PiHandbagBold size={24} />
                  <span>Your Bag</span>
                  <span className={clsx(styles.cartCountBadge)}>{totalItemsCount}</span>
                </div>
                <button className={clsx(styles.closeBtn)} onClick={() => dispatch(closeCart())}>
                  <IoClose size={22} />
                </button>
              </div>

              <div className={clsx(styles.shippingMeter)}>
                <div className={clsx(styles.meterText)}>
                  {subtotal >= freeShippingThreshold ? (
                    <span style={{ color: '#10b981', fontWeight: 600 }}>
                      🎉 You qualified for FREE worldwide shipping!
                    </span>
                  ) : (
                    <span>
                      Add{' '}
                      <span className={clsx(styles.meterHighlight)}>
                        ${(freeShippingThreshold - subtotal).toFixed(2)}
                      </span>{' '}
                      more for Free Shipping
                    </span>
                  )}
                </div>
                <div className={clsx(styles.meterProgressTrack)}>
                  <div
                    className={clsx(styles.meterProgressBar)}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className={clsx(styles.cartBody)}>
                {items.length === 0 ? (
                  <div className={clsx(styles.emptyState)}>
                    <IoBagHandleOutline className={clsx(styles.emptyIcon)} />
                    <h4 className={clsx(styles.emptyTitle)}>Your Bag is Empty</h4>
                    <p className={clsx(styles.emptySubtext)}>
                      Looks like you haven&apos;t added any items yet. Explore our latest arrivals
                      and seasonal trends!
                    </p>
                    <button
                      className={clsx(styles.shopNowBtn)}
                      onClick={() => dispatch(closeCart())}
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.cartItemId}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className={clsx(styles.cartItem)}
                      >
                        <img
                          src={item.image || 'https://picsum.photos/200/300/'}
                          alt={item.title}
                          className={clsx(styles.cartItemImg)}
                        />
                        <div className={clsx(styles.cartItemDetails)}>
                          <div>
                            <h4 className={clsx(styles.itemTitle)}>{item.title}</h4>
                            <div className={clsx(styles.itemMeta)}>
                              <span>
                                Size: <strong>{item.size || 'M'}</strong>
                              </span>
                              {item.brand && <span>• {item.brand}</span>}
                            </div>
                          </div>

                          <div className={clsx(styles.itemPriceRow)}>
                            <div className={clsx(styles.quantityControl)}>
                              <button
                                className={clsx(styles.qtyBtn)}
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      cartItemId: item.cartItemId,
                                      quantity: item.quantity - 1,
                                    }),
                                  )
                                }
                              >
                                -
                              </button>
                              <span className={clsx(styles.qtyValue)}>{item.quantity}</span>
                              <button
                                className={clsx(styles.qtyBtn)}
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      cartItemId: item.cartItemId,
                                      quantity: item.quantity + 1,
                                    }),
                                  )
                                }
                              >
                                +
                              </button>
                            </div>

                            <span className={clsx(styles.itemPrice)}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <button
                          className={clsx(styles.itemRemoveBtn)}
                          onClick={() => dispatch(removeFromCart(item.cartItemId))}
                        >
                          <IoTrashOutline size={17} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
              {items.length > 0 && (
                <div className={clsx(styles.cartFooter)}>
                  {appliedCoupon ? (
                    <div className={clsx(styles.couponApplied)}>
                      <span>
                        Coupon &quot;{appliedCoupon}&quot; applied (-
                        {discountPercent * 100}%)
                      </span>
                      <button
                        className={clsx(styles.couponRemove)}
                        onClick={() => dispatch(removeCoupon())}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form className={clsx(styles.couponForm)} onSubmit={handleApplyCoupon}>
                      <input
                        type="text"
                        placeholder="PROMO CODE (e.g. EVA, KATYA)"
                        className={clsx(styles.couponInput)}
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                      />
                      <button type="submit" className={clsx(styles.couponBtn)}>
                        Apply
                      </button>
                    </form>
                  )}

                  <div className={clsx(styles.summaryRow)}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className={clsx(styles.summaryRow)} style={{ color: '#10b981' }}>
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className={clsx(styles.summaryRow)}>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className={clsx(styles.summaryTotal)}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={clsx(styles.checkoutBtn)}
                    onClick={handleStartCheckout}
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCheckingOut && (
          <motion.div
            className={clsx(styles.checkoutOverlay)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCheckingOut(false)}
          >
            <motion.div
              className={clsx(styles.checkoutModal)}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={clsx(styles.checkoutHeader)}>
                <h3>{checkoutSuccess ? 'Order Confirmed!' : 'Fast Checkout'}</h3>
                <button className={clsx(styles.closeBtn)} onClick={() => setIsCheckingOut(false)}>
                  <IoClose size={20} />
                </button>
              </div>

              <div className={clsx(styles.checkoutBody)}>
                {checkoutSuccess ? (
                  <div className={clsx(styles.successBox)}>
                    <IoCheckmarkCircle className={clsx(styles.successIcon)} />
                    <h3
                      style={{
                        fontFamily: 'Oswald',
                        textTransform: 'uppercase',
                        marginBottom: 8,
                      }}
                    >
                      Thank You For Your Order!
                    </h3>
                    <p style={{ color: '#64748b', fontSize: 14 }}>
                      Your package will be carefully packed and shipped via Express Courier.
                      Confirmation sent to your email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFinishCheckout}>
                    <div className={clsx(styles.formGroup)}>
                      <label className={clsx(styles.formLabel)}>Full Name</label>
                      <input
                        type="text"
                        required
                        className={clsx(styles.formInput)}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className={clsx(styles.formGroup)}>
                      <label className={clsx(styles.formLabel)}>Email Address</label>
                      <input
                        type="email"
                        required
                        className={clsx(styles.formInput)}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className={clsx(styles.formGroup)}>
                      <label className={clsx(styles.formLabel)}>Shipping Address</label>
                      <input
                        type="text"
                        required
                        className={clsx(styles.formInput)}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="124 Fashion Ave, New York, NY"
                      />
                    </div>

                    <div className={clsx(styles.paymentOption)}>
                      <input type="radio" checked readOnly id="card-pay" />
                      <label htmlFor="card-pay" style={{ fontSize: 13, fontWeight: 600 }}>
                        💳 Credit Card ({formData.cardNumber})
                      </label>
                    </div>

                    <div className={clsx(styles.formRow)} style={{ marginBottom: 16 }}>
                      <div className={clsx(styles.formGroup)}>
                        <label className={clsx(styles.formLabel)}>Expiry Date</label>
                        <input
                          type="text"
                          required
                          className={clsx(styles.formInput)}
                          defaultValue="12/28"
                        />
                      </div>
                      <div className={clsx(styles.formGroup)}>
                        <label className={clsx(styles.formLabel)}>CVC / CVV</label>
                        <input
                          type="text"
                          required
                          className={clsx(styles.formInput)}
                          defaultValue="893"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={clsx(styles.checkoutBtn)}
                    >
                      Pay ${total.toFixed(2)} & Place Order
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
