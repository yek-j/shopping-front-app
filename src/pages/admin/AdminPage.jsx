import React, { useState } from "react";
import { AppBar, Box, CssBaseline, Tab, Tabs, Toolbar } from "@mui/material";
import AdminTabPanel from "../../components/content/AdminTabPanel";

function AdminPage() {
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    }

    return (
        <Box>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <h3>관리자 페이지</h3>
                </Toolbar>
            </AppBar>
            <Tabs
                value={tab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="product tab"
                sx={{
                    padding:3
                }}
            >
                <Tab label="상품 추가" />
                <Tab label="상품 리스트" />
            </Tabs>
            <Box
                sx={{
                    paddingX: 3
                }}
            >
                <AdminTabPanel value={tab} index={0}>
                    상품 추가
                </AdminTabPanel>
                <AdminTabPanel value={tab} index={1}>
                    상품 리스트
                </AdminTabPanel>
            </Box>
        </Box>
    );
}

export default AdminPage;