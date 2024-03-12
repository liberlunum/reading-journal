import FavoritesList from '../../components/favorites/FavoritesList';
import EmptyFavoritesList from '../../components/favorites/EmptyFavoritesList';
import { useTypedSelector } from '../../hooks/useTypedSelector';

function Favorites() {
  const user = useTypedSelector(state => state.auth.activeUser);

  return (
    <>
      {user && user.favorites.length > 0 ? (
        <FavoritesList />
      ) : (
        <EmptyFavoritesList />
      )}
    </>
  );
}

export default Favorites;
