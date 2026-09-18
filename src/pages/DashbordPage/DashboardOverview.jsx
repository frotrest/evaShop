import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  IoPersonOutline,
  IoLocationOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoShieldCheckmarkOutline,
  IoCreateOutline,
  IoKeyOutline,
  IoArrowForwardOutline,
  IoSparklesOutline,
  IoRibbonOutline,
} from 'react-icons/io5';
import styles from './dashBoard.module.css';

const DashboardOverview = () => {
  const { userInfo, addresses } = useOutletContext();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const displayName =
    `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim() ||
    userInfo.name ||
    userInfo.email.split('@')[0] ||
    'Member';

  const billingText = addresses.billing
    ? [
        addresses.billing.street,
        addresses.billing.city,
        addresses.billing.state,
        addresses.billing.zip,
        addresses.billing.country,
      ]
        .filter(Boolean)
        .join(', ')
    : null;

  const shippingText = addresses.shipping
    ? [
        addresses.shipping.street,
        addresses.shipping.city,
        addresses.shipping.state,
        addresses.shipping.zip,
        addresses.shipping.country,
      ]
        .filter(Boolean)
        .join(', ')
    : null;

  return (
    <main className={clsx(styles.overviewContainer)}>
      <div className={clsx(styles.metricsGrid)}>
        <div className={clsx(styles.metricCard)}>
          <div className={clsx(styles.metricIconBox)}>
            <IoRibbonOutline size={20} />
          </div>
          <div className={clsx(styles.metricData)}>
            <span className={clsx(styles.metricLabel)}>Privé Status</span>
            <span className={clsx(styles.metricValue)}>Tier I VIP</span>
          </div>
        </div>

        <div className={clsx(styles.metricCard)}>
          <div className={clsx(styles.metricIconBox)}>
            <IoBagCheckOutline size={20} />
          </div>
          <div className={clsx(styles.metricData)}>
            <span className={clsx(styles.metricLabel)}>Shopping Bag</span>
            <span className={clsx(styles.metricValue)}>
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>

        <div className={clsx(styles.metricCard)}>
          <div className={clsx(styles.metricIconBox)}>
            <IoHeartOutline size={20} />
          </div>
          <div className={clsx(styles.metricData)}>
            <span className={clsx(styles.metricLabel)}>Saved Items</span>
            <span className={clsx(styles.metricValue)}>
              {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>

        <div className={clsx(styles.metricCard)}>
          <div className={clsx(styles.metricIconBox)}>
            <IoLocationOutline size={20} />
          </div>
          <div className={clsx(styles.metricData)}>
            <span className={clsx(styles.metricLabel)}>Saved Addresses</span>
            <span className={clsx(styles.metricValue)}>
              {addresses.billing || addresses.shipping ? 'Active' : 'Not set'}
            </span>
          </div>
        </div>
      </div>

      <div className={clsx(styles.cardsGrid)}>
        <div className={clsx(styles.luxuryCard)}>
          <div className={clsx(styles.cardHeader)}>
            <div className={clsx(styles.cardTitleBox)}>
              <IoPersonOutline size={18} className={clsx(styles.cardHeaderIcon)} />
              <h3 className={clsx(styles.cardTitle)}>Contact Information</h3>
            </div>
            <span className={clsx(styles.verifiedBadge)}>
              <IoShieldCheckmarkOutline size={12} />
              <span>Verified</span>
            </span>
          </div>

          <div className={clsx(styles.cardBody)}>
            <div className={clsx(styles.infoRow)}>
              <span className={clsx(styles.infoFieldLabel)}>Full Name:</span>
              <span className={clsx(styles.infoFieldValue)}>{displayName}</span>
            </div>
            <div className={clsx(styles.infoRow)}>
              <span className={clsx(styles.infoFieldLabel)}>Email Address:</span>
              <span className={clsx(styles.infoFieldValue)}>{userInfo.email}</span>
            </div>
            <div className={clsx(styles.infoRow)}>
              <span className={clsx(styles.infoFieldLabel)}>Account Tier:</span>
              <span className={clsx(styles.infoFieldValue)}>EvaShop Privé Club</span>
            </div>
          </div>

          <div className={clsx(styles.cardActions)}>
            <button
              className={clsx(styles.btn, styles.btnPrimary)}
              onClick={() => navigate('account')}
            >
              <IoCreateOutline size={15} />
              <span>Edit Profile</span>
            </button>
            <button
              className={clsx(styles.btn, styles.btnSecondary)}
              onClick={() => navigate('password')}
            >
              <IoKeyOutline size={15} />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        <div className={clsx(styles.luxuryCard)}>
          <div className={clsx(styles.cardHeader)}>
            <div className={clsx(styles.cardTitleBox)}>
              <IoLocationOutline size={18} className={clsx(styles.cardHeaderIcon)} />
              <h3 className={clsx(styles.cardTitle)}>Primary Billing Address</h3>
            </div>
          </div>

          <div className={clsx(styles.cardBody)}>
            {billingText ? (
              <p className={clsx(styles.addressText)}>{billingText}</p>
            ) : (
              <p className={clsx(styles.emptyText)}>
                No billing address currently registered. Add your address to accelerate checkout.
              </p>
            )}
          </div>

          <div className={clsx(styles.cardActions)}>
            <button
              className={clsx(styles.btn, billingText ? styles.btnSecondary : styles.btnPrimary)}
              onClick={() => navigate('address')}
            >
              <IoCreateOutline size={15} />
              <span>{billingText ? 'Edit Address' : 'Add Address'}</span>
            </button>
          </div>
        </div>

        <div className={clsx(styles.luxuryCard)}>
          <div className={clsx(styles.cardHeader)}>
            <div className={clsx(styles.cardTitleBox)}>
              <IoLocationOutline size={18} className={clsx(styles.cardHeaderIcon)} />
              <h3 className={clsx(styles.cardTitle)}>Default Shipping Address</h3>
            </div>
          </div>

          <div className={clsx(styles.cardBody)}>
            {shippingText ? (
              <p className={clsx(styles.addressText)}>{shippingText}</p>
            ) : (
              <p className={clsx(styles.emptyText)}>
                No shipping address configured. Provide your destination for seamless luxury
                dispatch.
              </p>
            )}
          </div>

          <div className={clsx(styles.cardActions)}>
            <button
              className={clsx(styles.btn, shippingText ? styles.btnSecondary : styles.btnPrimary)}
              onClick={() => navigate('address')}
            >
              <IoCreateOutline size={15} />
              <span>{shippingText ? 'Edit Shipping' : 'Set Shipping'}</span>
            </button>
          </div>
        </div>

        <div className={clsx(styles.luxuryCard, styles.conciergeCard)}>
          <div className={clsx(styles.cardHeader)}>
            <div className={clsx(styles.cardTitleBox)}>
              <IoSparklesOutline size={18} className={clsx(styles.cardHeaderIcon)} />
              <h3 className={clsx(styles.cardTitle)}>Privé Concierge & Benefits</h3>
            </div>
          </div>

          <div className={clsx(styles.cardBody)}>
            <ul className={clsx(styles.perksList)}>
              <li>Complimentary insured courier delivery on all orders</li>
              <li>Dedicated 24/7 personal styling advice and sizing support</li>
              <li>30-day effortless returns with doorstep collection</li>
            </ul>
          </div>

          <div className={clsx(styles.cardActions)}>
            <Link to="/catalog" className={clsx(styles.conciergeLink)}>
              <span>Explore New Arrivals</span>
              <IoArrowForwardOutline size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardOverview;
