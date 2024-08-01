import { Divider, List, ListItem, ListItemText } from "@mui/material";
import AdminCategory from "../../components/content/AdminCategory";
function AdminCategoryListPage(props) {

    return(
        <List>
            {props.list.length === 0 && <span>카테고리가 없습니다.</span>}
            {props.list.map((category) => (
                <div key={category.categoryId}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={category.name}
                            secondary={
                                <AdminCategory 
                                    update={props.update} 
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
    );
}

export default AdminCategoryListPage;