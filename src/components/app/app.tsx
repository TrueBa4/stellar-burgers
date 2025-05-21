import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';
import { useDispatch, useSelector } from '@store';
import {
  getUser,
  selectUserStatus,
  selectOrderByNumber,
  getIngredients
} from '@slices';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as { background?: Location };

  const isAuth = useSelector(selectUserStatus);
  const currentOrder = useSelector(selectOrderByNumber);

  useEffect(() => {
    if (!isAuth) {
      dispatch(getUser());
    }
    dispatch(getIngredients());
  }, [dispatch, isAuth]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute isAuthPage>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute isAuthPage>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isAuthPage>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute isAuthPage>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute isAuthPage={false}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute isAuthPage={false}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {state?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={currentOrder ? `${currentOrder.number}` : ''}
                onClose={() => navigate(-1)}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингридиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={currentOrder ? `${currentOrder.number}` : ''}
                onClose={() => navigate(-1)}
              >
                <ProtectedRoute isAuthPage={false}>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
