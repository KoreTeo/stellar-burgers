import { FC, useMemo, useCallback } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearConstructor,
  getConstructorState
} from '../../services/slices/constructorSlice';
import {
  getNewOrderState,
  newOrderThunk,
  clearOrder
} from '../../services/slices/newOrderSlice';
import { getUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const constructorItems = useSelector(getConstructorState);

  const { orderRequest, order } = useSelector(getNewOrderState);
  const orderModalData = order;

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = useCallback(() => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
    }

    if (
      user &&
      constructorItems.bun &&
      constructorItems.ingredients.length > 0
    ) {
      const dataToOrder = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(newOrderThunk(dataToOrder));
    }
  }, [user, constructorItems, dispatch, navigate]);

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
    navigate('/');
  };

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
