import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// @components
import IconButton from '@material-ui/core/IconButton';
import TagIcon from '@material-ui/icons/Loyalty';
import EditIcon from '@material-ui/icons/Create';
import RemoveIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import YoutubeIcon from '@material-ui/icons/PlayCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import './style.scss';

const choosePlayIcon = (video, action) => {
    if (video.isFromYoutube) {
        return <YoutubeIcon onClick={action} />;
    }
    return <PlayIcon onClick={action} />;
};

const VideoItem = ({ active, actions, video }) => {
    const classes = classNames(
        'video-clipper__list--item',
        { 'video-clipper__list--item--active': active }
    );
    return (
        <Paper className={classes} elevation={1}>
            <div className="video-clipper__list--item__play-button">
                <IconButton>
                    {
                        choosePlayIcon(
                            video,
                            () => actions.setActiveVideo(video.id)
                        )
                    }
                </IconButton>
            </div>

            <div className="video-clipper__list--item__name" onClick={() => actions.setActiveVideo(video.id)}>
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
};

VideoItem.propTypes = {
    active: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    video: PropTypes.object.isRequired
};

export default VideoItem;
