import React from 'react';
import PropTypes from 'prop-types';

const YoutubeVideo = ({ video }) => (
    <iframe
        title={video.id}
        src={video.url}
        frameBorder="0"
        allowFullScreen
    />
);

YoutubeVideo.propTypes = {
    video: PropTypes.object.isRequired
};

export default YoutubeVideo;
