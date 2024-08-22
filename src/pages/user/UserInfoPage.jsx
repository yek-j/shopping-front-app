import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUser } from "../../js/user/user";

function UserInfoPage() {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUser();
        console.log(user);
    }, []);

    const fetchUser = async () => {
        const result = await getUser();
        setUser(result);
    }

    return (
        <Paper sx={{ p: 3, mx: 'auto'}}>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography flexBasis="150px" fontWeight="bold">
                    이름 :
                </Typography>
                <TextField
                    required
                    id="username"
                    name="username"
                    sx={{ width: '50%'}}
                    value={user.username}
                />
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography flexBasis="150px" fontWeight="bold">
                    이메일 :
                </Typography>
                <TextField
                    required
                    id="email"
                    name="email"
                    sx={{ width: '50%'}}
                    value={user.email}
                />
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography flexBasis="150px" fontWeight="bold">
                    비밀번호 :
                </Typography>
                <TextField
                    type="password"
                    label="비밀번호 변경 시 입력"
                    id="password"
                    name="password"
                    sx={{ width: '50%'}}
                />
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography flexBasis="150px" fontWeight="bold">
                    비밀번호 확인 :
                </Typography>
                <TextField
                    type="password"
                    label="비밀번호 변경 시 입력"
                    id="passwordchk"
                    name="passwordchk"
                    sx={{ width: '50%'}}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                <Button variant="contained" color="primary">사용자 정보 수정</Button>
            </Box>
        </Paper>
    );
}

export default UserInfoPage;