import React, { Component } from 'react';

// @components
import ModalConfirmation from '../components/modal-confirmation';
import ModalCreate from '../components/modal-create';

// @layouts
import Player from '../layouts/player';
import VideoList from '../layouts/video-list';

// @context
import { Provider } from '../context';

// @data
import { mainVideo } from '../data';

import './style.scss';

const modalCreateInitialState = {
    actionType: 'add',
    duration: '',
    end: '',
    isFromYoutube: false,
    name: '',
    start: '',
    type: 'video',
    url: '',
    visible: false
};

export class App extends Component {
    state = {
        activeVideo: mainVideo,
        clips: [],
        disabledControls: {
            next: true,
            previous: true
        },
        mainVideo,
        modalCreateInfo: { ...modalCreateInitialState },
        modalConfirmationInfo: {
            id: null,
            visible: false
        }
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

        this.setState({
            activeVideo: newActiveVideo,
            disabledControls: this.setDisabledControls(newActiveVideo)
        });
    }

    setPlayingActiveVideo = () => {
        const currentActiveVideo = { ...this.state.activeVideo };
        this.setState({ activeVideo: currentActiveVideo });
    }

    addClip = () => {
        const { mainVideo } = this.state;
        const newClip = { ...this.state.modalCreateInfo };
        delete newClip.actionType;
        delete newClip.visible;
        const formattedUrl = mainVideo.isFromYoutube
            ? `${mainVideo.url}?start=${newClip.start}&end=${newClip.end}`
            : `${mainVideo.url}#t=${newClip.start},${newClip.end}`;
        newClip.id = this.state.clips.length;
        newClip.url = formattedUrl;

        this.setState(prevState => ({
            clips: [
                ...prevState.clips,
                newClip
            ],
            modalCreateInfo: { ...modalCreateInitialState }
        }));
    }

    addMainVideo = () => {
        const newVideo = { ...this.state.modalCreateInfo };
        delete newVideo.actionType;
        delete newVideo.visible;
        const formattedUrl =
            newVideo.isFromYoutube ?
                `https://www.youtube.com/embed/${newVideo.url}` :
                newVideo.url;
        newVideo.url = formattedUrl;
        this.setState({
            activeVideo: newVideo,
            clips: [],
            mainVideo: newVideo,
            modalCreateInfo: { ...modalCreateInitialState }
        });
    }

    editVideo = (id, type) => {
        console.log('editVideo::', id, type, this.state.modalCreateInfo);
        this.setState({ modalCreateInfo: { ...modalCreateInitialState } });
    }

    handleModalCreateChange = (name, isCheckbox = false) => (event) => {
        const newValue = isCheckbox ? event.target.checked : event.target.value;
        const currentModalInfo = { ...this.state.modalCreateInfo };
        currentModalInfo[name] = newValue;
        this.setState({ modalCreateInfo: currentModalInfo });
    }

    removeVideo = () => {
        const { clips, modalConfirmationInfo: { id } } = this.state;
        const videoIndex = clips.findIndex(clip => clip.id === id);
        const newClips = [...clips];
        newClips.splice(videoIndex, 1);
        this.setState({
            clips: newClips,
            modalCreateInfo: { ...modalCreateInitialState },
            modalConfirmationInfo: { id: null, visible: false }
        });
    }

    resetModalCreateState = () => this.setState({ modalCreateInfo: { ...modalCreateInitialState } })

    toggleModalCreate = (typeVideo, typeOpen, video = null) => {
        if (this.state.modalCreateInfo.visible) {
            this.setState({ modalCreateInfo: modalCreateInitialState });
        } else {
            const selectedvideo = video ? { ...video } : { ...modalCreateInitialState };
            if (!video) {
                delete selectedvideo.actionType;
                delete selectedvideo.visible;
            }
            const currentModalInfo = {
                ...this.state.modalCreateInfo,
                ...selectedvideo
            };
            currentModalInfo.actionType = typeOpen;
            currentModalInfo.type = typeVideo;
            currentModalInfo.visible = !currentModalInfo.visible;
            this.setState({ modalCreateInfo: currentModalInfo });
        }
    }

    toggleModalRemove = (id) => {
        this.setState(prevState => ({
            modalConfirmationInfo: {
                id: prevState.modalConfirmationInfo.visible ? null : id,
                visible: !prevState.modalConfirmationInfo.visible
            }
        }));
    }

    playVideo = (type = 'previous') => {
        const { activeVideo, clips } = this.state;
        const numberOfClips = clips.length;
        const currentActiveVideoIndex = clips.findIndex(video => video.id === activeVideo.id);
        let newActiveVideoIndex = currentActiveVideoIndex;
        if (type === 'next' && currentActiveVideoIndex < numberOfClips - 1) {
            newActiveVideoIndex += 1;
        } else if (currentActiveVideoIndex > 0) {
            newActiveVideoIndex -= 1;
        }
        this.setState({
            activeVideo: clips[newActiveVideoIndex],
            disabledControls: this.setDisabledControls(clips[newActiveVideoIndex])
        });
    }

    render() {
        const contextValue = {
            globalData: this.state,
            globalHandle: {
                handleModalCreateChange: this.handleModalCreateChange,
                playVideo: this.playVideo,
                setActiveVideo: this.setActiveVideo,
                setPlayingActiveVideo: this.setPlayingActiveVideo,
                toggleModalCreate: this.toggleModalCreate,
                toggleModalRemove: this.toggleModalRemove
            }
        };

        const { mainVideo, modalCreateInfo } = this.state;

        return (
            <Provider value={contextValue}>
                <div className="video-clipper">
                    <Player />
                    <VideoList />
                    <ModalCreate
                        addClip={this.addClip}
                        addMainVideo={this.addMainVideo}
                        editVideo={this.editVideo}
                        mainVideo={mainVideo}
                        modalCreateInfo={modalCreateInfo}
                        toggle={this.toggleModalCreate}
                    />
                    <ModalConfirmation
                        action={this.removeVideo}
                        content="Are you sure?"
                        title="You'll remove this clip"
                        toggle={this.toggleModalRemove}
                        visible={this.state.modalConfirmationInfo.visible}
                    />
                </div>
            </Provider>
        );
    }
}

export default App;
