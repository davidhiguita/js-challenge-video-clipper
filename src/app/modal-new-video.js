import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class ModalNewVideo extends Component {
    state = {
        minutes: '9',
        seconds: '56',
        url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
    }

    getValidationData = ({ minutes, seconds, url }) => {
        const reMinutes = /^\d{1,5}$/g;
        const reSeconds = /^[0-5]?\d$/g;
        const reUrl = /^(http(s)?:\/\/|www\.).*(\.mp4)$/g;

        return {
            minutes: reMinutes.test(minutes),
            seconds: reSeconds.test(seconds),
            url: reUrl.test(url)
        };
    }

    closeModal = () => {
        this.setState({
            minutes: '',
            seconds: '',
            url: ''
        });
        this.props.setVisible();
    }

    updateState = (key, value) => {
        const updatedArgs = {
            ...this.state,
            [key]: value
        };
        const validatedData = this.getValidationData(updatedArgs);
        if (key === 'url' || (validatedData[key] || !value.length)) {
            this.setState({ [key]: value });
        }
    }

    shouldDisableAddButton = () => {
        const { minutes, seconds, url } = this.getValidationData({ ...this.state });
        return !minutes || !seconds || !url;
    };

    addNewVideo = () => {
        this.props.addNewVideo({ ...this.state });
    }

    render() {
        const { visible } = this.props;

        const {
            minutes,
            seconds,
            url
        } = this.state;

        const validatedData = this.getValidationData({ ...this.state });

        return (
            <Dialog
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick
                disableEscapeKeyDown
                onClose={this.setModalVisibility}
                open={visible}
            >
                <DialogTitle id="alert-dialog-title">
                    New url video
                </DialogTitle>
                <DialogContent className="modal-content">
                    <TextField
                        className="url"
                        error={!!url.length && !validatedData.url}
                        id="url-new-video"
                        label={!!url.length && !validatedData.url ? 'Format invalid' : 'New video url'}
                        margin="normal"
                        onChange={e => this.updateState('url', e.target.value)}
                        value={url}
                    />

                    <TextField
                        className="minutes"
                        id="minutes-new-video"
                        label="Minutes"
                        margin="normal"
                        onChange={e => this.updateState('minutes', e.target.value)}
                        value={minutes}
                    />
                    <TextField
                        className="seconds"
                        id="seconds-new-video"
                        label="Seconds"
                        margin="normal"
                        onChange={e => this.updateState('seconds', e.target.value)}
                        value={seconds}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeModal} color="primary">
                        Cancel
                    </Button>
                    <Button
                        autoFocus
                        color="primary"
                        disabled={this.shouldDisableAddButton()}
                        onClick={this.addNewVideo}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ModalNewVideo.propTypes = {
    addNewVideo: PropTypes.func.isRequired,
    setVisible: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
};

export default ModalNewVideo;
