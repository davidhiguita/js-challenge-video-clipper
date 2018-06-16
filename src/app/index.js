import React, { Component } from 'react';

import './style.scss';

// @components
import Player from '../layouts/player';
import VideoList from '../layouts/video-list';

// @context
import { Provider } from '../context';

// @data
import { videos } from '../data';

export class App extends Component {
    state = {
        // eslint-disable-next-line react/no-unused-state
        activeVideo: videos.filter(video => video.type === 'main')[0],
        // eslint-disable-next-line react/no-unused-state
        activeVideoIndex: 0,
        // eslint-disable-next-line react/no-unused-state
        videos
    }

    setActiveVideo = (id) => {
        const newActiveVideo = this.state.videos.filter(video => video.id === id)[0];
        // eslint-disable-next-line react/no-unused-state
        this.setState({ activeVideo: newActiveVideo });
    }

    render() {
        const contextValue = {
            globalData: this.state,
            globalHandle: {
                setActiveVideo: this.setActiveVideo
            }
        };

        return (
            <Provider value={contextValue}>
                <div className="video-clipper">
                    <Player />

                    <VideoList />
                </div>
            </Provider>
        );
    }
}

/*
<div style={style.main}>
    <div style={style.video}>
        VIDEO
        <video
            src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4#t=20,23"
            width="620"
        >
            <track kind="captions" />
        </video>

        IFRAME
        <iframe
            title="xx"
            src="https://www.youtube.com/embed/v_A0wJDV5AU?start=20&end=25"
            frameBorder="0"
            allowFullScreen
            width="500"
            height="350"
        />
    </div>
</div>
*/

export default App;
