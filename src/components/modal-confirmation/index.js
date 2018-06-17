import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalConfirmation = ({
    action,
    content,
    title,
    toggle,
    visible
}) => (
    <Dialog
        className="modal-create-video"
        disableBackdropClick
        onClose={toggle}
        open={visible}
        aria-labelledby="simple-dialog-title"
    >
        <DialogTitle id="simple-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent className="modal-create-video__content">
            {content}
        </DialogContent>
        <DialogActions>
            <Button onClick={toggle} color="primary">
                Close
            </Button>
            <Button onClick={action} color="primary" autoFocus>
                Agree
            </Button>
        </DialogActions>
    </Dialog>
);

ModalConfirmation.propTypes = {
    action: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
};

export default ModalConfirmation;
