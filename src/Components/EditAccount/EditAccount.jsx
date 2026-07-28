import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './EditAccount.module.css';

const buildFormData = (data) => ({
  firstName: data.firstName || data.name || '',
  lastName: data.lastName || data.lastname || '',
  changeEmail: false,
  changePassword: false,
  email: data.email || '',
  password: '',
});

const getDataSignature = (data) =>
  `${data?.firstName || data.name || ''}|${data?.lastName || data.lastname || ''}|${data.email || ''}`;

const EditAccount = ({ initialData = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState(() => buildFormData(initialData));

  const dataSignature = getDataSignature(initialData);
  const [prevSignature, setPrevSignature] = useState(dataSignature);

  if (dataSignature !== prevSignature) {
    setPrevSignature(dataSignature);
    setFormData(buildFormData(initialData));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    if (formData.changeEmail && formData.email) {
      updatedData.email = formData.email;
    }

    if (formData.changePassword && formData.password) {
      updatedData.password = formData.password;
    }

    if (onSave) {
      onSave(updatedData);
    }
  };

  return (
    <form className={clsx(styles.accountForm)} onSubmit={handleSubmit}>
      <h1 className={clsx(styles.title)}>Account Information</h1>

      <label className={clsx(styles.label)}>
        First name <span>*</span>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className={clsx(styles.input)}
        />
      </label>

      <label className={clsx(styles.label)}>
        Last name <span>*</span>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className={clsx(styles.input)}
        />
      </label>
      <div className={clsx(styles.checkboxes)}>
        <label className={clsx(styles.checkboxLabel)}>
          <input
            type="checkbox"
            name="changeEmail"
            checked={formData.changeEmail}
            onChange={handleCheckbox}
            className={clsx(styles.checkbox)}
          />
          Change Email
        </label>

        {formData.changeEmail && (
          <div className={clsx(styles.formGroup)}>
            <label className={clsx(styles.label)}>
              New Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={clsx(styles.input)}
              />
            </label>
          </div>
        )}

        <label className={clsx(styles.checkboxLabel)}>
          <input
            type="checkbox"
            name="changePassword"
            checked={formData.changePassword}
            onChange={handleCheckbox}
            className={clsx(styles.checkbox)}
          />
          Change Password
        </label>

        {formData.changePassword && (
          <label className={clsx(styles.label)}>
            New Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={clsx(styles.input)}
            />
          </label>
        )}
      </div>
      <div className={clsx(styles.editBtns)}>
        <button type="submit" className={clsx(styles.saveBtn)}>
          SAVE
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={clsx(styles.saveBtn, styles.cancelBtn)}
          >
            CANCEL
          </button>
        )}
      </div>
    </form>
  );
};

export default EditAccount;
