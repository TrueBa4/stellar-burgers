import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  orderBurger,
  removeAll,
  selectBurger,
  selectOrder,
  selectOrderStatus,
  selectUserStatus
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectUserStatus);

  const constructorItems = useSelector(selectOrder);

  const orderRequest = useSelector(selectOrderStatus);

  const orderModalData = useSelector(selectBurger);

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
    const burgerIngredients = [
      constructorItems.bun,
      ...constructorItems.ingredients,
      constructorItems.bun
    ].map((ingredient) => ingredient._id);

    dispatch(orderBurger(burgerIngredients));
  };
  const closeOrderModal = () => {
    dispatch(removeAll());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
