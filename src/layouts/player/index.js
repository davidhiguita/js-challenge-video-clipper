import React from 'react';

// @ own components
import Paper from '@material-ui/core/Paper';

import { Consumer } from '../../context';

// @components
import ExternalVideo from './external-video';
import YoutubeVideo from './youtube-video';

import './style.scss';

const Player = () => (
    <Consumer>
        {({ globalData: { activeVideo } }) => (
            <div className="video-clipper__player">
                <Paper elevation={4}>
                    {
                        activeVideo.isFromYoutube ?
                            <YoutubeVideo video={activeVideo} /> :
                            <ExternalVideo video={activeVideo} />
                    }
                </Paper>
            </div>
        )}
    </Consumer>
);

export default Player;
