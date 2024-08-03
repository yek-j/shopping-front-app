import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateCategory } from "../../js/admin/admin";

function AdminCategoryUpdateDialog(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(props.data.name);
        setDescription(props.data.description);
    },[props.data.name, props.data.description]);

    return (
        <Dialog
            open={props.open}
            onClose={props.close}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    updateCategory(formJson, props.update);
                    props.close();
                }

            }}
        >
            <DialogTitle id="dialog-category-update">
                {"카테고리 수정"}
            </DialogTitle>
            <DialogContent>
                <input type="hidden" name="categoryId" value={props.data.id}/>
                <TextField
                    id="name" 
                    name="name" 
                    label="카테고리 이름"
                    margin="dense"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField 
                    fullWidth
                    multiline
                    rows={5}
                    margin="dense"
                    id="description"
                    name="description"
                    label="카테고리 설명" 
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>닫기</Button>
                <Button type="submit">카테고리 수정</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AdminCategoryUpdateDialog;