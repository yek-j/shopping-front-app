import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import React from "react";

function TextDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"알림"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.close}>
                {"확인"}
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TextDialog;