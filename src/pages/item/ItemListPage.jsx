import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { useRecoilCallback } from "recoil";
import { categoryState } from "../../js/state/categoryState";

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
                <h3>{categoryName}</h3>
                <hr/>
                
            </Box>
        </Box>
    );
}

export default ItemListPage;