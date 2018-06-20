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
        isPlayingVideo: false,
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

        this.setState(prevState => ({
            activeVideo: newActiveVideo,
            disabledControls: this.setDisabledControls(newActiveVideo),
            isPlayingVideo: !prevState.isPlayingVideo
        }));
    }

    togglePlayingActiveVideo = () => {
        console.log(this.state.isPlayingVideo);
        this.setState(prevState => ({
            isPlayingVideo: !prevState.isPlayingVideo
        }));
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

    editVideo = () => {
        const { clips, mainVideo, modalCreateInfo } = this.state;
        if (modalCreateInfo.type === 'video') {
            this.setState(prevState => ({
                mainVideo: {
                    ...prevState.mainVideo,
                    ...modalCreateInfo
                },
                modalCreateInfo: { ...modalCreateInitialState }
            }));
        } else {
            const currentClips = [...clips];
            const currentModalCreateInfo = { ...modalCreateInfo };
            const clipIndex = clips.findIndex(clip => clip.id === modalCreateInfo.id);
            currentModalCreateInfo.url = modalCreateInfo.isFromYoutube
                ? `${mainVideo.url}?start=${modalCreateInfo.start}&end=${modalCreateInfo.end}`
                : `${mainVideo.url}#t=${modalCreateInfo.start},${modalCreateInfo.end}`;

            currentClips[clipIndex] = currentModalCreateInfo;

            this.setState({
                clips: currentClips,
                modalCreateInfo: { ...modalCreateInitialState }
            });
        }
    }

    handleModalCreateChange = (name, isCheckbox = false) => (event) => {
        const newValue = isCheckbox ? event.target.checked : event.target.value;
        const currentModalInfo = { ...this.state.modalCreateInfo };

        const durationFields = ['duration', 'end', 'start'];

        if (durationFields.includes(name)) {
            if (this.validateDurationFormat(newValue)) {
                currentModalInfo[name] = newValue;
                this.setState({ modalCreateInfo: currentModalInfo });
            }
        } else {
            currentModalInfo[name] = newValue;
            this.setState({ modalCreateInfo: currentModalInfo });
        }
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
            currentModalInfo.visible = true;
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

    validateDurationFormat = (value) => {
        const re = {
            1: /^[0-2]{1}$/g,
            2: {
                a: /^[0-1]{1}\d{1}$/g,
                b: /^2[0-3]{1}$/g
            },
            3: /^\d{2}:$/g,
            '4_5': /^\d{2}:[0-5]{1}\d?$/g,
            6: /^\d{2}:\d{2}:$/g,
            '7_8': /^\d{2}:\d{2}:[0-5]{1}\d?$/g
        };

        let isValid;
        const valueLength = value.length;

        switch (valueLength) {
            case 0:
                isValid = true;
                break;
            case 1:
                isValid = re[1].test(value);
                break;
            case 2:
                isValid = re[2].a.test(value) || re[2].b.test(value);
                break;
            case 3:
                isValid = re[3].test(value);
                break;
            case 4:
                isValid = re['4_5'].test(value);
                break;
            case 5:
                isValid = re['4_5'].test(value);
                break;
            case 6:
                isValid = re[6].test(value);
                break;
            case 7:
            case 8:
                isValid = re['7_8'].test(value);
                break;
            default:
                break;
        }
        return isValid;
    };

    validateForm = () => {
        const {
            duration,
            end,
            isFromYoutube,
            name,
            start,
            type,
            url
        } = this.state.modalCreateInfo;
        let isValid;
        if (type === 'clip') {
            isValid =
                (start.length === 8) &&
                (end.length === 8) &&
                (!!name.length);
        } else {
            let validUrl;
            if (isFromYoutube) {
                validUrl = !/^https:\/\/*/g.test(url);
            } else {
                validUrl = /^https:\/\/*/g.test(url);
            }
            isValid =
                (duration.length === 8) &&
                (!!name.length) &&
                validUrl;
        }
        return isValid;
    }

    render() {
        const contextValue = {
            globalData: this.state,
            globalHandle: {
                handleModalCreateChange: this.handleModalCreateChange,
                playVideo: this.playVideo,
                setActiveVideo: this.setActiveVideo,
                toggleModalCreate: this.toggleModalCreate,
                toggleModalRemove: this.toggleModalRemove,
                togglePlayingActiveVideo: this.togglePlayingActiveVideo
            }
        };

        const { mainVideo, modalCreateInfo } = this.state;

        return (
            <Provider value={contextValue}>
                <div className="video-clipper">
                    <Player
                        mainVideo={this.state.mainVideo}
                        isPlayingVideo={this.state.isPlayingVideo}
                    />
                    <VideoList />
                    <ModalCreate
                        addClip={this.addClip}
                        addMainVideo={this.addMainVideo}
                        editVideo={this.editVideo}
                        mainVideo={mainVideo}
                        modalCreateInfo={modalCreateInfo}
                        toggle={this.toggleModalCreate}
                        validForm={this.validateForm()}
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
