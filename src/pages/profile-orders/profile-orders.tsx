import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { getUserOrders, selectOrders } from '@slices';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
