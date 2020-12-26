import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  DialogActions,
  Button,
} from '@material-ui/core/';
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: 300,
    marginTop: 64,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  categoriesSelect: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

function FilterModal2(props) {
  const classes = useStyles();
  const {
    openFilter,
    handleCloseFilter,
    categories,
    speakers,
    setSelectedCategories,
    setSelectedSpeakers,
    setFilterCount,
  } = props;
  const [categoryOptionsTemp, setCategoryOptionsTemp] = useState([]);
  const [speakerOptionsTemp, setSpeakerOptionsTemp] = useState([]);
  const handleChangeCategories = (selectedOption) => {
    // clear previous
    setCategoryOptionsTemp([]);

    // create and show subcategories
    if (selectedOption) {
      setCategoryOptionsTemp(selectedOption);
      // set category
      const temp = [];
      selectedOption.forEach((cat) => temp.push(cat.value));
      setSelectedCategories(temp);
    }
    // clear categories
    else {
      setSelectedCategories([]);
    }
  };
  const handleChangeSpeakers = (selectedOption) => {
    // at least one speaker selected
    if (selectedOption) {
      setSpeakerOptionsTemp(selectedOption);
      const speakersVal = selectedOption.map((speakerObj) => speakerObj.value);
      setSelectedSpeakers(speakersVal);
    }
    // none selected
    else {
      setSpeakerOptionsTemp([]);
      setSelectedSpeakers([]);
    }
  };

  const clearAllFilters = () => {
    handleChangeSpeakers([]);
    handleChangeCategories([]);
  };

  // update count
  useEffect(() => {
    let count = 0;
    if (categoryOptionsTemp) {
      count += categoryOptionsTemp.length;
    }
    if (speakerOptionsTemp) {
      count += speakerOptionsTemp.length;
    }
    setFilterCount(count);
    // eslint-disable-next-line
  }, [categoryOptionsTemp, speakerOptionsTemp]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openFilter}
      onClose={handleCloseFilter}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openFilter}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Filter by category</h2>
          <Typography>Category</Typography>
          <Select
            isMulti
            isClearable
            isSearchable
            className={classes.categoriesSelect}
            onChange={handleChangeCategories}
            options={categories}
            value={categoryOptionsTemp}
          />
          <br />
          <h2 id="transition-modal-title">Filter by speaker</h2>
          <Typography>Speaker</Typography>
          <Select
            isMulti
            isSearchable={false}
            onChange={handleChangeSpeakers}
            options={speakers}
            value={speakerOptionsTemp}
            maxMenuHeight={120}
          />
          <DialogActions className={classes.button}>
            <Button color="primary" onClick={clearAllFilters}>
              Clear All
            </Button>
            <Button color="primary" onClick={handleCloseFilter}>
              Okay
            </Button>
          </DialogActions>
        </div>
      </Fade>
    </Modal>
  );
}

FilterModal2.propTypes = {
  handleCloseFilter: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  speakers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  setSelectedSpeakers: PropTypes.func.isRequired,
  setFilterCount: PropTypes.func.isRequired,
  openFilter: PropTypes.bool.isRequired,
};

export default FilterModal2;
