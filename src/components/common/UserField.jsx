import React from "react";
import { Container, Box, TextField, CssBaseline, Typography, Button, Grid, Link } from "@mui/material";

function UserField(props) {
    let btn_name = '로그인';

    if (props.type === 'register') btn_name = '회원가입';
    else if (props.type !== 'login') btn_name = props.type + ' 찾기';

    return(
        <Container  maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 20,
                    gap: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
            >
                <Typography fontWeight={800} variant="h5">{btn_name}</Typography>
                {
                    (props.type === 'register' || props.type === 'password') && 
                    <TextField id="username" 
                        name="username"
                        fullWidth 
                        required 
                        label="User Name" 
                        type="text" 
                        variant="outlined" /> 
                }
                    
                <TextField id="email" 
                    name="email"
                    fullWidth 
                    required 
                    label="Email" 
                    type="email" 
                    variant="outlined" /> 

                { 
                    (props.type === 'login' || props.type === 'register') &&  
                    <TextField id="password" 
                    name="password"
                    fullWidth 
                    required
                    label="Password" 
                    type="password"
                    variant="outlined" />
                }

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    {btn_name}
                </Button>
                {props.type === 'login' && <Grid container>
                    <Grid item xs={10}>
                        <Link href="#" variant="hover">
                        이메일 찾기
                        </Link>
                        /
                        <Link href="#" variant="hover">
                        비밀번호 찾기
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/register" variant="hover">
                            회원가입
                        </Link>
                    </Grid>
                </Grid>}
            </Box>
        </Container>
    );
}

export default UserField;