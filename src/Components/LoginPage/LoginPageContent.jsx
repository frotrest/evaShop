import { useCallback, useState } from 'react';
import styles from './loginPage.module.css';
import clsx from 'clsx';
import Container from '../Container';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singUpUser } from '../../store/async/userThunk';
import { showNotification, hideNotification } from '../../store/slices/notificationSlice';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import { selectNotifications } from '../../store/selectors';

const LoginMain = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector(selectNotifications);

  const handleChange = useCallback((event) => {
    const { name, type, checked, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'agree') setAgree(type === 'checkbox' ? checked : value);
  }, []);

  const formValidation = useCallback((email, password, agree) => {
    const errors = {};
    if (!email) errors.email = 'This is a required field';
    if (!password) {
      errors.password = 'This is a required field';
    } else if (password.length <= 3) {
      errors.password = 'Password must contain more than 3 letters';
    }
    if (!agree) errors.agree = 'This is a required field';
    return errors;
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const validationErrors = formValidation(email, password, agree);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        try {
          const resultAction = await dispatch(singUpUser({ email, password }));

          if (singUpUser.fulfilled.match(resultAction)) {
            setEmail('');
            setPassword('');
            setAgree(false);
            navigate('/', { replace: true });
          } else {
            dispatch(
              showNotification({
                severity: 'error',
                message: resultAction.payload || "There's no user with this email",
              }),
            );
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      }
    },
    [email, password, agree, formValidation, dispatch, navigate],
  );

  return (
    <section className={styles.loginPage}>
      <Container className={clsx(styles.loginPageContent)}>
        <ul className={clsx(styles.navBarLinks)}>
          <li className={clsx(styles.navBarItem)}>
            <Link to="/" className={clsx(styles.navBarItemLink)}>
              Home
            </Link>
          </li>
          <li className={clsx(styles.navBarItem)}>
            <span className={clsx(styles.navBarItemLink)}>Sign in</span>
          </li>
        </ul>
        <h1 className={clsx(styles.loginTitle)}>LOGIN YOUR ACCOUNT</h1>

        <form onSubmit={handleSubmit} className={clsx(styles.formContent)}>
          <div className={clsx(styles.formField)}>
            <label htmlFor="emailField" className={clsx(styles.formFieldLabel)}>
              Email <span className={clsx(styles.formFieldStar)}>*</span>
            </label>
            <div className={clsx(styles.inputBlock)}>
              <input
                type="email"
                id="emailField"
                name="email"
                value={email}
                onChange={handleChange}
                className={clsx(styles.formFieldInput, errors.email && styles.formFieldInputError)}
                placeholder="Email"
              />
              {errors.email && <p className={clsx(styles.errorText)}>{errors.email}</p>}
            </div>
          </div>

          <div className={clsx(styles.formField)}>
            <label htmlFor="passwordField" className={clsx(styles.formFieldLabel)}>
              Password <span className={clsx(styles.formFieldStar)}>*</span>
            </label>
            <div className={clsx(styles.inputBlock)}>
              <input
                type="password"
                id="passwordField"
                name="password"
                value={password}
                onChange={handleChange}
                className={clsx(
                  styles.formFieldInput,
                  errors.password && styles.formFieldInputError,
                )}
                placeholder="Password"
              />
              {errors.password && <p className={clsx(styles.errorText)}>{errors.password}</p>}
            </div>
          </div>

          <div className={clsx(styles.formCheckbox, styles.formField)}>
            <input
              type="checkbox"
              id="checkboxId"
              name="agree"
              checked={agree}
              onChange={handleChange}
              className={clsx(
                styles.formCheckboxInput,
                errors.agree && styles.formCheckboxInputError,
              )}
            />
            <label htmlFor="checkboxId" className={clsx(styles.formCheckboxLabel)}>
              By using this form you agree with the storage and handling of your data by this
              website.
            </label>
          </div>

          <div className={clsx(styles.formBtns)}>
            <button type="submit" className={clsx(styles.formBtnSubmit)}>
              SIGN IN
            </button>
            <Link to="/register" className={clsx(styles.formBtnLink)}>
              CREATE AN ACCOUNT
            </Link>
          </div>
        </form>

        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={() => dispatch(hideNotification())}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          TransitionComponent={Fade}
        >
          <Alert
            severity={notification.severity}
            onClose={() => dispatch(hideNotification())}
            variant="filled"
            sx={{ boxShadow: 3 }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </section>
  );
};

export default LoginMain;
