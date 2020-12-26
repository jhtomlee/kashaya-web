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

function FilterModal(props) {
  const classes = useStyles();
  const {
    openFilter,
    handleCloseFilter,
    categories,
    subcategories,
    speakers,
    setSelectedCategories,
    setSelectedSubcategories,
    setSelectedSpeakers,
    setFilterCount,
  } = props;
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [categoryOptionsTemp, setCategoryOptionsTemp] = useState([]);
  const [subcategoryOptionsTemp, setSubCategoryOptionsTemp] = useState([]);
  const [speakerOptionsTemp, setSpeakerOptionsTemp] = useState([]);
  const handleChangeCategories = (selectedOption) => {
    // clear previous
    setCategoryOptionsTemp([]);
    setSubcategoryOptions([]);
    setSubCategoryOptionsTemp([]);

    // create and show subcategories
    if (selectedOption) {
      setCategoryOptionsTemp(selectedOption);
      const temp = {
        label: selectedOption.label,
        options: subcategories[selectedOption.label],
      };
      setSubcategoryOptions([temp]);

      // set category
      setSelectedCategories(selectedOption.value);
    }
    // clear categories
    else {
      setSelectedCategories([]);
    }
    // Code for multiple categories:
    /* 
      setCategoryOptionsTemp(selectedOption)
      //create subcategoryOptions
      const groupedOption = []
      if (selectedOption){
        let temp;
        console.log(selectedOption)
        selectedOption.forEach((category) => {
          temp = {
            label: category.label,
            options: subcategories[category.label]
          }
          console.log(category.label, temp)
          groupedOption.push(temp)
        })
      }
      setSubcategoryOptions(groupedOption)

      //set selectedCategories
      const selectedCategories = selectedOption? selectedOption.map(category => category.value ) : []
      setSelectedCategories(selectedCategories)
    */
  };
  const handleChangeSubcategories = (selectedOption) => {
    setSubCategoryOptionsTemp(selectedOption);
    // set selectedSubcategories
    const selectedSubcategories = {};
    if (selectedOption) {
      selectedOption.forEach((subcategory) => {
        if (subcategory.category in selectedSubcategories) {
          selectedSubcategories[subcategory.category].push(subcategory.value);
        } else {
          selectedSubcategories[subcategory.category] = [subcategory.value];
        }
      });
    }
    setSelectedSubcategories(selectedSubcategories);
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
    handleChangeSubcategories([]);
    handleChangeCategories(null);
  };

  // update count
  useEffect(() => {
    let count = 0;
    if (!categoryOptionsTemp || categoryOptionsTemp.length === 0) {
      count += 0;
    } else {
      count += 1;
    }
    if (subcategoryOptionsTemp) {
      count += subcategoryOptionsTemp.length;
    }
    if (speakerOptionsTemp) {
      count += speakerOptionsTemp.length;
    }
    setFilterCount(count);
    // eslint-disable-next-line
  }, [categoryOptionsTemp, subcategoryOptionsTemp, speakerOptionsTemp]);

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

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
            isClearable
            isSearchable={false}
            className={classes.categoriesSelect}
            onChange={handleChangeCategories}
            options={categories}
            value={categoryOptionsTemp}
          />
          <br />
          <Typography>Subcategories</Typography>
          <Select
            className={classes.categoriesSelect}
            isMulti
            isSearchable={false}
            onChange={handleChangeSubcategories}
            options={subcategoryOptions}
            formatGroupLabel={formatGroupLabel}
            value={subcategoryOptionsTemp}
          />
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

FilterModal.propTypes = {
  handleCloseFilter: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  subcategories: PropTypes.objectOf(PropTypes.array).isRequired,
  speakers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  setSelectedSubcategories: PropTypes.func.isRequired,
  setSelectedSpeakers: PropTypes.func.isRequired,
  setFilterCount: PropTypes.func.isRequired,
  openFilter: PropTypes.bool.isRequired,
};

export default FilterModal;
