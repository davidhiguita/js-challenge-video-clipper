import React from 'react';
import PropTypes from 'prop-types';

// @material acomponents
import AddIcon from '@material-ui/icons/AddCircle';

import IconButton from '@material-ui/core/IconButton';
import NextIcon from '@material-ui/icons/SkipNext';
import PreviousIcon from '@material-ui/icons/SkipPrevious';
import Tooltip from '@material-ui/core/Tooltip';

// @styles
import './style.scss';

const ActionsBar = ({ disabledControls, openModalCreate, playVideo }) => (
    <div className="video-clipper__list__actions-bar">
        <IconButton
            disabled={disabledControls.previous}
            onClick={() => playVideo('previous')}
        >
            <PreviousIcon />
        </IconButton>

        <Tooltip title="Create a new clip">
            <IconButton onClick={openModalCreate}>
                <AddIcon />
            </IconButton>
        </Tooltip>

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
    openModalCreate: PropTypes.func.isRequired,
    playVideo: PropTypes.func.isRequired
};

export default ActionsBar;
