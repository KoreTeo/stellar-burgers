import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Navigate, Outlet } from 'react-router';
import { Preloader } from '../ui/preloader';
import { ProtectedRouteProps } from './type';
import { getUser, getUserIsAuth } from '../../services/slices/userSlice';

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getUserIsAuth);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
};
