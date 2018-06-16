import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// @own components
import VideoForm from './video-form';

// @style
import './style.scss';

const initialState = {
    duration: '',
    isFromYoutube: false,
    name: '',
    type: 'clip',
    url: ''
};

class ModalCreate extends Component {
    state = initialState

    addVideo = () => {
        const { addVideo } = this.props;

        const {
            duration,
            isFromYoutube,
            name,
            type,
            url
        } = this.state;

        const newVideo = {
            duration,
            name,
            url,
            isFromYoutube,
            tags: []
        };
        addVideo(
            newVideo,
            this.resetStates,
            type === 'clip'
        );
    };

    handleChange = (name, isCheckbox = false) => (event) => {
        this.setState({
            [name]: isCheckbox ? event.target.checked : event.target.value
        });
    }

    resetStates = () => this.setState(initialState)

    render() {
        const {
            toggle,
            visible
        } = this.props;

        const {
            duration,
            isFromYoutube,
            name,
            type,
            url
        } = this.state;

        return (
            <Dialog
                className="modal-create-video"
                disableBackdropClick
                onClose={toggle}
                open={visible}
                aria-labelledby="simple-dialog-title"
            >
                <DialogTitle id="simple-dialog-title">
                    Add clip or video
                </DialogTitle>
                <DialogContent className="modal-create-video__content">
                    <VideoForm
                        duration={duration}
                        isFromYoutube={isFromYoutube}
                        name={name}
                        url={url}
                        type={type}
                        handleChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggle} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.addVideo} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ModalCreate.propTypes = {
    addVideo: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    visible: PropTypes.bool
};

ModalCreate.defaultProps = {
    visible: false
};

export default ModalCreate;
