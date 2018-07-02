import React, { Component } from 'react';
import PropTypes from 'prop-types';

// @components
import Controls from './controls';

// @styles
import './style.scss';

// https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4
// https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4

class Video extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            activeClipIndex,
            activeUrl,
            addClip,
            clips,
            newClipTime,
            setActiveClipIndex,
            setActiveUrl,
            setModalVisibility,
            setNewClipTime,
            video
        } = this.props;

        return (
            <div className="player">
                <div className="player__video">
                    <video
                        autoPlay
                        controls
                        src={activeUrl}
                    >
                        <track kind="captions" />
                    </video>
                </div>

                <Controls
                    activeClipIndex={activeClipIndex}
                    addClip={addClip}
                    clips={clips}
                    newClipTime={newClipTime}
                    setActiveClipIndex={setActiveClipIndex}
                    setActiveUrl={setActiveUrl}
                    setModalVisibility={setModalVisibility}
                    setNewClipTime={setNewClipTime}
                    video={video}
                />
            </div>
        );
    }
}

Video.propTypes = {
    activeClipIndex: PropTypes.number.isRequired,
    activeUrl: PropTypes.string.isRequired,
    addClip: PropTypes.func.isRequired,
    clips: PropTypes.array.isRequired,
    newClipTime: PropTypes.object.isRequired,
    setActiveClipIndex: PropTypes.func.isRequired,
    setActiveUrl: PropTypes.func.isRequired,
    setModalVisibility: PropTypes.func.isRequired,
    setNewClipTime: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
};

export default Video;
