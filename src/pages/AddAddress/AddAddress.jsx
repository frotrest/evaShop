import { useState } from 'react';
import clsx from 'clsx';
import { IoLocationOutline } from 'react-icons/io5';
import styles from './addAdress.module.css';

const AddAddress = ({ initialData, onSave, onCancel }) => {
  const safeInitialData = initialData || {};

  const [addressForm, setAddressForm] = useState({
    street: safeInitialData.street || '',
    city: safeInitialData.city || '',
    state: safeInitialData.state || '',
    zip: safeInitialData.zip || '',
    country: safeInitialData.country || '',
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
      <div className={clsx(styles.cardHeader)}>
        <div className={clsx(styles.cardTitleBox)}>
          <IoLocationOutline size={18} className={clsx(styles.headerIcon)} />
          <h2 className={clsx(styles.title)}>
            {safeInitialData.street ? 'Edit Address' : 'Add New Address'}
          </h2>
        </div>
      </div>

      <p className={clsx(styles.subtitle)}>
        Please provide the delivery address details for prompt and secure parcel dispatch.
      </p>

      <form onSubmit={handleSubmit} className={clsx(styles.form)}>
        <div className={clsx(styles.formGroup, styles.fullWidth)}>
          <label className={clsx(styles.label)}>
            Street Address <span className={clsx(styles.required)}>*</span>
          </label>
          <input
            type="text"
            name="street"
            value={addressForm.street}
            onChange={handleChange}
            required
            placeholder="House/Apartment number, street name"
            className={clsx(styles.input)}
          />
        </div>

        <div className={clsx(styles.formGroup)}>
          <label className={clsx(styles.label)}>
            City <span className={clsx(styles.required)}>*</span>
          </label>
          <input
            type="text"
            name="city"
            value={addressForm.city}
            onChange={handleChange}
            required
            placeholder="City / Town"
            className={clsx(styles.input)}
          />
        </div>

        <div className={clsx(styles.formGroup)}>
          <label className={clsx(styles.label)}>
            State / Province <span className={clsx(styles.required)}>*</span>
          </label>
          <input
            type="text"
            name="state"
            value={addressForm.state}
            onChange={handleChange}
            required
            placeholder="State / Region"
            className={clsx(styles.input)}
          />
        </div>

        <div className={clsx(styles.formGroup)}>
          <label className={clsx(styles.label)}>
            Postal / Zip Code <span className={clsx(styles.required)}>*</span>
          </label>
          <input
            type="text"
            name="zip"
            value={addressForm.zip}
            onChange={handleChange}
            required
            placeholder="Postal / Zip code"
            className={clsx(styles.input)}
          />
        </div>

        <div className={clsx(styles.formGroup)}>
          <label className={clsx(styles.label)}>
            Country <span className={clsx(styles.required)}>*</span>
          </label>
          <input
            type="text"
            name="country"
            value={addressForm.country}
            onChange={handleChange}
            required
            placeholder="Country"
            className={clsx(styles.input)}
          />
        </div>

        <div className={clsx(styles.formActions)}>
          <button type="submit" className={clsx(styles.btn, styles.saveBtn)}>
            Save Address
          </button>
          <button onClick={onCancel} className={clsx(styles.btn, styles.cancelBtn)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
