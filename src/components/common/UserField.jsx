import React from "react";
import { Container, Box, TextField, CssBaseline, Typography, Button, Grid, Link } from "@mui/material";

function UserField(props) {
    let btn_name = '로그인';

    if (props.type === 'register') btn_name = '회원가입';
    else if (props.type === 'email') btn_name ='이메일 찾기';
    else if (props.type === 'password') btn_name ='비밀번호 재지정';

    return(
        <form method="post" onSubmit={props.submit}>
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
                        (props.type === 'retister' || props.type === 'password') && 
                        <TextField id="username" 
                            name="username"
                            fullWidth 
                            required 
                            label="User Name" 
                            type="text" 
                            variant="outlined" 
                            onChange={(event) => props.change({ username:event.target.value })}/> 
                    }
                        
                    <TextField id="email" 
                        name="email"
                        fullWidth 
                        required 
                        label="Email" 
                        type="email" 
                        variant="outlined" 
                        onChange={(event) => props.change({ email:event.target.value })}/> 

                    { 
                        props.type !== "email"  &&  
                        <TextField id="password" 
                        name="password"
                        fullWidth 
                        required
                        label="Password" 
                        type="password"
                        autoComplete="off"
                        variant="outlined" 
                        onChange={(event) => props.change({ password:event.target.value })}/> 
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
                            <Link href="/find/email" variant="hover">
                            이메일 찾기
                            </Link>
                            /
                            <Link href="/find/password" variant="hover">
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
        </form>
    );
}

export default UserField;