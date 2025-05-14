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
import '../../index.css';
import styles from './app.module.css';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';

const App = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} /> {/*защ*/}
        <Route path='/register' element={<Register />} /> {/*защ*/}
        <Route path='/forgot-password' element={<ForgotPassword />} /> {/*защ*/}
        <Route path='/reset-password' element={<ResetPassword />} /> {/*защ*/}
        <Route path='/profile' element={<Profile />} /> {/*защ*/}
        <Route path='/profile/orders' element={<ProfileOrders />} /> {/*защ*/}
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal onClose={() => navigate(-1)} title=''>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal onClose={() => navigate(-1)} title=''>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal onClose={() => navigate(-1)} title=''>
              <OrderInfo />
            </Modal>
          }
        /> {/*защ*/}
      </Routes>
    </div>
  );
};

export default App;
