import React from 'react';
import PropTypes from 'prop-types';

// @material acomponents
import AddIcon from '@material-ui/icons/AddCircle';

// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NextIcon from '@material-ui/icons/SkipNext';
import PreviousIcon from '@material-ui/icons/SkipPrevious';

// @styles
import './style.scss';

const ActionsBar = ({ disabledControls, playVideo }) => (
    <div className="video-clipper__list__actions-bar">
        <IconButton
            disabled={disabledControls.previous}
            onClick={() => playVideo('previous')}
        >
            <PreviousIcon />
        </IconButton>

        <IconButton>
            <AddIcon />
        </IconButton>

        <IconButton
            disabled={disabledControls.next}
            onClick={() => playVideo('next')}
        >
            <NextIcon />
        </IconButton>
    </div>
);

ActionsBar.propTypes = {
    disabledControls: PropTypes.object.isRequired,
    playVideo: PropTypes.func.isRequired
};

export default ActionsBar;
