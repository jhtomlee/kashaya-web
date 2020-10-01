import React, { useState } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  Paper,
  TableHead, TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import data from '../static/result.json'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    paddingTop: 80,
    minHeight: '100vh',
  },
  table: {
    minWidth: 650,
  },
});

function createData(img, english, kashaya, speaker, category, subcategory) {
  return { img, english, kashaya, speaker, category, subcategory };
}

const data_json = Object.values(data)

const rows = data_json.map(
  i => createData(i["Image"], i["English"], i["Kashaya"], i["Audio"], i["Category"], i["Subcategory"])
);


function AllList() {

  const [vocabList, setVocabList] = useState([]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container} >
        <Typography variant="h3" component="h1" gutterBottom>
          Kashaya Vocabulary - All
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Word</TableCell>
                {/* <TableCell align="right">Kashaya</TableCell> */}
                {/* <TableCell align="right">Audio</TableCell> */}
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Subcategories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.english}>
                  <TableCell component="th" scope="row">
                    <img src={row.img} width="150" height="150"></img>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>
                      {row.english}
                    </Typography>
                    <Typography style={{ fontWeight: 700 }}>
                      {row.kashaya}
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="right">{row.speaker}</TableCell> */}
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">{row.subcategory}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </div>
  );
}

export default AllList;
