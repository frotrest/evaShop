import clsx from 'clsx';
import register from './Register.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/async/userThunk';
import { useDispatch } from 'react-redux';
import Container from '../Container';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    checked: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultInformation = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    checked: false,
  };

  const changeInformation = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { ...dataToSend } = formData;

    dispatch(registerUser(dataToSend));
    setFormData(defaultInformation);
    navigate('/', { replace: true });
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <>
      <section className={clsx(register.registerBox)}>
        <Container className={clsx(register.registerBoxContent)}>
          <div className={clsx(register.headerForm)}>
            <div className={clsx(register.breadcrumb)}>
              <Link to="/" className={clsx(register.breadcrumbItem)}>
                Home
              </Link>
              <span className={clsx(register.separator)}>/</span>
              <span className={clsx(register.breadcrumbItem)}>Create New Customer Account</span>
            </div>
            <h1 className={clsx(register.title)}>Create New Customer Account</h1>
          </div>
          <div className={clsx(register.personalForms)}>
            <div className={clsx(register.personalDataBox)}>
              <div className={clsx(register.personDate)}>
                <h4 className={clsx(register.dateTitle)}>Personal Information</h4>
                <form onSubmit={handleSubmit} className={clsx(register.nameForm)} id="accountForm">
                  <label className={clsx(register.dateNameInputBox)}>
                    <p className={clsx(formData.firstName.length < 1 && register.marker)}>
                      First name
                    </p>
                    <input
                      className={clsx(register.nameInput)}
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      name="firstName"
                      onChange={changeInformation}
                      required
                    />
                  </label>
                  <label className={clsx(register.dateNameInputBox)}>
                    <p className={clsx(formData.lastName.length < 1 && register.marker)}>
                      Last Name
                    </p>
                    <input
                      className={clsx(register.nameInput)}
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      name="lastName"
                      onChange={changeInformation}
                      required
                    />
                  </label>
                  <label className={clsx(register.dateCheckInputBox)}>
                    <input
                      className={clsx(register.checkboxInput)}
                      type="checkbox"
                      name="checked"
                      value={formData.checked}
                      checked={formData.checked}
                      onChange={changeInformation}
                    />
                    Sign Up for Newsletter
                  </label>
                </form>
              </div>

              <div className={clsx(register.accountDate)}>
                <h4 className={clsx(register.dateTitle)}>Sign Up for Newsletter</h4>
                <form onSubmit={handleSubmit} className={clsx(register.emailForm)} id="accountForm">
                  <label className={clsx(register.dateEmailInputBox)}>
                    <p className={clsx(!emailPattern.test(formData.email) && register.marker)}>
                      Email
                    </p>
                    <input
                      className={clsx(register.emailInput)}
                      type="email"
                      placeholder="daisy.watson@example.com"
                      name="email"
                      value={formData.email}
                      onChange={changeInformation}
                      required
                    />
                  </label>
                  <label className={clsx(register.dateEmailPasswordInputBox)}>
                    <p className={clsx(formData.password.length < 5 && register.marker)}>
                      Password{' '}
                    </p>
                    <input
                      className={clsx(register.passwordInput)}
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={changeInformation}
                    />
                  </label>
                  <label className={clsx(register.dateEmailInputBox)}>
                    Confirm Password
                    <input
                      className={clsx(register.passwordInput)}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={changeInformation}
                    />
                  </label>
                </form>
              </div>
            </div>
            <div className={clsx(register.buttonBox)}>
              <button
                disabled={
                  formData.password !== formData.confirmPassword ||
                  formData.password.length < 5 ||
                  formData.firstName.length < 1 ||
                  formData.lastName.length < 1 ||
                  formData.checked !== true ||
                  !emailPattern.test(formData.email)
                    ? true
                    : false
                }
                className={clsx(register.create)}
                form="accountForm"
              >
                create an account
              </button>
              <Link to="/" className={clsx(register.back)}>
                Back
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
