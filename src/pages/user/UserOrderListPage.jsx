import React, { useEffect, useState } from "react";
import { Paper, Pagination } from "@mui/material";
import { getOrderListAll } from "../../js/item/order";

function UserOrderListPage() {
    const [orderList, setOrderList] = useState([]);
    const [orderPage, setOrderPage] = useState(1);
    const [orderTotal, setOrderTotal] = useState(1);

    useEffect(() => {
        // 전체 주문 이력
        fetchOrderListAll();
        console.log(orderList);
    },[]);

    const fetchOrderListAll = async () => {
        const result = await getOrderListAll(orderPage, 10);
        setOrderList(result);

        if(result.length != 0) setOrderTotal(Math.ceil(result.length / 10));
    }

    const handlePageChange = (e, curPage) => {
        setOrderPage(curPage)
    }

    return (
        <div>
            {/* TODO 
                기간별 주문 이력, 전체 주문 이력
                
                기간별 주문 이력을 위한 Date Field 추가
                Date Field 조회 버튼 추가 
                리스트 추가
            */}
            <Paper sx={{ p: 3, mx: 'auto'}}>

            </Paper>
            <Pagination 
                count={orderTotal}
                onChange={handlePageChange}
                style={{
                    marginBottom: 30,
                }}/>
        </div>
    )
}

export default UserOrderListPage;