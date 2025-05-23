import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUserStatus } from '@slices';
import { useSelector } from '@store';

type ProtectedProps = {
  children: ReactNode;
  isAuthPage: boolean;
};

export const ProtectedRoute = ({
  children,
  isAuthPage = false
}: ProtectedProps) => {
  const isAuth = useSelector(selectUserStatus);

  const location = useLocation();
  const from = location.state?.from || '/';

  if (isAuthPage && isAuth) {
    return <Navigate to={from} />;
  }

  if (!isAuthPage && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
