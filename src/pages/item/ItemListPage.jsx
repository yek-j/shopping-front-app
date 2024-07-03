import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router-dom";
import { Box, Stack, CssBaseline, Pagination } from "@mui/material";
import { useRecoilValueLoadable } from "recoil";
import { categorySelector } from "../../js/state/categoryState";
import ItemList from "../../components/content/ItemList";
import { getCategoryItemList } from "../../js/item/categoryItemList";

function ItemListPage() {
    const { cid } = useParams();
    const useCategoryLoadable = useRecoilValueLoadable(categorySelector);
    const [categoryName, setCategoryName] = useState('');
    const [categoryItemList, setCategoryItemList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);

    useEffect(() => {
      fetchCategory();
      fetchList();
    },[cid, page]); 

    const fetchCategory = async () => {
      const category = await useCategoryLoadable.contents;
      const target = await category.find(obj => obj.categoryId === Number(cid));
      setCategoryName(target.name);
    }

    const fetchList = async () => {
      const list = await getCategoryItemList(cid, page, 4);
      setTotal(Math.ceil(list.total / 8)); // count 구하기
      setCategoryItemList(list.data);
    } 

    const handlePageChange = (event, curPage) => {
      setPage(curPage);
    }

    return(
        <Box
            style={{
                height: '100vh',
            }}
        >
            <Header/>
            <CssBaseline/>
            <Box ml={2} mr={2}>
                <h2>{categoryName}</h2>  
                <hr/>
            </Box>
            <Stack 
                alignItems="center"
                ml={2} mr={2}
            >
                <ItemList items={categoryItemList} col={4} h={'10000'}/>
                <Pagination 
                    count={total}
                    onChange={handlePageChange}
                    style={{
                        marginBottom: 30,
                    }}/>
            </Stack>
        </Box >
    );
}

export default ItemListPage;