import React, { useState } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
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
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      dispatch(
        showNotification({
          message: 'Passwords do not match!',
          severity: 'error',
        }),
      );
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      dispatch(
        showNotification({
          message: 'Password must be at least 6 characters long',
          severity: 'error',
        }),
      );
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
          showNotification({
            message: 'Password successfully updated!',
            severity: 'success',
          }),
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
      dispatch(
        showNotification({
          message: 'Error changing password',
          severity: 'error',
        }),
      );
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
      <main className={clsx(styles.overviewContainer)}>
        <div className={clsx(styles.luxuryCard, styles.formCard)}>
          <div className={clsx(styles.cardHeader)}>
            <div className={clsx(styles.cardTitleBox)}>
              <IoLockClosedOutline size={18} className={clsx(styles.cardHeaderIcon)} />
              <h3 className={clsx(styles.cardTitle)}>Security & Password</h3>
            </div>
          </div>

          <p className={clsx(styles.cardSubtitle)}>
            Choose a strong password with at least 6 characters to protect your account.
          </p>

          <form onSubmit={handlePasswordSubmit} className={clsx(styles.form)}>
            <div className={clsx(styles.formGroup)}>
              <label className={clsx(styles.formLabel)}>New Password</label>
              <div className={clsx(styles.inputPasswordWrapper)}>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  required
                  placeholder="Enter new password"
                  className={clsx(styles.input)}
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className={clsx(styles.eyeBtn)}
                  tabIndex={-1}
                >
                  {showNewPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button>
              </div>
            </div>

            <div className={clsx(styles.formGroup)}>
              <label className={clsx(styles.formLabel)}>Confirm New Password</label>
              <div className={clsx(styles.inputPasswordWrapper)}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  placeholder="Confirm new password"
                  className={clsx(styles.input)}
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={clsx(styles.eyeBtn)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button>
              </div>
            </div>

            <div className={clsx(styles.formActions)}>
              <button type="submit" className={clsx(styles.btn, styles.btnPrimary)}>
                Update Password
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className={clsx(styles.btn, styles.btnSecondary)}
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
