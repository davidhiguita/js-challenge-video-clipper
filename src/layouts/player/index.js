import React from 'react';

// @ own components
import Paper from '@material-ui/core/Paper';

import { Consumer } from '../../context';

// @components
import ExternalVideo from './external-video';
import YoutubeVideo from './youtube-video';

import './style.scss';

const renderPlayer = activeVideo =>
    activeVideo.isFromYoutube ?
        <YoutubeVideo video={activeVideo} /> :
        <ExternalVideo video={activeVideo} />;

const renderEmptyVideo = () => (
    <div className="video-clipper__player__nodata">No  video selected</div>
);

const Player = () => (
    <Consumer>
        {({ globalData: { activeVideo } }) => (
            <div className="video-clipper__player">
                <Paper elevation={4}>
                    {
                        activeVideo ?
                            renderPlayer(activeVideo) :
                            renderEmptyVideo()
                    }
                </Paper>
            </div>
        )}
    </Consumer>
);

export default Player;
