import { FormControl, TextField, Button, Stack } from "@mui/material";
import React from "react";
import { addCategory } from "../../js/admin/admin";

function AdminCategoryAddPage() {
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target.form);
        const paramData = {
            name: data.get('categoryname'),
            description: data.get('categorydescription'),
        };

        const result = addCategory(paramData);

        if(result) {
            alert('카테고리 등록 성공');
        }
    }

    return (
        <Stack 
            sx={{ 
                width: '50%'
            }}
            component="form"
        >
            <FormControl>
                <TextField 
                    required
                    id="categoryname" 
                    name="categoryname" 
                    label="카테고리 이름"
                    sx={{ width: '50%', marginBottom: 3}}
                />
            </FormControl>
            <FormControl
                sx={{ marginBottom: 3}}
            >
                <TextField 
                    fullWidth
                    multiline
                    rows={5}
                    id="categorydescription"
                    name="categorydescription"
                    label="카테고리 설명" />

            </FormControl>
            <Button variant="contained" onClick={handleSubmit} type="submit">카테고리 등록</Button>
        </Stack>
    );
}

export default AdminCategoryAddPage;