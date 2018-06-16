import React from 'react';
import PropTypes from 'prop-types';

// @components
import IconButton from '@material-ui/core/IconButton';
import TagIcon from '@material-ui/icons/Loyalty';
import EditIcon from '@material-ui/icons/Create';
import RemoveIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import YoutubeIcon from '@material-ui/icons/PlayCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import './style.scss';

const choosePlayIcon = (activeVideo, video, action) => {
    if ((activeVideo.id === video.id) && activeVideo.playing) {
        if (video.isFromYoutube) {
            return <YoutubeIcon onClick={action} />;
        }
        return <PlayIcon onClick={action} />;
    }
    return <PauseIcon onClick={action} />;
};

const VideoItem = ({ activeVideo, actions, video }) => (
    <Paper className="video-clipper__list--item" elevation={6}>
        <div className="video-clipper__list--item__play-button">
            <IconButton>
                {
                    choosePlayIcon(
                        activeVideo,
                        video,
                        () => actions.setActiveVideo(video.id)
                    )
                }
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
    </Paper>
);

VideoItem.propTypes = {
    activeVideo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    video: PropTypes.object.isRequired
};

export default VideoItem;
