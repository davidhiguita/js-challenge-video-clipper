import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const VideoForm = (props) => {
    const {
        handleChange,
        modalCreateInfo: {
            duration,
            end,
            isFromYoutube,
            name,
            start,
            type,
            url
        }
    } = props;

    const classes = {
        form: `video-form__${type}`,
        optionsInline: `video-form__options-inline__${type}`,
        type: `video-form__options-inline__${type}__type`,
        duration: `video-form__options-inline__${type}__duration`,
        isyoutube: `video-form__options-inline__${type}__isyoutube`,
        end: `video-form__options-inline__${type}--end`,
        start: `video-form__options-inline__${type}--start`,
        name: `video-form__options-inline__${type}__name`,
        url: `video-form__options-inline__${type}__url`
    };

    return (
        <div className={classes.form}>
            <div className={classes.optionsInline}>
                {
                    type === 'video' && (
                        <FormControl className={classes.duration}>
                            <TextField
                                fullWidth
                                id="duration"
                                label="Duration (hh:mm:ss)"
                                margin="normal"
                                onChange={handleChange('duration')}
                                value={duration}
                            />
                        </FormControl>
                    )
                }

                {
                    type === 'video' && (
                        <FormControlLabel
                            className={classes.isyoutube}
                            control={
                                <Switch
                                    checked={isFromYoutube}
                                    onChange={handleChange('isFromYoutube', true)}
                                    value="checkedB"
                                    color="primary"
                                />
                            }
                            label="From youtube"
                        />
                    )
                }

                {
                    type === 'clip' && (
                        <FormControl className={classes.start}>
                            <TextField
                                fullWidth
                                id="duration-start"
                                label="Start (hh:mm:ss)"
                                margin="normal"
                                onChange={handleChange('start')}
                                value={start}
                            />
                        </FormControl>
                    )
                }

                {
                    type === 'clip' && (
                        <FormControl className={classes.end}>
                            <TextField
                                fullWidth
                                id="duration-end"
                                label="End (hh:mm:ss)"
                                margin="normal"
                                onChange={handleChange('end')}
                                value={end}
                            />
                        </FormControl>
                    )
                }
            </div>

            <TextField
                className={classes.name}
                fullWidth
                id="video-name"
                label="Name"
                margin="normal"
                onChange={handleChange('name')}
                value={name}
            />

            {
                type === 'video' && (
                    <TextField
                        className={classes.url}
                        fullWidth
                        id="video-url"
                        label={isFromYoutube ? 'Video Id' : 'Url'}
                        margin="normal"
                        onChange={handleChange('url')}
                        value={url}
                    />
                )
            }
        </div>
    );
};

VideoForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    modalCreateInfo: PropTypes.object.isRequired
};

export default VideoForm;
