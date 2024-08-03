import { Divider, List, ListItem, ListItemText } from "@mui/material";
import AdminCategory from "../../components/content/AdminCategory";
import AdminCategoryUpdateDialog from "../../components/content/AdminCategoryUpdateDialog";
import { useState } from "react";
function AdminCategoryListPage(props) {
    const [open, setOpen] = useState(false);
    const [categoryData, setCategoryData] = useState({ name: '', description: '', id: 0});

    const paramDataHandle = async (name, description, id) => {
        setCategoryData({ name, description, id});
        setOpen(true);
    }
    
    return(
        <div>
            <AdminCategoryUpdateDialog 
                open={open} 
                close={() => setOpen(false)}
                data={categoryData}
                update={props.update}
            />
            <List>
                {props.list.length === 0 && <span>카테고리가 없습니다.</span>}
                {props.list.map((category) => (
                    <div key={category.categoryId}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={category.name}
                                secondary={
                                    <AdminCategory 
                                        open={paramDataHandle}
                                        update={props.update} 
                                        name={category.name}
                                        description={category.description} 
                                        id={category.categoryId} />
                                }
                                secondaryTypographyProps={{component: 'div'}}
                            />
                        </ListItem>
                        <Divider sx={{ mr: { xs: 1, sm: 15, md: 22 } }} />
                    </div>
                ))}
            </List>
        </div>
    );
}

export default AdminCategoryListPage;