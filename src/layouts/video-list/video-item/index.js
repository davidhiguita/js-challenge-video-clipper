import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// @components
import IconButton from '@material-ui/core/IconButton';
import TagIcon from '@material-ui/icons/Loyalty';
import EditIcon from '@material-ui/icons/Create';
import RefreshIcon from '@material-ui/icons/Refresh';
import RemoveIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import YoutubeIcon from '@material-ui/icons/PlayCircleOutline';
import MainVideoIcon from '@material-ui/icons/VideoLibrary';
import Tooltip from '@material-ui/core/Tooltip';

import './style.scss';

const VideoItem = (props) => {
    const {
        active,
        edit,
        isClip,
        isPlayingVideo,
        remove,
        setActiveVideo,
        video
    } = props;

    const classes = classNames(
        'video-clipper__list--item',
        { 'video-clipper__list--item--active': active },
        { 'video-clipper__list--item--is-main': !isClip },
    );

    const choosePlayIcon = (action) => {
        if (isClip) {
            if (video.isFromYoutube) {
                return <YoutubeIcon onClick={action} />;
            }
            if (isPlayingVideo && active) {
                return <PauseIcon onClick={action} />;
            }
            return <PlayIcon onClick={action} />;
        }
        if (isPlayingVideo && active) {
            return <PauseIcon onClick={action} />;
        }
        return <MainVideoIcon onClick={action} />;
    };

    return (
        <Paper className={classes} elevation={1}>
            <div className="video-clipper__list--item__play-button">
                <IconButton>
                    {
                        choosePlayIcon(
                            () => setActiveVideo(video.id, isClip)
                        )
                    }
                </IconButton>
            </div>

            <div className="video-clipper__list--item__info">
                <div
                    className="video-clipper__list--item__info__name"
                    onClick={() => setActiveVideo(video.id, isClip)}
                >
                    {video.name}
                </div>

                <div className="video-clipper__list--item__info__duration">
                    {isClip ? `${video.start} - ${video.end}` : video.duration}
                </div>
            </div>

            <div className="video-clipper__list--item__actions">
                { video.tags && !!video.tags.length && (
                    <Tooltip title={`${video.tags.length} tags`}>
                        <TagIcon />
                    </Tooltip>
                )}
                <Tooltip title={isClip ? 'Edit' : 'Refresh'}>
                    {
                        isClip ?
                            <EditIcon onClick={edit} /> :
                            <RefreshIcon onClick={edit} />
                    }
                </Tooltip>
                {
                    isClip && (
                        <Tooltip title="Remove">
                            <RemoveIcon onClick={remove} />
                        </Tooltip>
                    )
                }
            </div>
        </Paper>
    );
};

VideoItem.propTypes = {
    active: PropTypes.bool,
    edit: PropTypes.func.isRequired,
    isClip: PropTypes.bool,
    isPlayingVideo: PropTypes.bool.isRequired,
    remove: PropTypes.func,
    setActiveVideo: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
};

VideoItem.defaultProps = {
    active: false,
    isClip: true,
    remove: () => {}
};

export default VideoItem;
