import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars(props) {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleOpen(false)}>
            <Alert onClose={props.handleOpen(false)} severity={props.alertType}>
                {props.text}
            </Alert>
        </Snackbar>
    );
}