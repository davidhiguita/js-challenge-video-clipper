import React, { Component } from 'react';

// @ own components
import Paper from '@material-ui/core/Paper';

import { Consumer } from '../../context';

import './style.scss';

class Player extends Component {
    state = {
        // eslint-disable-next-line react/no-unused-state
        videoRef: null
    }

    setVideoRef = (ref) => {
        // eslint-disable-next-line react/no-unused-state
        this.setState({ videoRef: ref });
    }

    renderEmptyVideo = () => (
        <div className="video-clipper__player__nodata">No  video selected</div>
    )

    renderPlayer = (activeVideo, mainVideo) => {
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
                controls
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
                    globalData: { activeVideo, mainVideo }
                }) => (
                    <div className="video-clipper__player">
                        <Paper elevation={4}>
                            {
                                activeVideo ?
                                    this.renderPlayer(activeVideo, mainVideo) :
                                    this.renderEmptyVideo()
                            }
                        </Paper>
                    </div>
                )}
            </Consumer>
        );
    }
}


export default Player;
