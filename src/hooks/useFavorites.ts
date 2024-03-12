import { useAppDispatch } from './useAppDispatch';
import {
  addFavorites,
  deleteFavorites,
} from '../state/action-creators/favorites';

export function useFavorites() {
  const dispatch = useAppDispatch();

  const addToFavorites = (key: string | undefined) => {
    if (!key) {
      return;
    }
    dispatch(addFavorites(key));
  };

  const deleteFromFavorites = (key: string | undefined) => {
    if (!key) {
      return;
    }
    dispatch(deleteFavorites(key));
  };

  return [addToFavorites, deleteFromFavorites];
}
