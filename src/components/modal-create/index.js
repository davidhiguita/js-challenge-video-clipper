import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// @own components
import VideoForm from './video-form';

// @context
import { Consumer } from '../../context';

// @style
import './style.scss';

class ModalCreate extends Component {
    addVideo = () => {
        const {
            addClip,
            addMainVideo,
            modalCreateInfo: { type }
        } = this.props;

        if (type === 'clip') {
            addClip();
        } else if (type === 'video') {
            addMainVideo();
        }
    };

    render() {
        const {
            modalCreateInfo: { visible },
            toggle
        } = this.props;

        return (
            <Consumer>
                {
                    ({
                        globalData: { modalCreateInfo },
                        globalHandle: { handleModalCreateChange }
                    }) => (
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
                                    modalCreateInfo={modalCreateInfo}
                                    handleChange={handleModalCreateChange}
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
                    )
                }
            </Consumer>
        );
    }
}

ModalCreate.propTypes = {
    addClip: PropTypes.func.isRequired,
    addMainVideo: PropTypes.func.isRequired,
    modalCreateInfo: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired
};

export default ModalCreate;
