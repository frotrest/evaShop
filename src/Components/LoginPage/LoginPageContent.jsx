import { useCallback, useState } from 'react';
import styles from './loginPage.module.css';
import clsx from 'clsx';
import Container from '../Container';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { singUpUser } from '../../store/async/userThunk';
import { showNotification } from '../../store/slices/notificationSlice';
import { IoEyeOutline, IoEyeOffOutline, IoArrowForwardOutline } from 'react-icons/io5';

const LoginMain = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = useCallback((event) => {
    const { name, type, checked, value } = event.target;
    if (name === 'email') {
      setEmail(value);
      setErrors((prev) => ({ ...prev, email: '' }));
    }
    if (name === 'password') {
      setPassword(value);
      setErrors((prev) => ({ ...prev, password: '' }));
    }
    if (name === 'agree') {
      setAgree(type === 'checkbox' ? checked : value);
      setErrors((prev) => ({ ...prev, agree: '' }));
    }
  }, []);

  const formValidation = useCallback((emailVal, passwordVal, agreeVal) => {
    const errs = {};
    if (!emailVal || !emailVal.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!passwordVal) {
      errs.password = 'Password is required';
    } else if (passwordVal.length < 4) {
      errs.password = 'Password must be at least 4 characters';
    }

    if (!agreeVal) {
      errs.agree = 'You must accept the terms of service';
    }
    return errs;
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const validationErrors = formValidation(email, password, agree);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        try {
          const resultAction = await dispatch(singUpUser({ email: email.trim(), password }));

          if (singUpUser.fulfilled.match(resultAction)) {
            setEmail('');
            setPassword('');
            dispatch(
              showNotification({
                severity: 'success',
                message: 'Welcome back! Signed in successfully.',
              }),
            );
            navigate('/', { replace: true });
          } else {
            dispatch(
              showNotification({
                severity: 'error',
                message: resultAction.payload || 'Invalid email or password. Please try again.',
              }),
            );
          }
        } catch (error) {
          console.error('Login error:', error);
          dispatch(
            showNotification({
              severity: 'error',
              message: 'Authentication failed. Please check your credentials.',
            }),
          );
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [email, password, agree, formValidation, dispatch, navigate],
  );

  return (
    <section className={clsx(styles.loginPage)}>
      <Container className={clsx(styles.loginPageContent)}>
        <nav className={clsx(styles.breadcrumb)}>
          <Link to="/" className={clsx(styles.breadcrumbItem)}>
            Home
          </Link>
          <span className={clsx(styles.separator)}>/</span>
          <span className={clsx(styles.breadcrumbActive)}>Sign In</span>
        </nav>

        <div className={clsx(styles.cardWrapper)}>
          <div className={clsx(styles.cardHeader)}>
            <span className={clsx(styles.cardSubhead)}>EVA STUDIO PRIVÉ</span>
            <h1 className={clsx(styles.loginTitle)}>SIGN IN TO YOUR ACCOUNT</h1>
            <p className={clsx(styles.loginSubtitle)}>
              Access your personalized edits, saved wishlist items, and order history.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={clsx(styles.formContent)} noValidate>
            <div className={clsx(styles.formField)}>
              <label htmlFor="emailField" className={clsx(styles.formFieldLabel)}>
                Email Address <span className={clsx(styles.requiredStar)}>*</span>
              </label>
              <div className={clsx(styles.inputBlock)}>
                <input
                  type="email"
                  id="emailField"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className={clsx(
                    styles.formFieldInput,
                    errors.email && styles.formFieldInputError,
                  )}
                  placeholder="name@example.com"
                  autoComplete="email"
                />
                {errors.email && <p className={clsx(styles.errorText)}>{errors.email}</p>}
              </div>
            </div>

            <div className={clsx(styles.formField)}>
              <div className={clsx(styles.passwordLabelRow)}>
                <label htmlFor="passwordField" className={clsx(styles.formFieldLabel)}>
                  Password <span className={clsx(styles.requiredStar)}>*</span>
                </label>
              </div>
              <div className={clsx(styles.inputBlock)}>
                <div className={clsx(styles.passwordInputWrapper)}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="passwordField"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className={clsx(
                      styles.formFieldInput,
                      styles.passwordFieldInput,
                      errors.password && styles.formFieldInputError,
                    )}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    className={clsx(styles.passwordToggleBtn)}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                  </button>
                </div>
                {errors.password && <p className={clsx(styles.errorText)}>{errors.password}</p>}
              </div>
            </div>

            <div className={clsx(styles.formCheckbox)}>
              <input
                type="checkbox"
                id="agreeCheckbox"
                name="agree"
                checked={agree}
                onChange={handleChange}
                className={clsx(
                  styles.formCheckboxInput,
                  errors.agree && styles.formCheckboxInputError,
                )}
              />
              <label htmlFor="agreeCheckbox" className={clsx(styles.formCheckboxLabel)}>
                I agree to the storage and handling of my data in accordance with the Privacy
                Policy.
              </label>
            </div>
            {errors.agree && <p className={clsx(styles.errorText)}>{errors.agree}</p>}

            <div className={clsx(styles.formActions)}>
              <button type="submit" className={clsx(styles.formBtnSubmit)} disabled={isSubmitting}>
                {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
              </button>

              <div className={clsx(styles.divider)}>
                <span className={clsx(styles.dividerText)}>NEW TO EVASHOP?</span>
              </div>

              <Link to="/register" className={clsx(styles.formBtnRegister)}>
                <span>CREATE AN ACCOUNT</span>
                <IoArrowForwardOutline size={16} />
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default LoginMain;
