import { useNavigate } from 'react-router-dom';
import { Book } from '../types/books';

export function useBookNavigate() {
  const navigate = useNavigate();

  return (key: string, author_name: string[] = []) => {
    const bookId = key.replace('/works/', '');
    navigate(`../book/${bookId}`, {
      state: { authors: author_name },
    });
  };
}
