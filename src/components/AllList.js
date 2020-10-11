import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableSortLabel,
  Paper, Toolbar, Tooltip, IconButton,
  TableHead, TableRow, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterModal from './subcomponents/FilterModal'
import data from '../static/result.json'
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme => ({
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
  toolbarRoot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  toolbarTitle: {
    flex: '1 1 100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/**
 * Table row creation
 */
function createData(img, english, kashaya, speaker, category, subcategory) {
  return { img, english, kashaya, speaker, category, subcategory };
}
const data_json = Object.values(data)
const rows = data_json.map(
  i => createData(i["Image"], i["English"], i["Kashaya"], i["Audio"], i["Category"], i["Subcategory"])
);

/**
 * Categories creation
 */
const getCategories = () => {
  const categories = new Set()
  const subcategories = {}
  let category;
  let subcategoryArr;
  data_json.forEach((row) => {
    category = row['Category'];
    subcategoryArr = row['Subcategory']
    if (category in subcategories) {
      subcategoryArr.forEach(subcategory => subcategories[category].add(subcategory))
    } else {
      categories.add(category)
      subcategories[category] = new Set()
    }
  })
  const categoriesArr = Array.from(categories)
  categoriesArr.sort();
  categories.forEach( category => {
    const subcategoryArr = Array.from(subcategories[category])
    subcategoryArr.sort();
    subcategories[category] = subcategoryArr
  })

  return [categoriesArr, subcategories]
}
const [categories, subcategories] = getCategories();

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function AllList() {
  const [rows_state, setRows] = useState(rows);
  const classes = useStyles();


  /**
   * Sorting table
   */
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('english');
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  /**
   * Filter modal
   */
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  /**
   * Filter by categories
   */
  useEffect(() => {
    const newRows = rows.filter(row => selectedCategories.length===0 || selectedCategories.includes(row.category ))
    setRows(newRows)
  }, [selectedCategories]); 

  /**
   * Render 
   */
  return (
    <div className={classes.root}>
      <FilterModal
        categories={categories}
        subcategories={subcategories}
        openFilter={openFilter}
        handleCloseFilter={handleCloseFilter}
        selectedCategories={selectedCategories}
        // selectedSubcategories={selectedSubcategories}
        setSelectedCategories={setSelectedCategories}
        // setSelectedSubcategories={setSelectedSubcategories} 
        />
      <Container maxWidth="lg" className={classes.container} >
        {/* <Typography variant="h3" component="h1" gutterBottom>
          Kashaya Vocabulary - All
        </Typography> */}
        <Toolbar className={classes.toolbarRoot}>
          <Typography className={classes.toolbarTitle} variant="h6" id="tableTitle" component="div">
            Kashaya Vocabulary
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="select-placeholder-label-label">
              Order by
          </InputLabel>
            <Select
              labelId="select-placeholder-label-label"
              id="select-placeholder-label"
              value={orderBy}
              onChange={handleOrderByChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="kashaya">Kashaya</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list" onClick={() => handleOpenFilter()}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        {/* Table Container */}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left"
                  sortDirection={orderBy === 'english' ? order : false}>
                  {orderBy === "english" ? (
                    <TableSortLabel
                      active={orderBy === 'english'}
                      direction={orderBy === 'english' ? order : 'asc'}
                      onClick={createSortHandler('english')}
                    >
                      <Typography>English Word</Typography>
                    </TableSortLabel>
                  ) : (

                      <TableSortLabel
                        active={orderBy === 'kashaya'}
                        direction={orderBy === 'kashaya' ? order : 'asc'}
                        onClick={createSortHandler('kashaya')}
                      >
                        <Typography>Kashaya Word</Typography>
                      </TableSortLabel>
                    )}
                </TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Subcategories</TableCell>
              </TableRow>
            </TableHead>
            {/* Table Body */}
            <TableBody>
              {stableSort(rows_state, getComparator(order, orderBy))
                .map((row) => (
                  <TableRow key={row.english}>
                    <TableCell component="th" scope="row">
                      <img src={row.img} width="150" height="150"></img>
                    </TableCell>
                    <TableCell align="left">
                      {orderBy === "english" ? (
                        <div>
                          <Typography style={{ fontWeight: 700 }}>
                            {row.english}
                          </Typography>
                          <Typography >
                            {row.kashaya}
                          </Typography> </div>
                      ) : (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.kashaya}
                            </Typography>
                            <Typography>
                              {row.english}
                            </Typography>
                          </div>
                        )}
                    </TableCell>
                    {/* <TableCell align="right">{row.speaker}</TableCell> */}
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.subcategory}</TableCell>
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
