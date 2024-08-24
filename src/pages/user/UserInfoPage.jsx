import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteUser, getUser, updateUser } from "../../js/user/user";
import ConfirmDialog from "../../components/common/ConfirmDialog";

function UserInfoPage() {
    const [user, setUser] = useState({});
    const [pwd, setPwd] = useState('');
    const [pwdChk, setPwdChk] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const result = await getUser();
        setUser(result);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        if(pwd.trim() != '') {
            if(pwd === pwdChk) {
                setUser((prev) => ({
                    ...prev,
                    password: pwd
                }));
            } else {
                alert("비밀번호 확인이 일치하지 않습니다.");
            }
        }
        updateUser(user);
        setPwd('');
        setPwdChk('');
    }

    const handleDelete = () => {
        setOpen(false);
        deleteUser();
    }

    return (
        <div>
            <ConfirmDialog 
                open={open}
                close={() => setOpen(false)}
                title="회원 탈퇴"
                content="정말로 탈퇴하시겠습니까?"
                confirm={handleDelete}
            />
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
                        onChange={handleChange}
                    />
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                    <Typography flexBasis="150px" fontWeight="bold">
                        이메일 :
                    </Typography>
                    <Typography>{user.email}</Typography>
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
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
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
                        value={pwdChk}
                        onChange={(e) => setPwdChk(e.target.value)}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                    <Button variant="contained" color="primary" onClick={handleUpdate}>사용자 정보 수정</Button>
                </Box>
            </Paper>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                <Button onClick={() => setOpen(true)}>회원 탈퇴</Button>
            </Box>
        </div>
    );
}

export default UserInfoPage;