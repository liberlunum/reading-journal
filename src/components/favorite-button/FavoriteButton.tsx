import React, { ReactNode, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useFavorites } from '../../hooks/useFavorites';
import { Alert } from '@mui/material';
import styles from './FavoriteButton.module.css';

interface Prop {
  id?: string;
  children: {
    add: ReactNode;
    delete: ReactNode;
  };
}

export function FavoriteButton({ id, children }: Prop) {
  const [isAlertVisible, setAlertVisibility] = useState<boolean>(false);
  const activeUser = useTypedSelector(state => state.auth.activeUser);
  const [addFavorite, deleteFavorite] = useFavorites();

  const addToFavorites = (id: string) => {
    if (activeUser) {
      addFavorite(id);
    } else {
      setAlertVisibility(true);
    }
  };
  const deleteFromFavorites = (id: string) => {
    if (activeUser) {
      deleteFavorite(id);
    } else {
      setAlertVisibility(false);
    }
  };

  const allUserFavorites = useTypedSelector(
    state => state.auth.activeUser?.favorites
  );

  const isBookInFavorites = (id: string | undefined): boolean => {
    if (id === undefined || !allUserFavorites) {
      return false;
    }

    return allUserFavorites.includes(id);
  };

  function hideMessage() {
    setAlertVisibility(false);
  }

  function addOrRemoveFromFavorite(id: string) {
    if (isBookInFavorites(id)) {
      deleteFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  }

  return (
    <>
      {isAlertVisible && (
        <Alert severity="warning" onClose={hideMessage}>
          Sorry, but you can`t add book in favorites before sign in
        </Alert>
      )}

      {!isAlertVisible && (
        <div
          className={styles.container}
          onClick={() => addOrRemoveFromFavorite(id!)}
        >
          {isBookInFavorites(id) ? children.delete : children.add}
        </div>
      )}
    </>
  );
}
