import React from "react";
import {Box, AppBar, Toolbar, Typography, CssBaseline, Button}  from '@mui/material'

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
                        <Button key={item} sx={{ color: '#fff' }}>
                            {item}
                        </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;