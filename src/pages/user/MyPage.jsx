import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { Box, CssBaseline, Divider, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TabPanel from "../../components/common/TabPanel";
import UserInfoPage from "./UserInfoPage";
import UserOrderListPage from "./UserOrderListPage";
import UserReviewPage from "./UserReviewPage";

function MyPage() {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login');
        }
    },[]);

    const handleTab = (e, newValue) => {
        setTab(newValue);
    }

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
                <h3>마이페이지</h3>
                <Divider/>
                <Tabs
                    value={tab}
                    onChange={handleTab}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="product tab"
                    sx={{
                        marginY: 3
                    }}
                >
                    <Tab label="회원 정보"/>
                    <Tab label="주문 정보"/>
                    <Tab label="리뷰 관리"/>
                </Tabs>
                <Box>
                    <TabPanel value={tab} index={0}>
                        <UserInfoPage/>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <UserOrderListPage/>
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <UserReviewPage/>
                    </TabPanel>
                </Box>
            </Box>
        </Box>
    );
}

export default MyPage;