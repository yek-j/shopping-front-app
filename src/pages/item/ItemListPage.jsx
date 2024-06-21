import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router-dom";
import { Box, Stack, CssBaseline, Pagination } from "@mui/material";
import { useRecoilCallback } from "recoil";
import { categoryState } from "../../js/state/categoryState";
import ItemList from "../../components/content/ItemList";

function ItemListPage() {
    const { cid } = useParams();
    const [categoryName, setCategoryName] = useState('');
    

    const updateCategory = useRecoilCallback(({ snapshot }) => async () => {
        // 현재 categoryState 가져오기
        const curCategory = await snapshot.getPromise(categoryState);
        const target = curCategory.find(obj => obj.category_id === Number(cid));
        setCategoryName(target.name);
    }, []);

    useEffect(() => {
        updateCategory();
    },[updateCategory]);

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
                <ItemList items={itemData} col={4} h={'10000'}/>
                <Pagination 
                    count={10}
                    style={{
                        marginBottom: 30,
                    }}/>
            </Stack>
        </Box >
    );
}

export default ItemListPage;

// 임시 데이터
const itemData = [
    {
      productId: 1,
      primaryUrl: '/test/test1.png',
      title: 'item1',
      price:1000,
    },
    {
      productId: 2,
      primaryUrl: '/test/test2.png',
      title: 'item2',
      price:2000,
    },
    {
      productId: 3,
      primaryUrl: '/test/test3.png',
      title: 'item3',
      price:3000,
    },
    {
      productId: 4,
      primaryUrl: '/test/test1.png',
      title: 'item4',
      price:1000,
    },
    {
      productId: 5,
      primaryUrl: '/test/test2.png',
      title: 'item5',
      price:2000,
    },
    {
      productId: 6,
      primaryUrl: '/test/test3.png',
      title: 'item6',
      price:3000,
    },
  ];