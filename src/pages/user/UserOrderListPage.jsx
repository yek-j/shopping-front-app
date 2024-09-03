import React, { useEffect, useState } from "react";
import { Paper, Pagination, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid } from "@mui/material";
import { formatDate, getOrderListAll, getOrderListByPeriod } from "../../js/item/order";
import CustomDatePicker from "../../components/common/CustomDatePicker";


function UserOrderListPage() {
    const [orderList, setOrderList] = useState([]);
    const [orderTotal, setOrderTotal] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [orderPage, setOrderPage] = useState(1);

    useEffect(() => {
        // 전체 주문 이력
        fetchOrderList();
    },[startDate, endDate, orderPage]);

    const fetchOrderList = async () => {
        let result;
        if(startDate != null) {
            result = await getOrderListByPeriod(orderPage, 10, startDate, endDate);
        } else {
            result = await getOrderListAll(orderPage, 10);
        }
        setOrderList(result);
        // total 값이 없음
        //if(result.length != 0) setOrderTotal(Math.ceil(result.total / 10));
    }

    const handleAllList = async () => {        
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2} sx={{ p: 3, mx: 'auto'}}>
                <Grid item xs={5}>
                    <CustomDatePicker 
                        name="시작 날짜"
                        value={startDate}
                        handleChange={(newValue) => setStartDate(newValue)}
                    />
                </Grid>
                <Grid item xs={5}>
                <CustomDatePicker 
                        name="마지막 날짜"
                        value={endDate}
                        handleChange={(newValue) => setEndDate(newValue)}
                    />
                </Grid>
                <Grid item xs={2} sx={{marginY: 'auto'}}>
                    <Button onClick={handleAllList}>전체 조회</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}  sx={{ p: 3, mx: 'auto'}}>
                <Table aria-label="사용자 주문 정보 테이블">
                    <TableHead>
                        <TableRow>
                            <TableCell>주문명</TableCell>
                            <TableCell>주문 날짜</TableCell>
                            <TableCell >가격</TableCell>
                            <TableCell>취소</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList.map((item) => (
                            <TableRow key={item.orderId}>
                                <TableCell component="th" scope="row">
                                {item.orderName}
                                </TableCell>
                                <TableCell>
                                    {formatDate(item.orderedAt) }
                                </TableCell>
                                <TableCell>
                                    {item.totalPrice}원
                                </TableCell>
                                <TableCell>
                                    <Button>주문 취소</Button>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination 
                count={orderTotal}
                onChange={(e, curPage) => setOrderPage(curPage)}
                sx={{marginY: 5}
            }/>
        </div>
    )
}

export default UserOrderListPage;