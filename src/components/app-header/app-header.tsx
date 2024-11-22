import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userState = useSelector(getUserData);

  return <AppHeaderUI userName={userState.user?.name || ''} />;
};
