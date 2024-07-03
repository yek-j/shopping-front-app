import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import { Box } from "@mui/material";
import axios from "axios";

function ItemDetailPage() {
    const { id } = useParams();

    useEffect(() => {
        getDetail();
    },[]);

    // test
    const getDetail = async () => {
        const url = `${import.meta.env.VITE_API_URL}/product/${id}`;
        try {
            const res = await axios.get(url);
            console.log(res);
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
            <Box>
                
            </Box>
        </Box>
    );
} 

export default ItemDetailPage;