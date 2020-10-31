import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Typography } from '@material-ui/core/';
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300
    // maxWidth: 500
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  categoriesSelect: {
    width: '100%',
    maxWidth: 300
  }
}));

function FilterModal(props) {
  const classes = useStyles();
  const { openFilter,
    handleCloseFilter,
    categories,
    subcategories,
    speakers,
    setSelectedCategories,
    setSelectedSubcategories,
    setSelectedSpeakers
  } = props;
  const [subcategoryOptions, setSubcategoryOptions] = useState([])
  const [categoryOptionsTemp, setCategoryOptionsTemp] = useState([])
  const [subcategoryOptionsTemp, setSubCategoryOptionsTemp] = useState([])
  const [speakerOptionsTemp, setSpeakerOptionsTemp] = useState([])
  const handleChangeCategories = (selectedOption) => {

    // clear previous
    setCategoryOptionsTemp([])
    setSubcategoryOptions([])
    setSubCategoryOptionsTemp([])

    // create and show subcategories
    if (selectedOption) {
      setCategoryOptionsTemp(selectedOption)
      const temp = {
        label: selectedOption.label,
        options: subcategories[selectedOption.label]
      }
      setSubcategoryOptions([temp])

      // set category
      setSelectedCategories(selectedOption.value)

    } 
    // clear categories
    else {
      setSelectedCategories([])
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
    setSubCategoryOptionsTemp(selectedOption)
    //set selectedSubcategories
    const selectedSubcategories = {}
    if (selectedOption) {
      selectedOption.forEach((subcategory) => {
        if (subcategory.category in selectedSubcategories) {
          selectedSubcategories[subcategory.category].push(subcategory.value)
        } else {
          selectedSubcategories[subcategory.category] = [subcategory.value]
        }
      })
    }
    setSelectedSubcategories(selectedSubcategories)
  };
  const handleChangeSpeakers = (selectedOption) => {
    // at least one speaker selected
    if (selectedOption){
      setSpeakerOptionsTemp(selectedOption)
      const speakers_val = selectedOption.map(speaker_obj => speaker_obj.value)
      setSelectedSpeakers(speakers_val)
    } 
    // none selected
    else {
      setSpeakerOptionsTemp([])
      setSelectedSpeakers([])
    }
  }

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };
  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center"
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
            isClearable={true}
            className={classes.categoriesSelect}
            onChange={handleChangeCategories}
            options={categories}
            value={categoryOptionsTemp}
          />
          <br></br>
          <Typography>Subcategories</Typography>
          <Select className={classes.categoriesSelect}
            isMulti
            onChange={handleChangeSubcategories}
            options={subcategoryOptions}
            formatGroupLabel={formatGroupLabel}
            value={subcategoryOptionsTemp}
          />
          <h2 id="transition-modal-title">Filter by speaker</h2>
          <Typography>Speaker</Typography>
          <Select className={classes.categoriesSelect}
            isMulti
            onChange={handleChangeSpeakers}
            options={speakers}
            value={speakerOptionsTemp}
          />
        </div>
      </Fade>
    </Modal>
  );
}

export default FilterModal;
