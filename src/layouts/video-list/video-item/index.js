import React from 'react';
import PropTypes from 'prop-types';

// @components
import IconButton from '@material-ui/core/IconButton';
import TagIcon from '@material-ui/icons/Loyalty';
import EditIcon from '@material-ui/icons/Create';
import RemoveIcon from '@material-ui/icons/Delete';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import YoutubeIcon from '@material-ui/icons/PlayCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import './style.scss';

const VideoItem = ({ setActiveVideo, video }) => (
    <div className="video-clipper__list--item">
        <div className="video-clipper__list--item__play-button">
            <IconButton>
                {
                    video.isFromYoutube ?
                        <YoutubeIcon onClick={setActiveVideo(video.id)} /> :
                        <PlayIcon onClick={() => setActiveVideo(video.id)} /> }
            </IconButton>
        </div>

        <div className="video-clipper__list--item__name">
            {video.name}
        </div>

        <div className="video-clipper__list--item__actions">
            { !!video.tags.length && (
                <Tooltip title={`${video.tags.length} tags`}>
                    <TagIcon />
                </Tooltip>
            )}
            <Tooltip title="Edit">
                <EditIcon />
            </Tooltip>
            <Tooltip title="Remove">
                <RemoveIcon />
            </Tooltip>
        </div>
    </div>
);

VideoItem.propTypes = {
    setActiveVideo: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
};

export default VideoItem;
