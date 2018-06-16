import React from 'react';
import PropTypes from 'prop-types';

const ExternalVideo = ({ video }) =>
    video ?
        <video
            controls
            src={video.url}
            width="620"
        >
            <track kind="captions" />
        </video> :
        <h1>No video selected</h1>;

ExternalVideo.propTypes = {
    video: PropTypes.object
};

ExternalVideo.defaultProps = {
    video: null
};

export default ExternalVideo;
