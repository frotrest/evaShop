import React, { useState } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import EditAccount from '../../Components/EditAccount/EditAccount.jsx';
import AddAddress from '../AddAddress/AddAddress';
import { showNotification } from '../../store/slices/notificationSlice.js';
import styles from './dashBoard.module.css';

const DashboardTab = () => {
  const {
    userInfo,
    addresses,
    handleUpdateAccount,
    handleSaveAddress,
    currentUser,
    dispatch: contextDispatch,
    updateUserProfile,
  } = useOutletContext();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      dispatch(showNotification({ message: 'Passwords do not match!', severity: 'error' }));
      return;
    }

    try {
      if (currentUser?.id) {
        await contextDispatch(
          updateUserProfile({
            userId: currentUser.id,
            updatedData: { password: passwordForm.newPassword },
          }),
        ).unwrap();

        dispatch(
          showNotification({ message: 'Password successfully changed!', severity: 'success' }),
        );
        setPasswordForm({ newPassword: '', confirmPassword: '' });

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        dispatch(showNotification({ message: 'User ID not found', severity: 'error' }));
      }
    } catch (error) {
      console.error('Failed to change password:', error);
      dispatch(showNotification({ message: 'Error changing password', severity: 'error' }));
    }
  };

  if (location.pathname.endsWith('/account')) {
    return (
      <EditAccount
        initialData={userInfo}
        onSave={handleUpdateAccount}
        onCancel={() => navigate('/dashboard')}
      />
    );
  }

  if (location.pathname.endsWith('/address')) {
    return (
      <AddAddress
        initialData={addresses.billing}
        onSave={handleSaveAddress}
        onCancel={() => navigate('/dashboard')}
      />
    );
  }

  if (location.pathname.endsWith('/password')) {
    return (
      <main className={clsx(styles.content)}>
        <div className={clsx(styles.card, styles.cardPassword)}>
          <h2 className={clsx(styles.contentTitle)}>Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className={clsx(styles.form)}>
            <div className={clsx(styles.formGroup)}>
              <label className={clsx(styles.label)}>New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
                className={clsx(styles.input)}
              />
            </div>
            <div className={clsx(styles.formGroup)}>
              <label className={clsx(styles.label)}>Confirm Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                required
                className={clsx(styles.input)}
              />
            </div>
            <div className={clsx(styles.formActions)}>
              <button type="submit" className={clsx(styles.btn)}>
                Save
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className={clsx(styles.btn)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return null;
};

export default DashboardTab;
