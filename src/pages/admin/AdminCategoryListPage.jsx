import { List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminCategory from "../../components/content/AdminCategory";

function AdminCategoryListPage() {
    const [categoryList, setCategoryList] = useState([{categoryId:1, name:'123', description:'123'}]);

    useEffect(() => {
        getCategoryList();
    }, []); 

    const getCategoryList = async () => {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/product/category/list');
        setCategoryList(res.data.value.data);
    }

    return(
        <List>
            {categoryList.length === 0 && <span>카테고리가 없습니다.</span>}
            {categoryList.map((category) => (
                
                <ListItem key={category.categoryId} alignItems="flex-start">
                    <ListItemText
                        primary={category.name}
                        secondary={
                            <AdminCategory description={category.description}/>
                        }
                        secondaryTypographyProps={{component: 'div'}}
                    />
                </ListItem>
            ))}
        </List>
    );
}

export default AdminCategoryListPage;