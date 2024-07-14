import { Grid, Button } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import React from "react";

function AdminCategory(props) {
    return(
        <Grid container spacing={2}>
            <Grid item xs={8}>
                {props.description}
            </Grid>
            <Grid item xs={4}>
                <Button>수정</Button>
                <Button><DeleteRoundedIcon/></Button>
            </Grid>
        </Grid>
    )
}

export default AdminCategory;