import React from "react";
import { Stack, Pagination, List, ListItemAvatar, Avatar, Box, Typography, ListItemButton } from "@mui/material";

function AdminItemListPage(props) {
    const handleItemClick = (item) => {
        console.log(item);
    }

    return (
        <Stack
            ml={2} mr={2}
        >
            <List>
                {props.list.length === 0 && <span>상품이 없습니다.</span>}
                {props.list.map((item) => (
                    <ListItemButton
                        key={item.productId} 
                        alignItems="flex-start"
                        onClick={() => handleItemClick(item)}
                    >
                        <ListItemAvatar>
                            <Avatar
                                variant="square"
                                src={item.primaryUrl}
                                alt={item.name}
                                sx={{width: 50, height: 50}}
                            />
                        </ListItemAvatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, flex: 1 }}>
                            <Typography variant="h6" component="div">
                              {item.productName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                카테고리: {item.categoryName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                수량: {item.quantity}
                            </Typography>
                            <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
                                가격: {item.price}
                            </Typography>
                        </Box>
                    </ListItemButton>
                ))}
            </List>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination 
                    count={props.total}
                    onChange={props.pagechange}
                />
            </Box>
        </Stack>
    );
}

export default AdminItemListPage;