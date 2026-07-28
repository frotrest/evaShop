import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { updateUserProfile } from '../../store/async/userThunk';
import styles from './dashBoard.module.css';
import Container from '../../Components/Container';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../store/selectors';

const buildUserInfo = (user, prev) => ({
  firstName: user?.firstName || user?.name || prev?.firstName || '',
  lastName: user?.lastName || user?.lastname || prev?.lastName || '',
  email: user?.email || prev?.email || 'ExampeAdress@gmail.com',
});

const getUserSignature = (user) =>
  `${user?.firstName || user?.name || ''}|${user?.lastName || user?.lastname || ''}|${user?.email || ''}`;

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  const [userInfo, setUserInfo] = useState(() => buildUserInfo(currentUser));

  const userSignature = getUserSignature(currentUser);
  const [prevUserSignature, setPrevUserSignature] = useState(userSignature);

  if (currentUser && userSignature !== prevUserSignature) {
    setPrevUserSignature(userSignature);
    setUserInfo((prev) => buildUserInfo(currentUser, prev));
  }

  const [addresses, setAddresses] = useState({
    billing: currentUser?.address || null,
    shipping: currentUser?.shippingAddress || null,
  });

  const handleUpdateAccount = async (updatedData) => {
    try {
      if (currentUser.id) {
        await dispatch(updateUserProfile({ userId: currentUser.id, updatedData })).unwrap();
      }
      setUserInfo((prev) => ({ ...prev, ...updatedData }));
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  const handleSaveAddress = async (newAddress) => {
    try {
      const updatedData = { address: newAddress };
      if (currentUser.id) {
        await dispatch(updateUserProfile({ userId: currentUser.id, updatedData })).unwrap();
      }
      setAddresses((prev) => ({ ...prev, billing: newAddress, shipping: newAddress }));
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  return (
    <div className={clsx(styles.dashboardWrapper)}>
      <Container className={clsx(styles.dashBoardContent)}>
        <ul className={clsx(styles.navBarLinks)}>
          <li className={clsx(styles.navBarItem)}>
            <Link to="/" className={clsx(styles.navBarItemLink)}>
              Home
            </Link>
          </li>
          <li className={clsx(styles.navBarItem)}>
            <span className={clsx(styles.navBarItemLink)}>DashBoard</span>
          </li>
        </ul>
        <h1 className={clsx(styles.pageTitle)}>My Dashboard</h1>

        <div className={clsx(styles.dashboardLayout)}>
          <aside className={clsx(styles.sidebar)}>
            <nav className={clsx(styles.sidebarList)}>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  clsx(styles.sidebarItem, { [styles.sidebarItemActive]: isActive })
                }
              >
                Account Dashboard
              </NavLink>

              <NavLink
                to="account"
                className={({ isActive }) =>
                  clsx(styles.sidebarItem, { [styles.sidebarItemActive]: isActive })
                }
              >
                Account Information
              </NavLink>

              <NavLink
                to="address"
                className={({ isActive }) =>
                  clsx(styles.sidebarItem, { [styles.sidebarItemActive]: isActive })
                }
              >
                Address Book
              </NavLink>
            </nav>
          </aside>

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
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
