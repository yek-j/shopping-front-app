import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import { Box, CssBaseline } from "@mui/material";
import axios from "axios";
import ItemDetail from "../../components/content/ItemDetail";

function ItemDetailPage() {
    const { id } = useParams();
    const [item, setItem] = useState();

    useEffect(() => {
        getDetail();
    },[]);

    const getDetail = async () => {
        const url = `${import.meta.env.VITE_API_URL}/product/${id}`;
        try {
            const res = await axios.get(url);
            if(res.data.result == 'success') {
                setItem(res.data.value);
            }
        }catch(e) {
            console.error(e);
        }
    }

    return (
        <Box
            style={{
                height: '100vh',
            }}
        >
            <Header/>
            <CssBaseline/>
            { item !== undefined &&
                <Box>
                    <ItemDetail item={item}/>
                </Box>
            }
        </Box>
    );
} 

export default ItemDetailPage;