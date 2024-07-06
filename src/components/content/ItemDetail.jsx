import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { getCurrentPrice, movePrimaryItem } from "../../js/item/itemDetail";

function ItemDetail(props) {
    const [arrImg, setArrImg] = useState([]);
    const [amount, setAmount] = useState(1);
    const [curPrice, setCurPrice] = useState(0);
    
    useEffect(() => {
       // 이미지에서 대표 이미지를 가장 앞으로
       if (props.item.image.length > 0) {
            const imglist = movePrimaryItem(props.item.image);
            setArrImg(imglist);
       } 
       setCurPrice(props.item.price);
       console.log(props.item);
    }, []);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        const result = getCurrentPrice(props.item.price, event.target.value);
        
        setCurPrice(result);
    }

    return(
        <Box
            style={{
                height: '100vh',
            }}
        >
            <Grid container spacing={8} padding={10}>
                <Grid item xs={6}>
                    <Carousel imgs={arrImg} w={'100vh'} h={130} />
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
                        value={amount}
                        label="수량"
                        onChange={handleAmountChange}
                    />
                    <div>
                        <h1>합계 :  {curPrice}원</h1>
                    </div>
                    <Stack direction="row" spacing={2}>
                        <Button size="large" color="primary" variant="contained">장바구니</Button>
                        <Button size="large" color="info" variant="contained">구매하기</Button>
                    </Stack>
                </Grid>
             </Grid>
             {/* 상품 설명 & 리뷰 */}
        </Box>
    );
}

export default ItemDetail;