import React, { Component } from 'react';
import PropTypes from 'prop-types';

// @ own components
import Paper from '@material-ui/core/Paper';

import { Consumer } from '../../context';

import './style.scss';

class Player extends Component {
    componentWillReceiveProps(nextProps) {
        const { mainVideo } = this.props;

        if (!mainVideo.isFromYoutube) {
            if (nextProps.isPlayingVideo) {
                this.videoRef.play();
            } else {
                this.videoRef.pause();
            }
        }
    }

    renderEmptyVideo = () => (
        <div className="video-clipper__player__nodata">No  video selected</div>
    )

    renderPlayer = (activeVideo) => {
        const { mainVideo } = this.props;
        if (mainVideo.isFromYoutube) {
            return (
                <iframe
                    allowFullScreen
                    autoPlay={activeVideo.type === 'clip'}
                    frameBorder="0"
                    ref={(video) => {
                        this.videoRef = video;
                    }}
                    src={activeVideo.url}
                    title={activeVideo.id}
                />
            );
        }
        return (
            <video
                autoPlay={activeVideo.type === 'clip'}
                ref={(video) => {
                    this.videoRef = video;
                }}
                src={activeVideo.url}
            >
                <track kind="captions" />
            </video>
        );
    }

    render() {
        return (
            <Consumer>
                {({
                    globalData: { activeVideo }
                }) => (
                    <div className="video-clipper__player">
                        <Paper elevation={4}>
                            {
                                activeVideo ?
                                    this.renderPlayer(activeVideo) :
                                    this.renderEmptyVideo()
                            }
                        </Paper>
                    </div>
                )}
            </Consumer>
        );
    }
}

Player.propTypes = {
    mainVideo: PropTypes.object.isRequired,
    isPlayingVideo: PropTypes.bool.isRequired
};

export default Player;
