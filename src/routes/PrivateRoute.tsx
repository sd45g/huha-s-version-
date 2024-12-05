// src/routes/PrivateRoute.tsx

import { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from 'store/admin/store';
import { setUser, setRole } from 'store/admin/slices/authSlice';
import { parseJwt } from 'utils/tokenUtils';
import paths from './paths';

interface PrivateRouteProps {
  role: 'admin' | 'customer';
  children?: ReactNode;
}

const PrivateRoute = ({ role, children }: PrivateRouteProps) => {
  const { user, role: userRole } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Token Found:', token);

    if (!user && token) {
      const decodedToken = parseJwt(token);
      console.log('Decoded Token:', decodedToken);

      if (decodedToken?.id && decodedToken?.role && decodedToken?.email) {
        dispatch(
          setUser({
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name || 'ضيف',
          }),
        );
        dispatch(setRole(decodedToken.role as 'admin' | 'customer'));
      }
    }
  }, [user, dispatch]);

  if (!user) {
    return <Navigate to={paths.signin} replace state={{ from: location.pathname }} />;
  }

  if (role && userRole !== role) {
    return <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/client'} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
