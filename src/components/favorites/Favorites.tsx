import ShowFavorites from './ShowFavorites';
import EmptyFavorites from './EmptyFavorites';

function Favorites() {
  const user = JSON.parse(localStorage.getItem('CurrentUser')!);

  return (
    <>
      {user.favorites.length > 0 ? (
        <ShowFavorites></ShowFavorites>
      ) : (
        <EmptyFavorites></EmptyFavorites>
      )}
    </>
  );
}

export default Favorites;
