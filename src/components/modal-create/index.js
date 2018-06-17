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
    end: '',
    isFromYoutube: false,
    name: '',
    start: '',
    type: 'clip',
    url: ''
};

class ModalCreate extends Component {
    state = initialState

    addVideo = () => {
        const {
            addClip,
            addMainVideo,
            mainVideo
        } = this.props;

        const {
            end,
            isFromYoutube,
            name,
            start,
            type,
            url
        } = this.state;

        if (type === 'clip') {
            let formattedUrl = `${mainVideo.url}?start=${start}&end=${end}`;

            if (!mainVideo.isFromYoutube) {
                formattedUrl = `${mainVideo.url}#t=${start},${end}`;
            }

            const newVideo = {
                end,
                isFromYoutube,
                name,
                start,
                tags: [],
                url: formattedUrl
            };

            addClip(newVideo, this.resetStates);
        } else if (type === 'video') {
            const newVideo = {
                end,
                isFromYoutube,
                name,
                start,
                tags: [],
                url
            };

            addMainVideo(newVideo, this.resetStates);
        }
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
            end,
            isFromYoutube,
            name,
            start,
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
                        end={end}
                        isFromYoutube={isFromYoutube}
                        name={name}
                        url={url}
                        start={start}
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
    addClip: PropTypes.func.isRequired,
    addMainVideo: PropTypes.func.isRequired,
    mainVideo: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
    visible: PropTypes.bool
};

ModalCreate.defaultProps = {
    visible: false
};

export default ModalCreate;
