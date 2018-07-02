import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// @components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ClipIcon from '@material-ui/icons/MusicVideo';
// import Paper from '@material-ui/core/Paper';

// @styles
import './style.scss';

const getTimeFromSeconds = (s) => {
    const getTwoDigits = v => v > 9 ? v : `0${v}`;
    const minutes = parseInt(s / 60, 10);
    const seconds = parseInt(s % 60, 10);
    return `${getTwoDigits(minutes)}:${getTwoDigits(seconds)}`;
};

const Clips = ({
    activeUrl,
    clips,
    setActiveClipIndex,
    setActiveUrl
}) => (
    <div className="clips">
        {
            clips.length ?
                <List className="clips__list">
                    {
                        clips.map((item, index) => (
                            <ListItem
                                className={
                                    classNames(
                                        'clips__list-item',
                                        { 'clips__list-item--active': activeUrl === item.url }
                                    )
                                }
                                key={index}
                                onClick={() => {
                                    setActiveClipIndex(null, index);
                                    setActiveUrl(item.url);
                                }}
                            >
                                <Avatar>
                                    <ClipIcon />
                                </Avatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={
                                        `
                                        ${getTimeFromSeconds(item.start)} - ${getTimeFromSeconds(item.end)}
                                           tag: ${item.tag}
                                        `
                                    }
                                />
                            </ListItem>
                        ))
                    }
                </List> : null
        }
        {
            !clips.length ?
                <div className="clips__no-data">
                    No clips added
                </div> : null
        }
    </div>
);

Clips.propTypes = {
    activeUrl: PropTypes.string.isRequired,
    clips: PropTypes.array.isRequired,
    setActiveClipIndex: PropTypes.func.isRequired,
    setActiveUrl: PropTypes.func.isRequired
};

export default Clips;
