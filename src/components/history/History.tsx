import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Box } from '@mui/system';
import HistoryList from '../history-list/HistoryList';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { book } from './History.mock';
import { Link } from 'react-router-dom';
import style from './History.module.css';
import { useId } from 'react';

function History() {
  const { activeUser } = useTypedSelector(state => state.auth);
  const id = useId();

  return (
    <div className={style.container}>
      <TableContainer component={Paper} style={{ border: '1px solid #d3d3d3' }}>
        <Table style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
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
              <TableRow key={id} hover role="checkbox">
                <Link to={his.url} className={style.link}>
                  <TableCell className={style.time}>{his.time}</TableCell>
                  <TableCell className={style.url}>{his.url}</TableCell>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default History;
