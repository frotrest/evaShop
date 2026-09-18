/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth, selectIsAuthLoading } from '../store/selectors';

export const PrivateRoute = ({ component: Component, redirectTo = '/login' }) => {
  const isAuth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsAuthLoading);

  if (isLoading) {
    return <div className="pageLoader">Loading...</div>;
  }

  return isAuth ? <Component /> : <Navigate to={redirectTo} replace />;
};

export const RestrictedRoute = ({ component: Component, redirectTo = '/dashboard' }) => {
  const isAuth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsAuthLoading);

  if (isLoading) {
    return <div className="pageLoader">Loading...</div>;
  }

  return isAuth ? <Navigate to={redirectTo} replace /> : <Component />;
};
