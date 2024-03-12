import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface Props {
  children: any;
}

export function ProtectedAuthRoute({ children }: Props) {
  const activeUser = useTypedSelector(state => state.auth.activeUser);

  if (!activeUser) {
    return <Navigate to="/signin" />;
  }

  return children;
}
