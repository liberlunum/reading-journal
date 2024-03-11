import ShowFavorites from './ShowFavorites';
import EmptyFavorites from './EmptyFavorites';

function Favorites() {
  const user = localStorage.getItem('CurrentUser');

  return (
    <>
      {user ? (
        <ShowFavorites></ShowFavorites>
      ) : (
        <EmptyFavorites></EmptyFavorites>
      )}
    </>
  );
}

export default Favorites;
