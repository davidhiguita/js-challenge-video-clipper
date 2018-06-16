import React from 'react';

// @components
import Paper from '@material-ui/core/Paper';

// @context
import { Consumer } from '../../context';

import VideoItem from './video-item';
import ActionsBar from './actions-bar';

import './style.scss';

const VideoList = () => {
    const renderClips = (activeVideo, videos, globalHandle) =>
        videos.map((video, index) => (
            <VideoItem
                active={activeVideo.id === video.id}
                activeVideo={activeVideo}
                key={index}
                actions={globalHandle}
                video={video}
            />
        ));

    const renderEmptyClipsList = () => (
        <div className="video-clipper__controls__list__nodata">
            No clips created
        </div>
    );

    const renderMainVideo = (activeVideo, globalHandle, mainVideo) => (
        <VideoItem
            active={activeVideo.id === mainVideo.id}
            activeVideo={activeVideo}
            key="mainVideo"
            actions={globalHandle}
            video={mainVideo}
        />
    );

    return (
        <Consumer>
            {({
                globalData: {
                    activeVideo, disabledControls, mainVideo, videos
                },
                globalHandle
            }) => (
                <div className="video-clipper__controls">
                    <Paper elevation={4}>
                        <ActionsBar
                            disabledControls={disabledControls}
                            playVideo={globalHandle.playVideo}
                        />
                    </Paper>

                    <Paper className="video-clipper__controls__list" elevation={4}>
                        {
                            mainVideo ?
                                renderMainVideo(activeVideo, globalHandle, mainVideo) :
                                renderEmptyClipsList()
                        }
                        { renderClips(activeVideo, videos, globalHandle) }
                    </Paper>
                </div>
            ) }
        </Consumer>
    );
};

export default VideoList;
