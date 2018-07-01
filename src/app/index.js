import React, { Component } from 'react';

// @components
import Clips from '../components/clips';
import Video from '../components/video';
import ModalNewVideo from './modal-new-video';

// @styles
import './style.scss';

class App extends Component {
    state = {
        activeUrl: '',
        clips: [],
        modalVisibility: false,
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

    setActiveUrl = activeUrl => this.setState({ activeUrl })

    setNewClipTime = newClipTime => this.setState({ newClipTime })

    setModalVisibility = () => {
        this.setState(({ modalVisibility }) => ({ modalVisibility: !modalVisibility }));
    };

    addClip = () => {
        this.setState(({ clips, newClipTime, video }) => ({
            clips: [
                ...clips,
                {
                    name: `Clip #${clips.length + 1}`,
                    end: newClipTime.end,
                    start: newClipTime.start,
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
            activeUrl,
            clips,
            modalVisibility,
            newClipTime,
            video
        } = this.state;

        console.log('state', activeUrl, clips);

        return (
            <div className="video-clipper">
                <Video
                    activeUrl={activeUrl}
                    addClip={this.addClip}
                    newClipTime={newClipTime}
                    setActiveUrl={this.setActiveUrl}
                    setModalVisibility={this.setModalVisibility}
                    setNewClipTime={this.setNewClipTime}
                    video={video}
                />
                <Clips
                    activeUrl={activeUrl}
                    clips={clips}
                    setActiveUrl={this.setActiveUrl}
                />
                <ModalNewVideo
                    addNewVideo={this.addNewVideo}
                    setVisible={this.setModalVisibility}
                    visible={modalVisibility}
                />
            </div>
        );
    }
}

export default App;
