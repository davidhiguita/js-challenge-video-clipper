import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import CutVideoIcon from '@material-ui/icons/ContentCut';
import AddVideoIcon from '@material-ui/icons/AddCircle';
import PlayOriginalVideoIcon from '@material-ui/icons/PlayCircleFilled';
import Tooltip from '@material-ui/core/Tooltip';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ReactiveBase, RangeSlider } from '@appbaseio/reactivesearch';

import './style.scss';

class Controls extends Component {
    state = {
        anchorMenuMore: null
    }

    openAchorMenuMore = e => this.setState({ anchorMenuMore: e.currentTarget })

    closeAchorMenuMore = () => this.setState({ anchorMenuMore: null })

    render() {
        const {
            activeClipIndex,
            addClip,
            clips,
            newClipTime,
            setActiveClipIndex,
            setActiveUrl,
            setModalVisibility,
            setNewClipTime,
            video
        } = this.props;

        const { anchorMenuMore } = this.state;

        const getTwoDigits = v => v > 9 ? v : `0${v}`;
        const getTimeFromSeconds = (s) => {
            const minutes = parseInt(s / 60, 10);
            const seconds = parseInt(s % 60, 10);
            return `${getTwoDigits(minutes)}:${getTwoDigits(seconds)}`;
        };

        const selectedRange = {
            start: 0
        };

        const isDefaultVideoDuration = video.minutes === 0 && video.seconds === 0;

        if (isDefaultVideoDuration) {
            selectedRange.end = 2;
        } else {
            selectedRange.end = parseInt(video.seconds, 10) + (parseInt(video.minutes, 10) * 60);
        }

        return (
            <div className="controls">
                <div className="controls__range">
                    <ReactiveBase
                        app="car-store"
                        credentials="cf7QByt5e:d2d60548-82a9-43cc-8b40-93cbbe75c34c"
                    >
                        <RangeSlider
                            componentId="duration-slider"
                            dataField="duration-slider"
                            defaultSelected={newClipTime}
                            interval={1}
                            onValueChange={setNewClipTime}
                            range={selectedRange}
                            stepValue={1}
                        />
                    </ReactiveBase>
                </div>

                <div className="controls__clip-time">
                    <span>{getTimeFromSeconds(newClipTime.start)} - {getTimeFromSeconds(newClipTime.end)}</span>
                </div>

                <div className="controls__actions">
                    <div className="controls__actions__cut">
                        <Tooltip
                            id="tooltip-icon"
                            title="Create new clip"
                        >
                            <IconButton
                                aria-label="Cut"
                            >
                                <CutVideoIcon
                                    onClick={isDefaultVideoDuration ? () => {} : addClip}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <div className="controls__actions__previous">
                        <IconButton
                            aria-label="previous"
                            disabled={
                                !clips.length ||
                                activeClipIndex <= 0
                            }
                        >
                            <SkipPreviousIcon onClick={() => setActiveClipIndex('previous')} />
                        </IconButton>
                    </div>

                    <div className="controls__actions__next">
                        <IconButton
                            aria-label="next"
                            disabled={
                                !clips.length ||
                                activeClipIndex === clips.length - 1 ||
                                activeClipIndex === -1
                            }
                        >
                            <SkipNextIcon onClick={() => setActiveClipIndex('next')} />
                        </IconButton>
                    </div>

                    <div className="">
                        <Tooltip
                            id="tooltip-icon"
                            title="More actions"
                        >
                            <IconButton
                                aria-label="More"
                                aria-owns={anchorMenuMore ? 'long-menu' : null}
                                aria-haspopup="true"
                                onClick={this.openAchorMenuMore}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <div className="controls__actions__more">
                        <Menu
                            anchorEl={anchorMenuMore}
                            id="menu-more"
                            onClose={this.closeAchorMenuMore}
                            open={Boolean(anchorMenuMore)}
                        >
                            <MenuItem onClick={setModalVisibility}>
                                <IconButton aria-label="Add">
                                    <AddVideoIcon />
                                </IconButton>
                                Change main video
                            </MenuItem>

                            {
                                video.url &&
                                    <MenuItem onClick={() => setActiveUrl(video.url)}>
                                        <IconButton
                                            aria-label="Add"
                                        >
                                            <PlayOriginalVideoIcon />
                                        </IconButton>
                                        Original video to player
                                    </MenuItem>
                            }
                        </Menu>
                    </div>
                </div>
            </div>
        );
    }
}

Controls.propTypes = {
    activeClipIndex: PropTypes.number.isRequired,
    addClip: PropTypes.func.isRequired,
    clips: PropTypes.array.isRequired,
    newClipTime: PropTypes.object.isRequired,
    setActiveClipIndex: PropTypes.func.isRequired,
    setActiveUrl: PropTypes.func.isRequired,
    setModalVisibility: PropTypes.func.isRequired,
    setNewClipTime: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
};

export default Controls;
