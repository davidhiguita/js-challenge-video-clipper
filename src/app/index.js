import React, { Component } from 'react';

// @components
import ModalCreate from '../components/modal-create';

// @layouts
import Player from '../layouts/player';
import VideoList from '../layouts/video-list';

// @context
import { Provider } from '../context';

// @data
import { mainVideo } from '../data';

import './style.scss';

export class App extends Component {
    state = {
        activeVideo: mainVideo,
        clips: [],
        disabledControls: {
            next: true,
            previous: true
        },
        mainVideo,
        visibleModalCreate: false
    }

    setDisabledControls = (activeVideo) => {
        const {
            activeVideo: currentActiveVideo,
            clips,
            disabledControls
        } = this.state;

        if (clips.length) {
            const newActiveVideo = activeVideo || currentActiveVideo;
            const currentDisabledControls = { ...disabledControls };
            const currentActiveVideoIndex = clips.findIndex(video => video.id === newActiveVideo.id);
            currentDisabledControls.next = currentActiveVideoIndex === clips.length - 1;
            currentDisabledControls.previous = currentActiveVideoIndex === 0;
            return currentDisabledControls;
        }
        return {
            next: true,
            previous: true
        };
    };

    setActiveVideo = (id, isClip = true) => {
        const {
            clips,
            mainVideo
        } = this.state;

        const newActiveVideo = isClip && clips.length ?
            clips.filter(video => video.id === id)[0] :
            mainVideo;

        console.log('setActiveVideo', id, isClip);

        this.setState({
            activeVideo: newActiveVideo,
            disabledControls: this.setDisabledControls(newActiveVideo)
        });
    }

    setPlayingActiveVideo = () => {
        const currentActiveVideo = { ...this.state.activeVideo };
        this.setState({ activeVideo: currentActiveVideo });
    }

    toggleModalCreate = () => {
        this.setState(prevState => ({
            visibleModalCreate: !prevState.visibleModalCreate
        }));
    }

    playVideo = (type = 'previous') => {
        const { activeVideo, videos } = this.state;
        const numberOfVideos = videos.length;
        const currentActiveVideoIndex = videos.findIndex(video => video.id === activeVideo.id);
        let newActiveVideoIndex = currentActiveVideoIndex;
        if (type === 'next' && currentActiveVideoIndex < numberOfVideos - 1) {
            newActiveVideoIndex += 1;
        } else if (currentActiveVideoIndex > 0) {
            newActiveVideoIndex -= 1;
        }
        this.setState({
            activeVideo: videos[newActiveVideoIndex],
            disabledControls: this.setDisabledControls(videos[newActiveVideoIndex])
        });
    }

    addClip = (video, callback) => {
        const newClip = { ...video };
        newClip.id = this.state.clips.length;
        console.log('addClip', newClip);
        this.setState(prevState => ({
            clips: [
                ...prevState.clips,
                newClip
            ],
            visibleModalCreate: false
        }), () => callback());
    }

    addMainVideo = (video, callback) => {
        console.log('addMainVideo', video);
        this.setState({
            activeVideo: video,
            clips: [],
            mainVideo: video,
            visibleModalCreate: false
        }, () => callback());
    }

    render() {
        const contextValue = {
            globalData: this.state,
            globalHandle: {
                playVideo: this.playVideo,
                setActiveVideo: this.setActiveVideo,
                setPlayingActiveVideo: this.setPlayingActiveVideo,
                toggleModalCreate: this.toggleModalCreate
            }
        };

        const { mainVideo, visibleModalCreate } = this.state;

        return (
            <Provider value={contextValue}>
                <div className="video-clipper">
                    <Player />
                    <VideoList />
                    <ModalCreate
                        addClip={this.addClip}
                        addMainVideo={this.addMainVideo}
                        mainVideo={mainVideo}
                        toggle={this.toggleModalCreate}
                        visible={visibleModalCreate}
                    />
                </div>
            </Provider>
        );
    }
}

export default App;
