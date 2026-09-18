import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  IoSpeedometerOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoLockClosedOutline,
  IoBagHandleOutline,
  IoLogOutOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';
import { updateUserProfile } from '../../store/async/userThunk';
import { logoutUser } from '../../store/slices/loginSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import styles from './dashBoard.module.css';
import Container from '../../Components/Container';
import { selectCurrentUser } from '../../store/selectors';

const buildUserInfo = (user, prev) => ({
  firstName: user?.firstName || user?.name || prev?.firstName || '',
  lastName: user?.lastName || user?.lastname || prev?.lastName || '',
  email: user?.email || prev?.email || 'member@evashop.com',
});

const getUserSignature = (user) =>
  `${user?.firstName || user?.name || ''}|${user?.lastName || user?.lastname || ''}|${user?.email || ''}|${JSON.stringify(user?.address || '')}|${JSON.stringify(user?.shippingAddress || user?.shipping || '')}`;

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  const [userInfo, setUserInfo] = useState(() => buildUserInfo(currentUser));

  const [addresses, setAddresses] = useState({
    billing: currentUser?.address || null,
    shipping: currentUser?.shippingAddress || currentUser?.shipping || currentUser?.address || null,
  });

  const userSignature = getUserSignature(currentUser);
  const [prevUserSignature, setPrevUserSignature] = useState(userSignature);

  if (currentUser && userSignature !== prevUserSignature) {
    setPrevUserSignature(userSignature);
    setUserInfo((prev) => buildUserInfo(currentUser, prev));
    setAddresses({
      billing: currentUser?.address || null,
      shipping:
        currentUser?.shippingAddress || currentUser?.shipping || currentUser?.address || null,
    });
  }

  const handleUpdateAccount = async (updatedData) => {
    try {
      if (currentUser?.id) {
        await dispatch(updateUserProfile({ userId: currentUser.id, updatedData })).unwrap();
      }
      setUserInfo((prev) => ({ ...prev, ...updatedData }));
      dispatch(
        showNotification({
          message: 'Profile updated successfully',
          severity: 'success',
        }),
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update:', error);
      dispatch(
        showNotification({
          message: 'Failed to update profile',
          severity: 'error',
        }),
      );
    }
  };

  const handleSaveAddress = async (newAddress) => {
    try {
      const updatedData = { address: newAddress };
      if (currentUser?.id) {
        await dispatch(updateUserProfile({ userId: currentUser.id, updatedData })).unwrap();
      }
      setAddresses((prev) => ({
        ...prev,
        billing: newAddress,
        shipping: newAddress,
      }));
      dispatch(
        showNotification({
          message: 'Address saved successfully',
          severity: 'success',
        }),
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save address:', error);
      dispatch(
        showNotification({
          message: 'Failed to save address',
          severity: 'error',
        }),
      );
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(
      showNotification({
        message: 'Signed out successfully',
        severity: 'info',
      }),
    );
    navigate('/');
  };

  const displayName =
    `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim() ||
    currentUser?.name ||
    userInfo.email.split('@')[0] ||
    'Valued Client';

  const userInitials = (
    (userInfo.firstName?.[0] || displayName?.[0] || 'E') + (userInfo.lastName?.[0] || '')
  ).toUpperCase();

  return (
    <div className={clsx(styles.dashboardWrapper)}>
      <Container className={clsx(styles.dashBoardContent)}>
        <nav className={clsx(styles.breadcrumb)}>
          <Link to="/" className={clsx(styles.breadcrumbLink)}>
            Home
          </Link>
          <span className={clsx(styles.breadcrumbDivider)}>/</span>
          <span className={clsx(styles.breadcrumbCurrent)}>Dashboard</span>
        </nav>

        <div className={clsx(styles.userBanner)}>
          <div className={clsx(styles.avatarBadge)}>{userInitials}</div>
          <div className={clsx(styles.bannerInfo)}>
            <div className={clsx(styles.bannerHeaderRow)}>
              <h1 className={clsx(styles.welcomeTitle)}>Welcome, {displayName}</h1>
              <span className={clsx(styles.tierBadge)}>
                <IoShieldCheckmarkOutline size={13} />
                <span>Privé Club Member</span>
              </span>
            </div>
            <p className={clsx(styles.bannerSubtitle)}>
              Manage your personal preferences, orders, delivery addresses, and luxury security
              settings.
            </p>
          </div>
        </div>

        <div className={clsx(styles.dashboardLayout)}>
          <aside className={clsx(styles.sidebar)}>
            <div className={clsx(styles.sidebarNavGroup)}>
              <div className={clsx(styles.sidebarSectionHeading)}>Account Navigation</div>
              <nav className={clsx(styles.sidebarList)}>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    clsx(styles.sidebarItem, {
                      [styles.sidebarItemActive]: isActive,
                    })
                  }
                >
                  <IoSpeedometerOutline size={18} className={clsx(styles.sidebarIcon)} />
                  <span>Account Dashboard</span>
                </NavLink>

                <NavLink
                  to="account"
                  className={({ isActive }) =>
                    clsx(styles.sidebarItem, {
                      [styles.sidebarItemActive]: isActive,
                    })
                  }
                >
                  <IoPersonOutline size={18} className={clsx(styles.sidebarIcon)} />
                  <span>Account Information</span>
                </NavLink>

                <NavLink
                  to="address"
                  className={({ isActive }) =>
                    clsx(styles.sidebarItem, {
                      [styles.sidebarItemActive]: isActive,
                    })
                  }
                >
                  <IoLocationOutline size={18} className={clsx(styles.sidebarIcon)} />
                  <span>Address Book</span>
                </NavLink>

                <NavLink
                  to="password"
                  className={({ isActive }) =>
                    clsx(styles.sidebarItem, {
                      [styles.sidebarItemActive]: isActive,
                    })
                  }
                >
                  <IoLockClosedOutline size={18} className={clsx(styles.sidebarIcon)} />
                  <span>Security & Password</span>
                </NavLink>
              </nav>
            </div>

            <div className={clsx(styles.sidebarNavGroup, styles.sidebarDividerGroup)}>
              <div className={clsx(styles.sidebarSectionHeading)}>Quick Access</div>
              <nav className={clsx(styles.sidebarList)}>
                <Link to="/catalog" className={clsx(styles.sidebarItem)}>
                  <IoBagHandleOutline size={18} className={clsx(styles.sidebarIcon)} />
                  <span>Explore Collection</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className={clsx(styles.sidebarItem, styles.sidebarLogoutBtn)}
                >
                  <IoLogOutOutline size={18} className={clsx(styles.sidebarIcon)} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </aside>

          <section className={clsx(styles.contentArea)}>
            <Outlet
              context={{
                userInfo,
                addresses,
                handleUpdateAccount,
                handleSaveAddress,
                currentUser,
                dispatch,
                updateUserProfile,
              }}
            />
          </section>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
