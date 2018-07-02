import React, { Component } from 'react';

// @components
import Clips from '../components/clips';
import Video from '../components/video';
import ModalNewVideo from './modal-new-video';
import ModalNewClip from './modal-new-clip';

// @styles
import './style.scss';

const DIRECTION_KEYS = {
    left: 'ArrowLeft',
    right: 'ArrowRight'
};

class App extends Component {
    state = {
        activeUrl: '',
        activeClipIndex: -1,
        clips: [],
        modalVisibility: false,
        newClipVisibility: false,
        newClipTime: {
            start: 0,
            end: 0
        },
        // videoRef: null,
        video: {
            minutes: 0,
            seconds: 0,
            url: ''
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            if (e.key === DIRECTION_KEYS.left) {
                this.setActiveClipIndex('previous');
            } else if (e.key === DIRECTION_KEYS.right) {
                this.setActiveClipIndex('next');
            }
        });
    }

    setActiveClipIndex = (type = null, index = null) => {
        let newIndex = this.state.activeClipIndex;
        let newActiveUrl = this.state.activeUrl;
        if (this.state.clips.length) {
            if (type) {
                const currentIndex = this.state.activeClipIndex;
                if (type === 'previous') {
                    if (currentIndex > 0) {
                        newIndex = currentIndex - 1;
                    }
                } else if (type === 'next') {
                    if (currentIndex < this.state.clips.length) {
                        newIndex = currentIndex + 1;
                    }
                }
                newActiveUrl = this.state.clips[newIndex].url;
            } else if (index >= 0) {
                newIndex = index;
                newActiveUrl = this.state.clips[newIndex].url;
            }
            this.setState({ activeClipIndex: newIndex, activeUrl: newActiveUrl });
        }
    };

    setActiveUrl = activeUrl => this.setState({ activeUrl })

    setNewClipTime = newClipTime => this.setState({ newClipTime })

    setNewClipModalVisibility = () => {
        this.setState(({ newClipVisibility }) => ({ newClipVisibility: !newClipVisibility }));
    };

    setModalVisibility = () => {
        this.setState(({ modalVisibility }) => ({ modalVisibility: !modalVisibility }));
    };

    addClip = () => {
        this.setNewClipModalVisibility();
    }

    pushNewClip = ({ name, tag }) => {
        this.setState(({ clips, newClipTime, video }) => ({
            clips: [
                ...clips,
                {
                    name,
                    end: newClipTime.end,
                    start: newClipTime.start,
                    tag,
                    url: `${video.url}#t=${newClipTime.start},${newClipTime.end}`
                }
            ]
        }));
    }

    addNewVideo = (newVideoData) => {
        const newVideoDataFormatted = {
            minutes: parseInt(newVideoData.minutes, 10),
            seconds: parseInt(newVideoData.seconds, 10),
            url: newVideoData.url
        };
        const newClipTime = {
            end: newVideoDataFormatted.seconds + (newVideoDataFormatted.minutes * 60),
            start: 0
        };

        this.setState({
            activeClipIndex: -1,
            activeUrl: newVideoData.url,
            clips: [],
            modalVisibility: false,
            newClipTime,
            video: newVideoDataFormatted
        });
    }

    updateState = (key, value, field = null) => {
        if (field) {
            this.setState(prevState => ({
                [field]: {
                    ...prevState[field],
                    [key]: value
                }
            }));
        } else {
            this.setState({
                [key]: value
            });
        }
    }

    render() {
        const {
            activeClipIndex,
            activeUrl,
            clips,
            modalVisibility,
            newClipTime,
            newClipVisibility,
            video
        } = this.state;

        return (
            <div className="video-clipper">
                <Video
                    activeClipIndex={activeClipIndex}
                    activeUrl={activeUrl}
                    addClip={this.addClip}
                    clips={clips}
                    newClipTime={newClipTime}
                    setActiveClipIndex={this.setActiveClipIndex}
                    setActiveUrl={this.setActiveUrl}
                    setModalVisibility={this.setModalVisibility}
                    setNewClipTime={this.setNewClipTime}
                    video={video}
                />
                <Clips
                    activeUrl={activeUrl}
                    clips={clips}
                    setActiveClipIndex={this.setActiveClipIndex}
                    setActiveUrl={this.setActiveUrl}
                />
                <ModalNewVideo
                    addNewVideo={this.addNewVideo}
                    setVisible={this.setModalVisibility}
                    visible={modalVisibility}
                />
                <ModalNewClip
                    setVisible={this.setNewClipModalVisibility}
                    pushNewClip={this.pushNewClip}
                    visible={newClipVisibility}
                />
            </div>
        );
    }
}

export default App;
