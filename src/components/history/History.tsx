import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import style from './History.module.css';

function History() {
  const { activeUser } = useTypedSelector(state => state.auth);

  return (
    <div className={style.container}>
      <TableContainer component={Paper} style={{ border: '1px solid #d3d3d3' }}>
        <Table className={style.table}>
          <TableHead>
            <TableRow
              style={{
                backgroundColor: '#d3d3d3',
              }}
            >
              <TableCell style={{ fontSize: 19, color: '#210020' }}>
                Вы искали ранее
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeUser?.history.map(his => (
              <TableRow key={his.time} hover role="checkbox">
                <TableCell sx={{ display: 'flex' }}>
                  <Typography className={style.time}>
                    {new Date(Number(his.time)).toLocaleString()}
                  </Typography>
                  <Link to={his.url} className={style.link}>
                    <Typography className={style.url}>{his.url}</Typography>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default History;
