import { useNavigate } from 'react-router-dom';
import { Book } from '../types/books';

export function useBookNavigate() {
  const navigate = useNavigate();

  return (book: Book) => {
    const bookId = book.key.replace('/works/', '');
    navigate(`../book/${bookId}`, {
      state: { authors: book.author_name },
    });
  };
}
