import { Grid, Button } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import React from "react";
import { deleteCategory } from "../../js/admin/admin";

function AdminCategory(props) {
    const deleteHandle = async () => {
        if(props.id === undefined) {
            alert("존재하지 않는 카테고리입니다.")
            return;
        }
        const result = await deleteCategory({"categoryId": props.id}); 

        if(result) {
            alert("카테고리 삭제 성공");
            props.update();
        }
    }

    const updateHandle = () => {
        props.open(props.name, props.description, props.id);
    }

    return(
        <Grid container spacing={2}>
            <Grid item xs={8}>
                {props.description}
            </Grid>
            <Grid item xs={4}>
                <Button onClick={updateHandle}>수정</Button>
                <Button onClick={deleteHandle}><DeleteRoundedIcon/></Button>
            </Grid>
        </Grid>
    )
}

export default AdminCategory;