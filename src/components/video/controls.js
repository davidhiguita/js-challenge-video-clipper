import React from 'react';
import PropTypes from 'prop-types';

// import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import CutVideoIcon from '@material-ui/icons/ContentCut';
import AddVideoIcon from '@material-ui/icons/AddCircle';
import PlayOriginalVideoIcon from '@material-ui/icons/PlayCircleFilled';
import Tooltip from '@material-ui/core/Tooltip';
import { ReactiveBase, RangeSlider } from '@appbaseio/reactivesearch';

const Controls = (props) => {
    const {
        addClip,
        newClipTime,
        setActiveUrl,
        setModalVisibility,
        setNewClipTime,
        video
    } = props;

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
        <div className="player__controls">
            <div className="player__controls__range">
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

            <div className="player__controls__clip-time">
                <span>{getTimeFromSeconds(newClipTime.start)} - {getTimeFromSeconds(newClipTime.end)}</span>
            </div>

            <div className="player__controls__actions">
                <div className="player__controls__actions__cut">
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

                <div className="player__controls__actions__new-video">
                    <Tooltip
                        id="tooltip-icon"
                        title="Set original video"
                    >
                        <IconButton
                            aria-label="Add"
                            onClick={setModalVisibility}
                        >
                            <AddVideoIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                <div className="player__controls__actions__new-video">
                    <Tooltip
                        id="tooltip-icon"
                        title="Play original video"
                    >
                        <IconButton
                            aria-label="Add"
                            onClick={() => setActiveUrl(video.url)}
                        >
                            <PlayOriginalVideoIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

Controls.propTypes = {
    addClip: PropTypes.func.isRequired,
    newClipTime: PropTypes.object.isRequired,
    setActiveUrl: PropTypes.func.isRequired,
    setModalVisibility: PropTypes.func.isRequired,
    setNewClipTime: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
};

export default Controls;
