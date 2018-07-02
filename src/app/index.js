import React, { Component } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

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
        tagToFilter: '',
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

    setTagToFilter = e => this.setState({ tagToFilter: e.target.value });

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

    filterClips = () => {
        const { clips, tagToFilter } = this.state;
        if (!tagToFilter.length) {
            return clips;
        }
        return clips.filter(clip => clip.tag === tagToFilter);
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
            tagToFilter,
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
                    clips={this.filterClips()}
                    setActiveClipIndex={this.setActiveClipIndex}
                    setActiveUrl={this.setActiveUrl}
                    filter={tagToFilter}
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

                <div className="fab-filter">
                    <TextField
                        disabled={!clips.length}
                        id="name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        value={tagToFilter}
                        onChange={this.setTagToFilter}
                        placeholder="Filter by tag"
                        margin="normal"
                    />
                </div>
            </div>
        );
    }
}

export default App;
