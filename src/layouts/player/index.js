import React from 'react';

import { Consumer } from '../../context';

// @components
import ExternalVideo from './external-video';
import YoutubeVideo from './youtube-video';

import './style.scss';

const Player = () => (
    <Consumer>
        {({ globalData: { activeVideo } }) => (
            <div className="video-clipper__player">
                {
                    activeVideo.isFromYoutube ?
                        <YoutubeVideo video={activeVideo} /> :
                        <ExternalVideo video={activeVideo} />
                }
            </div>
        )}
    </Consumer>
);

export default Player;
