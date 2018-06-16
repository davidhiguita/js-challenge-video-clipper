import React from 'react';

// @context
import { Consumer } from '../../context';

// @components
// import VideoItem from './video-item';

import './style.scss';
import VideoItem from './video-item';

const VideoList = () => {
    const renderVideos = (videos, setActiveVideo) =>
        videos.map((video, index) => (
            <VideoItem
                key={index}
                setActiveVideo={id => setActiveVideo(id)}
                video={video}
            />
        ));

    return (
        <Consumer>
            {({
                globalData: { videos },
                globalHandle
            }) => (
                <div className="video-clipper__list">
                    {renderVideos(videos, globalHandle.setActiveVideo)}
                </div>
            ) }
        </Consumer>
    );
};

export default VideoList;
