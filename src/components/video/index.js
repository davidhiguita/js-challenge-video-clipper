import React, { Component } from 'react';
import PropTypes from 'prop-types';

// @components
import Controls from './controls';

// @styles
import './style.scss';

// https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4
// https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4

class Video extends Component {
    state = {}

    render() {
        const {
            activeUrl,
            addClip,
            newClipTime,
            setActiveUrl,
            setModalVisibility,
            setNewClipTime,
            video
        } = this.props;

        return (
            <div className="player">
                <div className="player__video">
                    <video
                        controls
                        src={activeUrl}
                    >
                        <track kind="captions" />
                    </video>
                </div>

                <Controls
                    addClip={addClip}
                    newClipTime={newClipTime}
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
    activeUrl: PropTypes.string.isRequired,
    addClip: PropTypes.func.isRequired,
    newClipTime: PropTypes.object.isRequired,
    setActiveUrl: PropTypes.func.isRequired,
    setModalVisibility: PropTypes.func.isRequired,
    setNewClipTime: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
};

export default Video;
