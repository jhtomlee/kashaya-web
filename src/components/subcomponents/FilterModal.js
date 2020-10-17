import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Grid } from '@material-ui/core/';
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
  },

}));



function getStyles(name, element, theme) {
  return {
    fontWeight:
      element.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
  };
}

function FilterModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { openFilter,
    handleCloseFilter,
    categories,
    subcategories,
    setSelectedCategories,
    setSelectedSubcategories
  } = props;
  const [subcategoryOptions, setSubcategoryOptions] = useState([])
  const [categoryOptionsTemp, setCategoryOptionsTemp] = useState([])
  const [subcategoryOptionsTemp, setsubCategoryOptionsTemp] = useState([])
  const handleChangeCategories = (selectedOption) => {
    
    // clear previous
    setCategoryOptionsTemp([])
    setSubcategoryOptions([])
    setsubCategoryOptionsTemp([])

    // create and show subcategories
    setCategoryOptionsTemp(selectedOption)
    const temp = {
      label: selectedOption.label,
      options: subcategories[selectedOption.label]
    }
    setSubcategoryOptions([temp])

    // set category
    setSelectedCategories(selectedOption.value)

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
    setsubCategoryOptionsTemp(selectedOption)
    //set selectedSubcategories
    const selectedSubcategories = {}
    if (selectedOption){
      selectedOption.forEach((subcategory) => {
        if (subcategory.category in selectedSubcategories){
          selectedSubcategories[subcategory.category].push(subcategory.value)
        } else {
          selectedSubcategories[subcategory.category] = [subcategory.value]
        }
      })
    }
    console.warn(selectedSubcategories)
    setSelectedSubcategories(selectedSubcategories)
  };

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
          <Select 
            className={classes.categoriesSelect}
            onChange={handleChangeCategories}
            options={categories}
            value={categoryOptionsTemp}
          />
          <br></br>
          <Select className={classes.categoriesSelect}
            isMulti
            onChange={handleChangeSubcategories}
            options={subcategoryOptions}
            formatGroupLabel={formatGroupLabel}
            value={subcategoryOptionsTemp}
          />
        </div>
      </Fade>
    </Modal>
  );
}

export default FilterModal;
