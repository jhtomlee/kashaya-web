import React, { useState, useEffect } from 'react';
import {
  Button, IconButton, MenuItem, Menu
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ITEM_HEIGHT = 48;

function Player(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [audioMap, setAudioMap] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const open = Boolean(anchorEl);

  const { speakerPaths } = props;

  useEffect(() => {
    const temp = {}
    speakerPaths.forEach(speakerPath => {
      temp[speakerPath] = new Audio(speakerPath)
    })
    setAudioMap(temp)
    setSelectedAudio(speakerPaths[0])
  }, [speakerPaths]);

  const playWord = () =>{
    audioMap[selectedAudio].play();
  }

  const handleSpeakerClicked = (speakerPath) => {
    setSelectedAudio(speakerPath)
    handleClose();
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getSpeakerName = (path) =>{
    const n = path.length
    const speaker = path.substring(n-6, n)
    return speaker
  }

  return (
    <div>
      <Button size="small" onClick={() => playWord()} 
      variant="contained"
      color="primary">
        <span role="img" aria-label="play_symbol">▶️{' '}</span> 
        {' Play'}
      </Button>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {speakerPaths.map((speakerPath) => (
          <MenuItem key={speakerPath}
            selected={speakerPath === selectedAudio}
            onClick={() => handleSpeakerClicked(speakerPath)}>
            {getSpeakerName(speakerPath)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default Player;