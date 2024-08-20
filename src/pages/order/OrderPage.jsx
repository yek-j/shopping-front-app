import { Box, Button, CssBaseline, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useLocation } from "react-router-dom";
import { totalPrice } from "../../js/item/order";

function OrderPage() {
    const location = useLocation();
    const orderData = location.state || {data: []};
    const [total, setTotal] = useState(0);
    const [memo, setMemo] = useState('');
    
    useEffect(() => {
        if(orderData.data.length > 0) {
            setTotal(totalPrice(orderData.data));
        }
    },[orderData.data])

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
                <h3>결제</h3>
                <Divider/>
                <Typography variant="h6" sx={{marginY: 3}}>주문 제품 정보</Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="주문 제품 테이블">
                        <TableHead>
                            <TableRow>
                                <TableCell>제품명</TableCell>
                                <TableCell align="right">가격</TableCell>
                                <TableCell align="right">수량</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderData.data.map((item) => (
                                <TableRow key={item.productId}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="right">{item.price}원</TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{marginTop: 2}}
                >
                    <TextField
                        label="요청 사항 메시지"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        fullWidth
                    />
                </Box>

                <Grid container spacing={2} sx={{marginTop: 2}} >
                    <Grid item sm={10} >
                        <Typography variant="h6">총합 : {total}</Typography>
                    </Grid>
                    <Grid item sm={2}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button size="large" variant="contained">결제하기</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default OrderPage;