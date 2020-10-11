import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
    // subcategories,
    selectedCategories,
    // selectedSubcategories,
    setSelectedCategories,
    // setSelectedSubcategories
  } = props;
  const handleChangeCategories = (event) => {
    setSelectedCategories(event.target.value);
  };
  // const handleChangeSubcategories = (event) => {
  //   console.log(event.target.value)
  //   setSelectedSubcategories(event.target.value);
  // };


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
          <h2 id="transition-modal-title">Filter by categories</h2>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Categories</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={selectedCategories}
                onChange={handleChangeCategories}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {categories.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles(name, selectedCategories, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <br></br>

          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}

export default FilterModal;
