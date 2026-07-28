import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './addAdress.module.css';

const AddAddress = ({ initialData = {}, onSave, onCancel }) => {
  const [addressForm, setAddressForm] = useState({
    street: initialData.street || '',
    city: initialData.city || '',
    state: initialData.state || '',
    zip: initialData.zip || '',
    country: initialData.country || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(addressForm);
  };

  return (
    <div className={clsx(styles.container)}>
      <h2 className={clsx(styles.title)}>
        {initialData?.street ? 'Edit Address' : 'Add New Address'}
      </h2>
      <form onSubmit={handleSubmit} className={clsx(styles.form)}>
        <div className={clsx(styles.formGroup)}>
          <label className={clsx(styles.label)}>Street</label>
          <input
            type="text"
            name="street"
            value={addressForm.street}
            onChange={handleChange}
            required
            className={clsx(styles.input)}
          />
        </div>

        <div className={clsx(styles.formGroup)}>
          <label className={clsx(styles.label)}>City</label>
          <input
            type="text"
            name="city"
            value={addressForm.city}
            onChange={handleChange}
            required
            className={clsx(styles.input)}
          />
        </div>

        <div className={clsx(styles.formGroup)}>
          <label className={clsx(styles.label)}>State</label>
          <input
            type="text"
            name="state"
            value={addressForm.state}
            onChange={handleChange}
            required
            className={clsx(styles.input)}
          />
        </div>

        <div className={clsx(styles.formGroup)}>
          <label className={clsx(styles.label)}>Zip Code</label>
          <input
            type="text"
            name="zip"
            value={addressForm.zip}
            onChange={handleChange}
            required
            className={clsx(styles.input)}
          />
        </div>

        <div className={clsx(styles.formGroup)}>
          <label className={clsx(styles.label)}>Country</label>
          <input
            type="text"
            name="country"
            value={addressForm.country}
            onChange={handleChange}
            required
            className={clsx(styles.input)}
          />
        </div>

        <div className={clsx(styles.formActions)}>
          <button type="submit" className={clsx(styles.btn)}>
            Save Address
          </button>
          <button type="button" onClick={onCancel} className={clsx(styles.btn)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
