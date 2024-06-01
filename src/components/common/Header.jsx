import React from "react";
import {Box, AppBar, Toolbar, Typography, CssBaseline, Button, IconButton, Badge}  from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const navItems = ["item1", "item2", "item3"];

function Header() {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} >
                    DevBabys Shop 
                    </Typography>
                    
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                        <Button key={item} size="large" sx={{ color: '#fff' }}>
                            {item}
                        </Button>
                        ))}
                        <Button href="/login" size="small" color="inherit" sx={{ marginLeft: 10 }}>
                            LOGIN
                        </Button>
                        <IconButton size="large" aria-label="shopping basket" color="inherit">
                            <Badge badgeContent={1} color="error">
                                <ShoppingBasketIcon/>
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;