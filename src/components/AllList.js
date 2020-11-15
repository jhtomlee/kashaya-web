import React, { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import {
  Container, Typography, Table, TableBody,
  TableCell, TableContainer, TableSortLabel,
  Paper, Toolbar, Tooltip, IconButton,
  TableHead, TableRow, FormControl, InputLabel,
  Select, MenuItem, InputBase, Button, Grid,
  Hidden, Badge
} from '@material-ui/core';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import FilterModal from './subcomponents/FilterModal'
import data from '../static/result.json'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import LoopIcon from '@material-ui/icons/Loop';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 80,
    paddingBottom: 40,
    maxHeight: '100vh',
    // minHeight: '100vh',
    // maxHeight: '100%'
    // backgroundColor: 'orange'
    // height: '100%',
    // width: '100vw',
    // backgroundColor: 'yellow'
  },
  tableContainer: {
    // backgroundColor: 'green'
  },
  table: {
    // backgroundColor: 'blue'
  },
  toolbarRoot: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(1),
    // zIndex: theme.zIndex.drawer + 1,
    // position: "fixed",
    // width: "100%"
    // top: 0
    // minWidth: 360,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  search: {
    flex: '1 1 100%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

/**
 * Table row creation
 */
const orderAudio = (paths) => {
  const newArr = []
  let speaker
  for (speaker of ['HJ', 'EP', 'IJ', 'GJ', 'ML', 'AS', 'OP', 'IA', 'FD']) {
    const exists = paths.some(path => path.substring(path.length - 6, path.length - 4) === speaker)
    if (exists) {
      const path = paths.find(path => path.substring(path.length - 6, path.length - 4) === speaker)
      newArr.push(path)
    }
  }
  return newArr
}
function createData(img, english, kashaya, speaker, category, subcategory) {
  speaker = orderAudio(speaker)
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
  const categoriesFinal = categoriesArr.map(category => { return { value: category, label: category } })

  categories.forEach(category => {
    const subcategoryArr = Array.from(subcategories[category])
    subcategoryArr.sort();
    subcategories[category] = subcategoryArr.map(subcategory => {
      return { value: subcategory, label: subcategory, category: category }
    })
  })
  return [categoriesFinal, subcategories]
}
const [categories, subcategories] = getCategories();

/**
 * Speakers creation
 */
const speakers_set = new Set()
let speaker;
data_json.forEach(row => {
  row['Audio'].forEach((path) => {
    speaker = path.substring(path.length - 6, path.length - 4)
    speakers_set.add(speaker)
  })
})
const speakersArr = Array.from(speakers_set)
speakersArr.sort();
const speakers = speakersArr.map(s => { return { value: s, label: s } })

/**
 * Table sorting functions
 */
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

/**
 * Functional component: styled-badge
 */
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

/**---------------------------------
 * -------AllList Component--------
 * --------------------------------*/
function AllList() {
  const [rows_state, setRows] = useState(rows);
  const [rows_temp, setRowsTemp] = useState([]);
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
  const handleOrderByChange = () => {
    // setOrderBy(event.target.value);
    if (orderBy==='english'){
      setOrderBy('kashaya')
    } else {
      setOrderBy('english')
    }
  };

  /**
   * Filter modal
   */
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState(null);
  const [filtersCount, setFilterCount] = useState(0)
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  /**
   * Search
   */
  // reference to the html search box
  const inputRef = useRef("")
  // function triggered when seach input change
  const onChangeSearchInput = (event) => {
    event.persist()
    delaySearch(event, rows_temp, rows_state)
  }
  // fuction called to debounce search
  const delaySearch = useCallback(debounce(
    (event, rows_temp) => {
      if (event.target.value === '') {
        setRows(rows_temp)
      } else {
        const rows = rows_temp
        const query = event.target.value.toLowerCase()
        const kashayaQueries = new Set()
        kashayaQueries.add(query)
        combination_helper(kashayaQueries, query)
        const kashayaQueriesArr = Array.from(kashayaQueries)
        const newRows = rows.filter(row => row.english.includes(query) || kashayaQueriesArr.some(q => row.kashaya.includes(q)))
        setRows(newRows)
      }
    }, 250), []);
  // helper to create combination of queries with possible kashaya characters
  const combination_helper = (queries, query) => {
    if (['s', 't', 'h', '?', '\'', '.', ':', 'a', 'e', 'i', 'o', 'u'].every((char) => !query.includes(char))) {
      return
    }
    let new_query;
    if (query.includes('s')) {
      new_query = query.replace('s', 'š')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes('t')) {
      new_query = query.replace('t', 'ṭ')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes('h')) {
      new_query = query.replace('h', 'ʰ')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes('?')) {
      new_query = query.replace('?', 'ʔ')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes('\'')) {
      new_query = query.replace('\'', '’')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes('.')) {
      new_query = query.replace('.', '·')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes(':')) {
      new_query = query.replace(':', '·')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes('a')) {
      new_query = query.replace('a', 'á')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes('e')) {
      new_query = query.replace('e', 'é')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes('i')) {
      new_query = query.replace('i', 'í')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes('o')) {
      new_query = query.replace('o', 'ó')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
    if (query.includes('u')) {
      new_query = query.replace('u', 'ú')
      queries.add(new_query)
      combination_helper(queries, new_query)
    }
  }
  /**
   * Filter by categories
   */
  useEffect(() => {
    inputRef.current.children[0].value = "";
    // filter categories and subcategories
    const newRows = rows.filter(row => {
      if (selectedCategories.length === 0) {
        return true;
      } else {
        if (selectedCategories.includes(row.category)) {
          if (selectedSubcategories && selectedSubcategories[row.category]) {
            if (selectedSubcategories[row.category].length === 0) {
              return true;
            }
            let intersection = row.subcategory.filter(x => selectedSubcategories[row.category].includes(x));
            if (intersection.length > 0) {
              return true;
            } else {
              return false;
            }
          } else {
            return true
          }
        } else {
          return false;
        }
      }
    }
    )
    // filter speakers
    const newRows2 = newRows.filter(row => {
      if (selectedSpeakers.length === 0) {
        return true
      } else {
        const rowSpeakers = row.speaker.map((path) => path.substring(path.length - 6, path.length - 4))
        const intersection = selectedSpeakers.filter(x => rowSpeakers.includes(x))
        if (intersection.length > 0) {
          return true
        } else {
          return false
        }
      }
    })
    setRows(newRows2)
    setRowsTemp(newRows2)
  }, [selectedCategories, selectedSubcategories, selectedSpeakers]);

  /**
   * Audio
   */
  const playWord = (speaker) => {
    new Audio(speaker).play()
    // audioMap[speaker].play();
  }

  /**
   * Render 
   */
  return (
    <div className={classes.root}>
      <FilterModal
        categories={categories}
        subcategories={subcategories}
        openFilter={openFilter}
        speakers={speakers}
        handleCloseFilter={handleCloseFilter}
        setSelectedCategories={setSelectedCategories}
        setSelectedSubcategories={setSelectedSubcategories}
        setSelectedSpeakers={setSelectedSpeakers}
        setFilterCount={setFilterCount}
      />
      {/* App bar space*/}
      {/* <Container maxWidth="lg" style={{minHeight: 80,position: '-webkit-sticky', position: "sticky", top:0, backgroundColor:'aqua', zIndex:  5}} >
      </Container> */}
      {/* <Container maxWidth="lg" style={{maxHeight: 500, backgroundColor:'yellow'}}>  */}
      <Container maxWidth="lg" className={classes.container}>
        {/* <Toolbar position="fixed" className={classes.toolbarRoot}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={onChangeSearchInput}
              type="search"
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              ref={inputRef}
            />
          </div>
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
              {filtersCount === 0 || !filtersCount ?
                <FilterListIcon />
                :
                <StyledBadge badgeContent={filtersCount} color="secondary">
                  <FilterListIcon />
                </StyledBadge>
              }
            </IconButton>
          </Tooltip>
        </Toolbar> */}
        {/* Table Container */}
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader className={classes.table} aria-label="simple table" >
            {/* Table Head */}
            <TableHead >
              <TableRow >
                <TableCell style={{ width: "40%" }}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      onChange={onChangeSearchInput}
                      type="search"
                      placeholder="Search"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      ref={inputRef}
                    />
                  </div>
                </TableCell>
                {/* <TableCell align="left"
                  sortDirection={orderBy === 'english' ? order : false}>
                  {orderBy === "english" ? (
                    <TableSortLabel
                      active={orderBy === 'english'}
                      direction={orderBy === 'english' ? order : 'asc'}
                      onClick={createSortHandler('english')}
                    >
                      <Typography>Word</Typography>
                    </TableSortLabel>
                  ) : (

                      <TableSortLabel
                        active={orderBy === 'kashaya'}
                        direction={orderBy === 'kashaya' ? order : 'asc'}
                        onClick={createSortHandler('kashaya')}
                      >
                        <Typography>Word</Typography>
                      </TableSortLabel>
                    )}
                </TableCell> */}
                <TableCell align="left">
                  <Grid container direction="row">
                  <Typography style={{paddingTop:3}}>Word</Typography>
                    <IconButton size="small" onClick={() => handleOrderByChange()}>
                      <LoopIcon />
                    </IconButton>
                  </Grid>
                </TableCell>
                <Hidden xsDown>
                  <TableCell align="left"><Typography>Listen</Typography></TableCell>
                  {/* <TableCell align="left">Category</TableCell>
                <TableCell align="left">Subcategories</TableCell> */}
                </Hidden>
                <TableCell style={{ width: 25 }} >
                  <Tooltip title="Filter list">
                    <IconButton style={{ padding: 0 }} aria-label="filter list" onClick={() => handleOpenFilter()}>
                      {filtersCount === 0 || !filtersCount ?
                        <FilterListIcon />
                        :
                        <StyledBadge badgeContent={filtersCount} color="secondary">
                          <FilterListIcon />
                        </StyledBadge>
                      }
                    </IconButton>
                  </Tooltip>

                </TableCell>
              </TableRow>
            </TableHead>
            {/* Table Body */}
            <TableBody>
              {stableSort(rows_state, getComparator(order, orderBy))
                .map((row) => (
                  <TableRow key={row.english}>
                    <TableCell component="th" scope="row">
                      <Hidden xsDown>
                        <img src={row.img} width="150" height="150"></img>
                      </Hidden>
                      <Hidden smUp>
                        <img src={row.img} width="110" height="110"></img>
                      </Hidden>
                    </TableCell>
                    <Hidden xsDown>
                      <TableCell align="left">
                        {orderBy === "english" ? (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.english}
                            </Typography>
                            <Typography >
                              {row.kashaya}
                            </Typography>
                          </div>
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
                    </Hidden>
                    <Hidden smUp>
                      <TableCell align="left" colSpan={2}>
                        {orderBy === "english" ? (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.english}
                            </Typography>
                            <Typography >
                              {row.kashaya}
                            </Typography>
                          </div>
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
                        {/* <Player
                          style={{ marginTop: 24 }}
                          speakerPaths={row.speaker}
                          selectedSpeakers={selectedSpeakers}
                        /> */}
                        <Grid container direction="column">
                          {row.speaker.map(audio =>
                            <Button
                              style={{ marginBottom: 5, width: '20%' }}
                              key={audio} size="small" variant="contained"
                              color="primary" onClick={() => playWord(audio)}>
                              ▶ {audio.substring(audio.length - 6, audio.length - 4)}
                            </Button>
                          )}
                        </Grid>
                      </TableCell>
                    </Hidden>
                    {/* <TableCell align="right">{row.speaker}</TableCell> */}
                    <Hidden xsDown>
                      <TableCell colSpan={2} align="left" >
                        {/* <Player speakerPaths={row.speaker} /> */}
                        <Grid container direction="column">
                          {row.speaker.map(audio =>
                            <Button
                              style={{ marginBottom: 5, width: '20%' }}
                              key={audio} size="small" variant="contained"
                              color="primary" onClick={() => playWord(audio)}>
                              ▶ {audio.substring(audio.length - 6, audio.length - 4)}
                            </Button>
                          )}
                        </Grid>
                      </TableCell>
                    </Hidden>
                    {/* <TableCell > </TableCell> */}
                    {/* <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.subcategory}</TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
      {/* </Container> */}
    </div>
  );
}

export default AllList;
