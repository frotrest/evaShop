import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './dashBoard.module.css';

const DashboardOverview = () => {
  const { userInfo, addresses } = useOutletContext();
  const navigate = useNavigate();

  return (
    <main className={clsx(styles.content)}>
      <h2 className={clsx(styles.contentTitle)}>Account Information</h2>
      <div className={clsx(styles.contentFlex)}>
        <div className={clsx(styles.card)}>
          <div className={clsx(styles.contentDescription)}>
            <h2 className={clsx(styles.contentContact)}>Contact Information</h2>
            <div className={clsx(styles.contactInformation)}>
              <p className={clsx(styles.contentText)}>{userInfo.name}</p>
              <p className={clsx(styles.contentText)}>{userInfo.email}</p>
            </div>
          </div>
          <div className={clsx(styles.contactBtns)}>
            <button className={clsx(styles.btn)} onClick={() => navigate('account')}>
              Edit
            </button>
            <button className={clsx(styles.btn)} onClick={() => navigate('password')}>
              Change password
            </button>
          </div>
        </div>

        <div className={clsx(styles.card)}>
          <h2 className={clsx(styles.contentTitle)}>Address Book</h2>
          <p className={clsx(styles.contentText)}>
            {addresses.billing
              ? `${addresses.billing.street || ''}, ${addresses.billing.city || ''}`
              : 'You have not set a default address.'}
          </p>
          <button className={clsx(styles.btn)} onClick={() => navigate('address')}>
            {addresses.billing ? 'Edit Address' : 'Add Address'}
          </button>
        </div>

        <div className={clsx(styles.card)}>
          <h2 className={clsx(styles.contentTitle)}>Default Shipping Address</h2>
          <p className={clsx(styles.contentText)}>
            {addresses.shipping
              ? `${addresses.shipping.street || ''}, ${addresses.shipping.city || ''}`
              : 'You have not set a default shipping address.'}
          </p>
          <button className={clsx(styles.btn)} onClick={() => navigate('address')}>
            {addresses.shipping ? 'Edit' : 'Set Shipping Address'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default DashboardOverview;
