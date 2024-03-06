import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import styles from './History.module.css';
import { book } from './history.mock';
import { Link } from 'react-router-dom';

function History() {
  return (
    <div className={styles.container}>
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
            {book.map(book => (
              <TableRow key={book.id} hover role="checkbox">
                <TableCell
                  style={{
                    padding: '8px 8px 8px 180px',
                    border: '0.5px solid rgb(247 244 244)',
                    fontSize: 16,
                  }}
                >
                  <Link to="/favorites" className={styles.link}>
                    {book.author}
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
