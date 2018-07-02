import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class ModalNewClip extends Component {
    state = {
        name: '',
        tag: ''
    }

    addClip = () => {
        this.props.pushNewClip({ ...this.state });
        this.props.setVisible();
        this.setState({ name: '', tags: '' });
    }

    closeModal = () => {
        this.setState({
            name: '',
            tag: ''
        });
        this.props.setVisible();
    }

    updateState = key => e => this.setState({ [key]: e.target.value })

    shouldDisableAddButton = () => {
        const {
            name,
            tag
        } = this.state;

        return !name.length || !tag.length;
    }

    render() {
        const { visible } = this.props;

        const {
            name,
            tag
        } = this.state;

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
                        className="name"
                        id="url-new-clip"
                        label="Name"
                        margin="normal"
                        onChange={this.updateState('name')}
                        value={name}
                    />

                    <TextField
                        className="tags"
                        id="tags-new-clip"
                        label="Tag"
                        margin="normal"
                        onChange={this.updateState('tag')}
                        value={tag}
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
                        onClick={this.addClip}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ModalNewClip.propTypes = {
    pushNewClip: PropTypes.func.isRequired,
    setVisible: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
};

export default ModalNewClip;
