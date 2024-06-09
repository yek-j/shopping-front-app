import React from "react";
import Header from "../../components/common/Header";
import { Box, CssBaseline } from "@mui/material";

function CartPage() {
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
                <h3>장바구니</h3>
                <hr/>
                
            </Box>
        </Box>
    );
}

export default CartPage;
