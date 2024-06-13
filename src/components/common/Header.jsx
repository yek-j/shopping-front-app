import React, { useEffect, useState } from "react";
import {Box, Tooltip, AppBar, Toolbar, CssBaseline, Button, IconButton, Badge}  from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import { Logout } from "../../user/logout";

const navItems = ["item1", "item2", "item3"];

function Header() {
    const [state, setState] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token') != null) {
            setState(true);
        }
    }, [state]);

    const handleLogout = async () => {
        const result = await Logout();
        setState(result);
    }

    const login = <Button href="/login" size="small" color="inherit" sx={{ marginLeft: 10 }}>LOGIN</Button>
    const logout = <Button onClick={handleLogout} size="small" color="inherit" sx={{ marginLeft: 10 }}>LOGOUT</Button>

    return(
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <Button href="/" size="large" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#fff' }}>
                          DevBabys Shop 
                        </Button>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                        <Button key={item} size="large" sx={{ color: '#fff' }}>
                            {item}
                        </Button>
                        ))}
                        {
                            state && logout
                        }
                        {
                            !state && login
                        }
                        <Tooltip title="마이페이지">
                            <IconButton href="/mypage" size="large" aria-label="person" color="inherit">
                                <PersonIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="장바구니">
                            <IconButton href="/cart" size="large" aria-label="shopping basket" color="inherit">
                                <Badge badgeContent={1} color="error">
                                    <ShoppingBasketIcon/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;