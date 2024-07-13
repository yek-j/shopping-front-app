import { FormControl, TextField, Button, Stack } from "@mui/material";
import React from "react";

function AdminCategoryAddPage() {
    return (
        <Stack 
            sx={{ 
                width: '50%'
            }}

        >
            <FormControl
                sx={{ marginBottom: 3}}
            >
                <TextField 
                    required
                    id="categoryName" 
                    label="카테고리 이름"
                    sx={{ width: '50%', marginBottom: 3}}
                />
                
                <TextField 
                    fullWidth
                    multiline
                    rows={5}
                    id="categoryDescription"
                    label="카테고리 설명" />

            </FormControl>
            <Button variant="contained" type="submit">카테고리 등록</Button>
        </Stack>
    );
}

export default AdminCategoryAddPage;