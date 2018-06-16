import React from 'react';

// @components
import Paper from '@material-ui/core/Paper';

// @context
import { Consumer } from '../../context';

import VideoItem from './video-item';
import ActionsBar from './actions-bar';

import './style.scss';

const VideoList = () => {
    const renderVideos = (activeVideo, disabledControls, videos, globalHandle) =>
        videos.map((video, index) => (
            <VideoItem
                activeVideo={activeVideo}
                disabledControls={disabledControls}
                key={index}
                actions={globalHandle}
                video={video}
            />
        ));

    return (
        <Consumer>
            {({
                globalData: { activeVideo, disabledControls, videos },
                globalHandle
            }) => (
                <Paper className="video-clipper__list" elevation={4}>
                    <ActionsBar disabledControls={disabledControls} />
                    {renderVideos(activeVideo, disabledControls, videos, globalHandle)}
                </Paper>
            ) }
        </Consumer>
    );
};

export default VideoList;
