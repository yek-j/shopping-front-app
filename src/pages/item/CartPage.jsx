import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { Avatar, Box, CssBaseline, Divider, IconButton, List, ListItem, ListItemAvatar, Stack, TextField, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { cartListAtom } from "../../js/state/cartState";
import { Delete } from "@mui/icons-material";

function CartPage() {
    const [state, setState] = useState(false);
    const [cartList, setCartList] = useRecoilState(cartListAtom);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setState(true);
        }
    },[]);

    const loginMovePage = <div>로그인 후에 장바구니를 확인할 수 있습니다.</div>;

    return (
        <Box>
            <Header/>
            <CssBaseline/>
            <Box
                style={{
                    width: '90%',
                    height: '100%',
                    marginLeft: 50,
                    marginTop: 70,
                }}
            >
                <h3>장바구니</h3>
                <hr/>
                {!state && loginMovePage}
                <Stack>
                    <List>
                        {cartList.length === 0 && <span>장바구니가 비어있습니다.</span>}
                        {cartList.map((item) => (
                            <div>
                                <ListItem
                                    key={item.cartId}
                                    alignItems="flex-start"
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="square"
                                            src={item.product.image}
                                            alt={item.product.name}
                                            sx={{width: 80, height: 80}}
                                        />
                                    </ListItemAvatar>
                                    <Box sx={{ ml: 2, flex: 1 }}>
                                        <Typography variant="h6" component="div">
                                            {item.product.name}
                                        </Typography>
                                        <Typography variant="body2" component="span">
                                            수량 : 
                                        </Typography>
                                        <TextField 
                                            required
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            value={item.quantity}
                                            sx={{ml: 1, width: 55 }}
                                        />
                                    </Box>
                                    <IconButton>
                                        <Delete fontSize="inherit"></Delete>
                                    </IconButton>
                                </ListItem>
                                <Divider/>
                            </div>
                        ))}
                    </List>
                </Stack>
            </Box>
        </Box>
    );
}

export default CartPage;
