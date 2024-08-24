import React, { useEffect, useState } from "react";
import {Box, Tooltip, AppBar, Toolbar, CssBaseline, Button, IconButton, Badge}  from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import { Logout, getTokenWithExpiry } from "../../js/user/logout";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { categoryAtom, categorySelector } from "../../js/state/categoryState";
import { Link, useNavigate } from "react-router-dom";
import { cartListAtom, getCartList, cartStateAtom } from "../../js/state/cartState";

function Header() {
    const [state, setState] = useState(false);
    const [cartState, setCartState] = useRecoilState(cartStateAtom);
    const [category, setCategory] = useState([]);
    const [cartList, setCartList] = useRecoilState(cartListAtom);
    const useCategoryLoadable = useRecoilValueLoadable(categorySelector);
    const [categoryState, setCategoryState] = useRecoilState(categoryAtom);
    const [cartTotal, setCartTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getTokenWithExpiry();
        if(token != null) {
            setState(true);
            if(cartState == false) getCartTotal();
            else {
                if(cartList !== undefined) {
                    setCartTotal(cartList.length);
                }
            }
            setCartState(true);
        }
        
        if(category.length === 0 && useCategoryLoadable.state === 'hasValue') {
            setCategoryState(useCategoryLoadable.contents);
        } 
        setCategory(categoryState);
    }, [cartList, state, useCategoryLoadable.state, useCategoryLoadable.contents]);

    const handleLogout = async () => {
        const result = await Logout();
        setState(result);
        navigate('/');
    }

    const getCartTotal = async () => {
        const list = await getCartList();
        setCartList(list);
        const total = await list.length;
        setCartTotal(total);
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
                            component={Link}
                            to={`/category/${item.categoryId}`}
                            key={item.categoryId} 
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
                                <Badge badgeContent={cartTotal} color="error">
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