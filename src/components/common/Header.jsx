import React, { useEffect, useState } from "react";
import {Box, Tooltip, AppBar, Toolbar, CssBaseline, Button, IconButton, Badge}  from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import { Logout } from "../../js/user/logout";
import { useRecoilState } from "recoil";
import { categoryState } from "../../js/state/categoryState";
import { getCategory } from "../../js/item/category";

function Header() {
    const [state, setState] = useState(false);
    const [category, setCategory] = useRecoilState(categoryState)

    useEffect(() => {
        if(localStorage.getItem('token') != null) {
            setState(true);
        }
        
        if(category.length === 0) {
            // api로 카테고리 받아오기
            //const test = getCategory();
            // 임시
            setCategory([{category_id: 1, name: 'item1'}, 
                        {category_id: 2, name: 'item2'}, 
                        {category_id: 3, name: 'item3'}]);

        }
    }, [state, category]);

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
                        {category.map((item) => (
                        <Button 
                            href={`/category/${item.category_id}`}
                            key={item.category_id} 
                            size="large" 
                            sx={{ color: '#fff' }}>
                            {item.name}
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