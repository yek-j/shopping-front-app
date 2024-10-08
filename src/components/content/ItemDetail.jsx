import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { Box, Button, Divider, Grid, Stack, TextField } from "@mui/material";
import { getCurrentPrice, movePrimaryItem } from "../../js/item/itemDetail";
import ItemReview from "./ItemReview";
import { addCart } from "../../js/cart/cart";
import { useRecoilState } from "recoil";
import { cartListAtom, getCartList } from "../../js/state/cartState";
import { useNavigate } from "react-router-dom";
import { getTokenWithExpiry } from "../../js/user/logout";

function ItemDetail(props) {
    const navigate = useNavigate();
    const [arrImg, setArrImg] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [curPrice, setCurPrice] = useState(0);
    const [, setCartList] = useRecoilState(cartListAtom);

    useEffect(() => {
       // 이미지에서 대표 이미지를 가장 앞으로
       if (props.item.image.length > 0) {
            const imglist = movePrimaryItem(props.item.image);
            setArrImg(imglist);
       } 
       setCurPrice(props.item.price);
    }, []);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
        const result = getCurrentPrice(props.item.price, event.target.value);
        
        setCurPrice(result);
    }

    const addItem = async () => {
        const data = {
            productId: props.item.productId,
            quantity: quantity,
        }
        
        addCart(data, updateCart);
    }

    const updateCart = async () => {
        const newList = await getCartList();
        setCartList(newList);
    }
    
    const orderItem = async () => {
        const data = [{
            productId: props.item.productId,
            name: props.item.name,
            price: props.item.price,
            quantity: quantity,
        }];

        const token = getTokenWithExpiry();
        if(token != null) {
            // Order Page로
            navigate('/order', { state: { data } });
        } else {
            alert("로그인 후 구매 가능합니다.");
            navigate('/login');
        }
    };

    return(
        <Box
            style={{
                height: '100vh',
            }}
        >
            <Grid container spacing={8} padding={10}>
                <Grid item xs={6}>
                    <Carousel imgs={arrImg} w={'100vh'} h={300} />
                </Grid>
                <Grid item xs={6}>
                    <h1>{props.item.name}</h1>
                    <h3>{props.item.price}원</h3>
                    
                    <hr/>
                    
                    <TextField
                        sx={{
                            marginTop: 2,
                            marginBottom: 2
                        }}
                        type="number"
                        value={quantity}
                        label="수량"
                        onChange={handleQuantityChange}
                    />
                    <div>
                        <h1>합계 :  {curPrice}원</h1>
                    </div>
                    <Stack direction="row" spacing={2}>
                        <Button size="large" color="primary" onClick={addItem} variant="contained">장바구니</Button>
                        <Button size="large" color="info" onClick={orderItem} variant="contained">구매하기</Button>
                    </Stack>
                </Grid>
             </Grid>
             <Box paddingX={10} >
                <h2>상품 설명</h2>
                <Divider sx={{ marginBottom: 3 }} />
                {props.item.description}
             </Box>
             
             <Box paddingX={10} paddingTop={10}>
                <h2>Review</h2>
                <Divider sx={{ marginBottom: 3 }} />
                <ItemReview pid={props.item.productId} />
             </Box>
        </Box>
    );
}

export default ItemDetail;