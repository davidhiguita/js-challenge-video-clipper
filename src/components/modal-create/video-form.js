import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const VideoForm = (props) => {
    const {
        duration,
        handleChange,
        isFromYoutube,
        name,
        type,
        url
    } = props;

    return (
        <div className="video-form">
            <TextField
                className="video-form__name"
                fullWidth
                id="video-name"
                label="Name"
                margin="normal"
                onChange={handleChange('name')}
                value={name}
            />

            <TextField
                className="video-form__url"
                fullWidth
                id="video-url"
                label="Url"
                margin="normal"
                onChange={handleChange('url')}
                value={url}
            />

            <div className="video-form__options-inline">
                <FormControl className="video-form__options-inline__duration">
                    <TextField
                        fullWidth
                        id="duration"
                        label="Duration (hh:mm:ss)"
                        margin="normal"
                        onChange={handleChange('duration')}
                        value={duration}
                    />
                </FormControl>

                <FormControl className="video-form__options-inline__type">
                    <InputLabel htmlFor="demo-controlled-open-select">Video type</InputLabel>
                    <Select
                        fullWidth
                        onChange={handleChange('type')}
                        value={type}
                    >
                        <MenuItem value="clip">Clip</MenuItem>
                        <MenuItem value="video">Video</MenuItem>
                    </Select>
                </FormControl>

                <FormControlLabel
                    className="video-form__options-inline__isyoutube"
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
            </div>
        </div>
    );
};

VideoForm.propTypes = {
    duration: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isFromYoutube: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

export default VideoForm;
