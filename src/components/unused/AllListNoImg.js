import React, { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  TableHead,
  TableRow,
  Button,
  Grid,
  Hidden,
} from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import LoopIcon from '@material-ui/icons/Loop';
import AppBar from '../subcomponents/AppBar';
import FilterModal2 from '../subcomponents/FilterModal2';
import data from '../../static/result_vocab_noimg.json';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 80,
    paddingBottom: 40,
  },
  toolbarRoot: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(1),
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
  const allSpeakers = ['HJ', 'EP', 'IJ', 'GJ', 'ML', 'AS', 'OP', 'IA', 'FD'];
  const newArr = [];
  //  speaker
  allSpeakers.forEach((speaker) => {
    const exists = paths.some(
      (path) => path.substring(path.length - 6, path.length - 4) === speaker
    );
    if (exists) {
      const pathAppend = paths.find(
        (path) => path.substring(path.length - 6, path.length - 4) === speaker
      );
      newArr.push(pathAppend);
    }
  });
  return newArr;
};

const createData = (img, english, kashaya, speaker, category, subcategory) => {
  const speakerOrdered = orderAudio(speaker);
  return {
    img,
    english,
    kashaya,
    speaker: speakerOrdered,
    category,
    subcategory,
  };
};
const dataJson = Object.values(data);
const rows = dataJson.map((i) =>
  createData(i.Image, i.English, i.Kashaya, i.Audio, i.Categories)
);

/**
 * Categories creation
 */
const getCategories = () => {
  const categories = new Set();
  let categoryArr;
  dataJson.forEach((row) => {
    categoryArr = row.Categories;
    categoryArr.forEach((category) => categories.add(category));
  });

  const temp = Array.from(categories);
  temp.sort();
  const categoriesFinal = temp.map((category) => {
    return { value: category, label: category };
  });

  return categoriesFinal;
};
const categories = getCategories();

/**
 * Speakers creation
 */
const speakersSet = new Set();
let speaker;
dataJson.forEach((row) => {
  row.Audio.forEach((path) => {
    speaker = path.substring(path.length - 6, path.length - 4);
    speakersSet.add(speaker);
  });
});
const speakersArr = Array.from(speakersSet);
speakersArr.sort();
const speakers = speakersArr.map((s) => {
  return { value: s, label: s };
});

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

/**---------------------------------
 * -------AllList Component--------
 * --------------------------------*/
function AllList() {
  const [rowsState, setRows] = useState(rows);
  const [rowsTemp, setRowsTemp] = useState([]);
  const classes = useStyles();

  /**
   * Sorting table
   */
  // eslint-disable-next-line
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('english');
  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };
  // const createSortHandler = (property) => (event) => {
  //   handleRequestSort(event, property);
  // };
  const handleOrderByChange = () => {
    if (orderBy === 'english') {
      setOrderBy('kashaya');
    } else {
      setOrderBy('english');
    }
  };

  /**
   * Filter modal
   */
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  //   const [selectedSubcategories, setSelectedSubcategories] = useState(null);
  const [filtersCount, setFilterCount] = useState(0);
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
  const inputRef = useRef('');
  // helper to create combination of queries with possible kashaya characters
  const makeQueries = (queries, query, i) => {
    if (query.length === i) {
      return;
    }
    let newQuery = '';
    switch (query[i]) {
      case 's':
        newQuery = query.replaceAt(i, 'š');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case 't':
        newQuery = query.replaceAt(i, 'ṭ');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case 'h':
        newQuery = query.replaceAt(i, 'ʰ');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case '?':
        newQuery = query.replaceAt(i, 'ʔ');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case "'":
        newQuery = query.replaceAt(i, '’');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case '.':
        newQuery = query.replaceAt(i, '·');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case ':':
        newQuery = query.replaceAt(i, '·');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case 'a':
        newQuery = query.replaceAt(i, 'á');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case 'e':
        newQuery = query.replaceAt(i, 'é');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case 'i':
        newQuery = query.replaceAt(i, 'í');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case 'o':
        newQuery = query.replaceAt(i, 'ó');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      case 'u':
        newQuery = query.replaceAt(i, 'ú');
        queries.add(newQuery);
        makeQueries(queries, query, i + 1);
        makeQueries(queries, newQuery, i + 1);
        break;
      default:
        makeQueries(queries, query, i + 1);
        break;
    }
  };
  // fuction called to debounce search
  const delaySearch = useCallback(
    debounce((event, rowsTemp2) => {
      if (event.target.value === '') {
        setRows(rowsTemp2);
      } else {
        const rowsNewTemp = rowsTemp2;
        const query = event.target.value.toLowerCase();
        const kashayaQueries = new Set();
        kashayaQueries.add(query);
        makeQueries(kashayaQueries, query, 0);
        const kashayaQueriesArr = Array.from(kashayaQueries);
        const newRows = rowsNewTemp.filter(
          (row) =>
            row.english.toLowerCase().includes(query) ||
            kashayaQueriesArr.some((q) => row.kashaya.includes(q))
        );
        setRows(newRows);
      }
    }, 250),
    []
  );
  // function triggered when seach input change
  const onChangeSearchInput = (event) => {
    event.persist();
    delaySearch(event, rowsTemp, rowsState);
  };
  // eslint-disable-next-line
  String.prototype.replaceAt = function (index, replacement) {
    return (
      this.substr(0, index) +
      replacement +
      this.substr(index + replacement.length)
    );
  };

  /**
   * Filter by categories
   */
  useEffect(() => {
    inputRef.current.children[0].value = '';
    // filter categories and subcategories
    const newRows = rows.filter((row) => {
      if (selectedCategories.length === 0) {
        return true;
      }
      const intersection = row.category.filter((x) =>
        selectedCategories.includes(x)
      );
      if (intersection.length > 0) {
        return true;
      }
      return false;
    });
    // filter speakers
    const newRows2 = newRows.filter((row) => {
      if (selectedSpeakers.length === 0) {
        return true;
      }
      const rowSpeakers = row.speaker.map((path) =>
        path.substring(path.length - 6, path.length - 4)
      );
      const intersection = selectedSpeakers.filter((x) =>
        rowSpeakers.includes(x)
      );
      if (intersection.length > 0) {
        return true;
      }
      return false;
    });
    setRows(newRows2);
    setRowsTemp(newRows2);
  }, [selectedCategories, selectedSpeakers]);

  /**
   * Audio
   */
  const playWord = (speakerParam) => {
    new Audio(speakerParam).play();
    // audioMap[speaker].play();
  };

  /**
   * Render
   */
  return (
    <div className={classes.root}>
      <FilterModal2
        categories={categories}
        openFilter={openFilter}
        speakers={speakers}
        handleCloseFilter={handleCloseFilter}
        setSelectedCategories={setSelectedCategories}
        setSelectedSpeakers={setSelectedSpeakers}
        setFilterCount={setFilterCount}
      />
      <AppBar
        onChangeSearchInput={onChangeSearchInput}
        inputRef={inputRef}
        handleOpenFilter={handleOpenFilter}
        filtersCount={filtersCount}
        version="/all2"
      />
      <Container maxWidth="lg" className={classes.container}>
        {/* Table Container */}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Grid container direction="row">
                    {orderBy === 'english' ? (
                      <Typography style={{ paddingTop: 3 }}>
                        English Word / Phrase
                      </Typography>
                    ) : (
                      <Typography style={{ paddingTop: 3 }}>
                        Kashaya Word / Phrase
                      </Typography>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleOrderByChange()}
                    >
                      <LoopIcon />
                    </IconButton>
                  </Grid>
                </TableCell>
                <Hidden xsDown>
                  <TableCell align="left">
                    <Typography>Listen</Typography>
                  </TableCell>
                </Hidden>
                {/* <TableCell style={{width: "30%"}}><Typography>Category</Typography></TableCell> */}
              </TableRow>
            </TableHead>
            {/* Table Body */}
            <TableBody>
              {stableSort(rowsState, getComparator(order, orderBy)).map(
                (row) => (
                  <TableRow key={row.english}>
                    <Hidden xsDown>
                      <TableCell align="left">
                        {orderBy === 'english' ? (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.english}
                            </Typography>
                            <Typography>{row.kashaya}</Typography>
                          </div>
                        ) : (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.kashaya}
                            </Typography>
                            <Typography>{row.english}</Typography>
                          </div>
                        )}
                      </TableCell>
                    </Hidden>
                    <Hidden smUp>
                      <TableCell align="left">
                        {orderBy === 'english' ? (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.english}
                            </Typography>
                            <Typography>{row.kashaya}</Typography>
                          </div>
                        ) : (
                          <div>
                            <Typography style={{ fontWeight: 700 }}>
                              {row.kashaya}
                            </Typography>
                            <Typography>{row.english}</Typography>
                          </div>
                        )}
                        <Grid container direction="column">
                          {row.speaker.map((audio) => (
                            <Button
                              style={{ marginBottom: 5, width: '20%' }}
                              key={audio}
                              size="small"
                              variant="contained"
                              color="primary"
                              onClick={() => playWord(audio)}
                            >
                              ▶{' '}
                              {audio.substring(
                                audio.length - 6,
                                audio.length - 4
                              )}
                            </Button>
                          ))}
                        </Grid>
                      </TableCell>
                    </Hidden>
                    {/* <TableCell align="right">{row.speaker}</TableCell> */}
                    <Hidden xsDown>
                      <TableCell align="left">
                        {/* <Player speakerPaths={row.speaker} /> */}
                        <Grid container direction="column">
                          {row.speaker.map((audio) => (
                            <Button
                              style={{ marginBottom: 5, width: '20%' }}
                              key={audio}
                              size="small"
                              variant="contained"
                              color="primary"
                              onClick={() => playWord(audio)}
                            >
                              ▶{' '}
                              {audio.substring(
                                audio.length - 6,
                                audio.length - 4
                              )}
                            </Button>
                          ))}
                        </Grid>
                      </TableCell>
                    </Hidden>
                    {/* <TableCell align="left">
                      {row.category.map(cat =>
                        <Chip
                          size="small"
                          label={cat}
                          color="secondary"
                          style={{ marginRight: 5, marginBottom: 5 }} />
                      )}
                    </TableCell> */}
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {/* </Container> */}
    </div>
  );
}

export default AllList;
