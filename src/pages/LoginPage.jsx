import React from "react";
import Header from "../components/common/Header";

import { Container, Box, TextField, CssBaseline, Typography, Button, Grid, Link } from "@mui/material";


function LoginPage() {
    return (
        <div>
            <Header/>
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
                    <Typography fontWeight={800} variant="h5">LOGIN</Typography>
                    <TextField id="email" 
                        name="email"
                        fullWidth 
                        required 
                        label="Email" 
                        type="email" 
                        variant="outlined" /> 

                    <TextField id="password" 
                        name="password"
                        fullWidth 
                        required
                        label="Password" 
                        variant="outlined" />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        로그인
                    </Button>
                    <Grid container>
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
                            <Link href="#" variant="hover">
                                회원가입
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default LoginPage;