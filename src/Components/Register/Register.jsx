import clsx from 'clsx';
import registerStyles from './Register.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/async/userThunk';
import { showNotification } from '../../store/slices/notificationSlice';
import { useDispatch } from 'react-redux';
import Container from '../Container';
import { IoEyeOutline, IoEyeOffOutline, IoArrowForwardOutline } from 'react-icons/io5';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
    newsletter: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeInformation = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) {
      errs.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      errs.lastName = 'Last name is required';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailPattern.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 5) {
      errs.password = 'Password must be at least 5 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must accept the terms of service';
    }

    return errs;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const dataToSend = {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          checked: formData.newsletter,
        };

        const resultAction = await dispatch(registerUser(dataToSend));
        if (registerUser.fulfilled.match(resultAction)) {
          dispatch(
            showNotification({
              severity: 'success',
              message: 'Account created successfully! Welcome to EvaShop.',
            }),
          );
          navigate('/', { replace: true });
        } else {
          dispatch(
            showNotification({
              severity: 'error',
              message: resultAction.payload || 'Failed to create account. Please try again.',
            }),
          );
        }
      } catch (error) {
        console.error('Registration error:', error);
        dispatch(
          showNotification({
            severity: 'error',
            message: 'An error occurred during registration.',
          }),
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className={clsx(registerStyles.registerBox)}>
      <Container className={clsx(registerStyles.registerBoxContent)}>
        <nav className={clsx(registerStyles.breadcrumb)}>
          <Link to="/" className={clsx(registerStyles.breadcrumbItem)}>
            Home
          </Link>
          <span className={clsx(registerStyles.separator)}>/</span>
          <span className={clsx(registerStyles.breadcrumbActive)}>Create Account</span>
        </nav>

        <div className={clsx(registerStyles.cardWrapper)}>
          <div className={clsx(registerStyles.cardHeader)}>
            <span className={clsx(registerStyles.cardSubhead)}>EVA SHOP PRIVÉ</span>
            <h1 className={clsx(registerStyles.title)}>CREATE YOUR ACCOUNT</h1>
            <p className={clsx(registerStyles.subtitle)}>
              Join our community for tailored recommendations, early sale access, and effortless
              order management.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={clsx(registerStyles.formContent)} noValidate>
            <div className={clsx(registerStyles.formRow)}>
              <div className={clsx(registerStyles.formField)}>
                <label htmlFor="regFirstName" className={clsx(registerStyles.formFieldLabel)}>
                  First Name <span className={clsx(registerStyles.requiredStar)}>*</span>
                </label>
                <input
                  id="regFirstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={changeInformation}
                  className={clsx(
                    registerStyles.formFieldInput,
                    errors.firstName && registerStyles.formFieldInputError,
                  )}
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <p className={clsx(registerStyles.errorText)}>{errors.firstName}</p>
                )}
              </div>

              <div className={clsx(registerStyles.formField)}>
                <label htmlFor="regLastName" className={clsx(registerStyles.formFieldLabel)}>
                  Last Name <span className={clsx(registerStyles.requiredStar)}>*</span>
                </label>
                <input
                  id="regLastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={changeInformation}
                  className={clsx(
                    registerStyles.formFieldInput,
                    errors.lastName && registerStyles.formFieldInputError,
                  )}
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <p className={clsx(registerStyles.errorText)}>{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className={clsx(registerStyles.formField)}>
              <label htmlFor="regEmail" className={clsx(registerStyles.formFieldLabel)}>
                Email Address <span className={clsx(registerStyles.requiredStar)}>*</span>
              </label>
              <input
                id="regEmail"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={changeInformation}
                className={clsx(
                  registerStyles.formFieldInput,
                  errors.email && registerStyles.formFieldInputError,
                )}
                autoComplete="email"
              />
              {errors.email && <p className={clsx(registerStyles.errorText)}>{errors.email}</p>}
            </div>

            <div className={clsx(registerStyles.formRow)}>
              <div className={clsx(registerStyles.formField)}>
                <label htmlFor="regPassword" className={clsx(registerStyles.formFieldLabel)}>
                  Password <span className={clsx(registerStyles.requiredStar)}>*</span>
                </label>
                <div className={clsx(registerStyles.passwordWrapper)}>
                  <input
                    id="regPassword"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 5 characters"
                    value={formData.password}
                    onChange={changeInformation}
                    className={clsx(
                      registerStyles.formFieldInput,
                      registerStyles.passwordFieldInput,
                      errors.password && registerStyles.formFieldInputError,
                    )}
                    autoComplete="new-password"
                  />
                  <button
                    className={clsx(registerStyles.passwordToggleBtn)}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className={clsx(registerStyles.errorText)}>{errors.password}</p>
                )}
              </div>

              <div className={clsx(registerStyles.formField)}>
                <label htmlFor="regConfirmPassword" className={clsx(registerStyles.formFieldLabel)}>
                  Confirm Password <span className={clsx(registerStyles.requiredStar)}>*</span>
                </label>
                <div className={clsx(registerStyles.passwordWrapper)}>
                  <input
                    id="regConfirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={changeInformation}
                    className={clsx(
                      registerStyles.formFieldInput,
                      registerStyles.passwordFieldInput,
                      errors.confirmPassword && registerStyles.formFieldInputError,
                    )}
                    autoComplete="new-password"
                  />
                  <button
                    className={clsx(registerStyles.passwordToggleBtn)}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <IoEyeOffOutline size={18} />
                    ) : (
                      <IoEyeOutline size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className={clsx(registerStyles.errorText)}>{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className={clsx(registerStyles.checkboxGroup)}>
              <div className={clsx(registerStyles.formCheckbox)}>
                <input
                  id="agreeTermsCheckbox"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={changeInformation}
                  className={clsx(
                    registerStyles.formCheckboxInput,
                    errors.agreeTerms && registerStyles.formCheckboxInputError,
                  )}
                />
                <label
                  htmlFor="agreeTermsCheckbox"
                  className={clsx(registerStyles.formCheckboxLabel)}
                >
                  I agree to the Terms & Conditions and Privacy Policy{' '}
                  <span className={clsx(registerStyles.requiredStar)}>*</span>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className={clsx(registerStyles.errorText)}>{errors.agreeTerms}</p>
              )}

              <div className={clsx(registerStyles.formCheckbox)}>
                <input
                  id="newsletterCheckbox"
                  name="newsletter"
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={changeInformation}
                  className={clsx(registerStyles.formCheckboxInput)}
                />
                <label
                  htmlFor="newsletterCheckbox"
                  className={clsx(registerStyles.formCheckboxLabel)}
                >
                  Sign up for the EvaShop newsletter to receive seasonal lookbooks and private event
                  invitations.
                </label>
              </div>
            </div>

            <div className={clsx(registerStyles.formActions)}>
              <button
                type="submit"
                className={clsx(registerStyles.submitBtn)}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>

              <div className={clsx(registerStyles.divider)}>
                <span className={clsx(registerStyles.dividerText)}>ALREADY REGISTERED?</span>
              </div>

              <Link to="/login" className={clsx(registerStyles.signInLink)}>
                <span>SIGN IN TO EXISTING ACCOUNT</span>
                <IoArrowForwardOutline size={16} />
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
