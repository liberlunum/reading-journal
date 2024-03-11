import { Box } from '@mui/system';
import { UserHistory } from '../../types/AuthTypes';
import { Typography } from '@mui/material';

type props = {
  history: UserHistory[];
};

function HistoryList({ history }: props) {
  return (
    <Box>
      {history.map((el: UserHistory) => (
        <Box
          key={el.time}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography sx={{ marginRight: 10, textAlign: 'center' }}>
            {el.time}
          </Typography>
          <Typography sx={{ textAlign: 'center', maxWidth: 499 }}>
            {el.url}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default HistoryList;
