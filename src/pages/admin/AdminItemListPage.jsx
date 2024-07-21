import React from "react";
import ItemList from "../../components/content/ItemList";
import { Stack, Pagination } from "@mui/material";

function AdminItemListPage(props) {
    return (
        <Stack
            alignItems="center"
            ml={2} mr={2}
        >
            <ItemList to='admin' items={props.list} col={4} h={'10000'}/>
            <Pagination 
                count={props.total}
                onChange={props.pagechange}
            />
        </Stack>
    );
}

export default AdminItemListPage;