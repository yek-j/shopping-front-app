import React, { useEffect, useState } from "react";
import { AppBar, Box, CssBaseline, Tab, Tabs, Toolbar } from "@mui/material";
import AdminTabPanel from "../../components/common/AdminTabPanel";
import AdminCategoryAddPage from "./AdminCategoryAddPage";
import AdminCategoryListPage from "./AdminCategoryListPage";
import AdminItemAddPage from "./AdminItemAddPage";
import { getCategoryList, getItemList } from "../../js/admin/admin";
import AdminItemListPage from "./AdminItemListPage";

function AdminPage() {
    const [tab, setTab] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [totalItem, setTotalItem] = useState();

    useEffect(() => {
        fetchCategoryList();
        fetchItemList(1, 4);
    }, []);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    }

    const fetchCategoryList = async () => {
        const data = await getCategoryList();
        setCategoryList(data);
    }

    const fetchItemList = async (page) => {
        const list = await getItemList(page, 4)
        setTotalItem(Math.ceil(list.total / 8));
        setItemList(list.data);
    }

    const handlePageChange = (event, page) => {
        fetchItemList(page);
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
                <Tab label="카테고리 추가" />
                <Tab label="카테고리 리스트" />
                <Tab label="상품 추가" />
                <Tab label="상품 리스트" />
            </Tabs>
            <Box
                sx={{
                    paddingX: 3
                }}
            >
                <AdminTabPanel value={tab} index={0}>
                    <AdminCategoryAddPage update={fetchCategoryList}/>
                </AdminTabPanel>
                <AdminTabPanel value={tab} index={1}>
                    <AdminCategoryListPage list={categoryList} update={fetchCategoryList} />
                </AdminTabPanel>
                <AdminTabPanel value={tab} index={2}>
                    <AdminItemAddPage list={categoryList} />
                </AdminTabPanel>
                <AdminTabPanel value={tab} index={3}>
                    <AdminItemListPage list={itemList} total={totalItem} pagechange={handlePageChange} />
                </AdminTabPanel>
            </Box>
        </Box>
    );
}

export default AdminPage;