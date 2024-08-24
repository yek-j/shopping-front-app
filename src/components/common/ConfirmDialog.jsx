import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

function ConfirmDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.close}
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.content}    
                </DialogContentText> 
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>취소</Button>
                <Button onClick={props.confirm}>확인</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;