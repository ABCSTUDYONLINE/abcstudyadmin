import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { 
    Paper,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
} from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
function createData(fieldname, numOfCounts, actions) {
    return { fieldname, numOfCounts, actions };
  }
  
  const rows = [
    createData('Lập trình javascript cơ bản', 25),
    createData('Lập trình Java nâng cao', 17),
    createData('Lập trình frontend từ cơ bản tới nâng cao', 101),
    createData('Lập trình react redux', 98),
    createData('Lập trình react native', 49),
  ];
  
export default function TableCate() {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Fields Name</TableCell>
              <TableCell align="center">Number Of Counts</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.fieldname}
                </TableCell>
                <TableCell align="center">{row.numOfCounts}</TableCell>
                <TableCell align="center">{row.actions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
    )
}
