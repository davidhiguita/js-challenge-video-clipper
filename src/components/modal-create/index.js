import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalCreate = (props) => {
    const {
        toggle,
        visible
    } = props;

    return (
        <Dialog
            disableBackdropClick
            onClose={toggle}
            open={visible}
            aria-labelledby="simple-dialog-title"
        >
            <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggle} color="primary">
                    Close
                </Button>
                <Button onClick={() => {}} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ModalCreate.propTypes = {
    toggle: PropTypes.func.isRequired,
    visible: PropTypes.bool
};

ModalCreate.defaultProps = {
    visible: false
};

export default ModalCreate;
