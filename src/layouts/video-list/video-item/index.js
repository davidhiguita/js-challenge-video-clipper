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
import MainVideoIcon from '@material-ui/icons/VideoLibrary';
import Tooltip from '@material-ui/core/Tooltip';

import './style.scss';

const choosePlayIcon = (isClip, video, action) => {
    if (isClip) {
        if (video.isFromYoutube) {
            return <YoutubeIcon onClick={action} />;
        }
        return <PlayIcon onClick={action} />;
    }
    return <MainVideoIcon onClick={action} />;
};

const VideoItem = (props) => {
    const {
        active,
        actions,
        isClip,
        video
    } = props;

    const classes = classNames(
        'video-clipper__list--item',
        { 'video-clipper__list--item--active': active },
        { 'video-clipper__list--item--is-main': !isClip },
    );

    return (
        <Paper className={classes} elevation={1}>
            <div className="video-clipper__list--item__play-button">
                <IconButton>
                    {
                        choosePlayIcon(
                            isClip,
                            video,
                            () => actions.setActiveVideo(video.id, isClip)
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
                {
                    isClip && (
                        <Tooltip title="Edit">
                            <EditIcon />
                        </Tooltip>
                    )
                }
                {
                    isClip && (
                        <Tooltip title="Remove">
                            <RemoveIcon />
                        </Tooltip>
                    )
                }
            </div>
        </Paper>
    );
};

VideoItem.propTypes = {
    active: PropTypes.bool,
    actions: PropTypes.object.isRequired,
    isClip: PropTypes.bool,
    video: PropTypes.object.isRequired
};

VideoItem.defaultProps = {
    active: false,
    isClip: true
};

export default VideoItem;
