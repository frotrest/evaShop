import { useState } from 'react';
import clsx from 'clsx';
import { IoPersonOutline, IoCheckmarkOutline } from 'react-icons/io5';
import styles from './EditAccount.module.css';

const buildFormData = (data) => ({
  firstName: data?.firstName || data?.name || '',
  lastName: data?.lastName || data?.lastname || '',
  changeEmail: false,
  changePassword: false,
  email: data?.email || '',
  password: '',
});

const getDataSignature = (data) =>
  `${data?.firstName || data?.name || ''}|${data?.lastName || data?.lastname || ''}|${data?.email || ''}`;

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
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.cardHeader)}>
        <div className={clsx(styles.cardTitleBox)}>
          <IoPersonOutline size={18} className={clsx(styles.headerIcon)} />
          <h2 className={clsx(styles.title)}>Edit Account Information</h2>
        </div>
      </div>

      <p className={clsx(styles.subtitle)}>
        Update your personal details below. Required fields are marked with an asterisk (*).
      </p>

      <form className={clsx(styles.accountForm)} onSubmit={handleSubmit}>
        <div className={clsx(styles.gridTwoCols)}>
          <div className={clsx(styles.formGroup)}>
            <label className={clsx(styles.label)}>
              First Name <span className={clsx(styles.required)}>*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Your first name"
              className={clsx(styles.input)}
            />
          </div>

          <div className={clsx(styles.formGroup)}>
            <label className={clsx(styles.label)}>
              Last Name <span className={clsx(styles.required)}>*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Your last name"
              className={clsx(styles.input)}
            />
          </div>
        </div>

        <div className={clsx(styles.optionsSection)}>
          <label className={clsx(styles.customCheckboxRow)}>
            <input
              type="checkbox"
              name="changeEmail"
              checked={formData.changeEmail}
              onChange={handleCheckbox}
              className={clsx(styles.nativeCheckbox)}
            />
            <span className={clsx(styles.customBox)}>
              {formData.changeEmail && <IoCheckmarkOutline size={13} color="#ffffff" />}
            </span>
            <span className={clsx(styles.checkboxText)}>Update Email Address</span>
          </label>

          {formData.changeEmail && (
            <div className={clsx(styles.nestedField)}>
              <label className={clsx(styles.label)}>
                New Email Address <span className={clsx(styles.required)}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="new.email@example.com"
                className={clsx(styles.input)}
              />
            </div>
          )}

          <label className={clsx(styles.customCheckboxRow)}>
            <input
              type="checkbox"
              name="changePassword"
              checked={formData.changePassword}
              onChange={handleCheckbox}
              className={clsx(styles.nativeCheckbox)}
            />
            <span className={clsx(styles.customBox)}>
              {formData.changePassword && <IoCheckmarkOutline size={13} color="#ffffff" />}
            </span>
            <span className={clsx(styles.checkboxText)}>Change Account Password</span>
          </label>

          {formData.changePassword && (
            <div className={clsx(styles.nestedField)}>
              <label className={clsx(styles.label)}>
                New Password <span className={clsx(styles.required)}>*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Minimum 6 characters"
                className={clsx(styles.input)}
              />
            </div>
          )}
        </div>

        <div className={clsx(styles.editBtns)}>
          <button type="submit" className={clsx(styles.btn, styles.saveBtn)}>
            Save Changes
          </button>
          {onCancel && (
            <button onClick={onCancel} className={clsx(styles.btn, styles.cancelBtn)}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditAccount;
