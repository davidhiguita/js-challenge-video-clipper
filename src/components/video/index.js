import React from 'react';
import PropTypes from 'prop-types';

// @styles
import './style.scss';

const Video = (props) => {
    const {
        activeUrl
    } = props;

    return (
        <div className="video">
            <video
                autoPlay
                controls
                src={activeUrl}
            >
                <track kind="captions" />
            </video>
        </div>
    );
};

Video.propTypes = {
    activeUrl: PropTypes.string.isRequired
};

export default Video;
