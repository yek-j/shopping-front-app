import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { Avatar, Box, Button, CssBaseline, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, Stack, TextField, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { cartListAtom, getCartList } from "../../js/state/cartState";
import { Delete } from "@mui/icons-material";
import { deleteCart, getTotalPrice } from "../../js/cart/cart";
import CartUpdateDialog from "../../components/content/CartUpdateDialog";
import { cartProductData } from "../../js/item/order";
import { requestOrder } from "../../js/item/devbabys-payment";

function CartPage() {
    const [state, setState] = useState(false);
    const [total, setTotal] = useState(0);
    const [cartList, setCartList] = useRecoilState(cartListAtom);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setState(true);

            let result = getTotalPrice(cartList);
            setTotal(result);
        }
    },[cartList]);

    const dialogHandle = (id, quantity) => {
        const data = {id, quantity};
        setUpdateData(data);
        setOpen(true);
    }

    const updateHandler = async () => {
        const newData = await getCartList();
        setCartList(newData);
    }

    const deleteHandler = async (id) => {
        const data = {cartId: id};
        deleteCart(data, updateHandler);
    }

    const handleOrder = async () => {
        const token = JSON.parse(localStorage.getItem('token')).value;
        const productList = cartProductData(cartList);
        requestOrder(token, productList);
    }

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
                <Divider/>
                {!state && loginMovePage}
                <CartUpdateDialog
                    open={open}
                    close={() => setOpen(false)}
                    data={updateData}
                    update={updateHandler}
                />
                {state && 
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
                                        
                                        <Typography variant="body2">
                                            가격 : {item.product.price}
                                        </Typography>

                                        <Typography variant="body2">
                                            수량 : {item.quantity}
                                        </Typography>
                                        
                                    </Box>
                                    <Button onClick={() => dialogHandle(item.cartId, item.quantity)}>
                                        주문 수정
                                    </Button>
                                    <IconButton onClick={() => deleteHandler(item.cartId)}>
                                        <Delete fontSize="inherit"></Delete>
                                    </IconButton>
                                </ListItem>
                                <Divider/>
                            </div>
                        ))}
                    </List>
                    <Grid container spacing={2}>
                        <Grid item xs={11}>
                            <Typography variant="h6">전체 수량 : {total} 원</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={handleOrder} variant="contained">결제하기</Button>
                        </Grid>
                    </Grid>
                </Stack>
                }
            </Box>
        </Box>
    );
}

export default CartPage;
