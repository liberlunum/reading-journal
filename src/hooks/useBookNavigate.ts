import { useNavigate } from 'react-router-dom';

export function useBookNavigate() {
  const navigate = useNavigate();

  return (key: string, author_name: string[] = []) => {
    const bookId = key.replace('/works/', '');
    navigate(`../book/${bookId}`, {
      state: { authors: author_name },
    });
  };
}
