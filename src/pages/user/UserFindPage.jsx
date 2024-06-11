import React, {useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import UserField from "../../components/common/UserField";
import TextDialog from "../../components/common/TextDialog";
import { useNavigate } from 'react-router-dom';

function UserFindPage() {
    const navigate = useNavigate();
    const { type } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // dialog
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [pass, setPass] = useState(false);

    const handleChange = (data) => {
        if(data.email) setEmail(data.email);
        if(data.username) setUsername(data.username);
        if(data.password) setPassword(data.password);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data;
        const url = import.meta.env.VITE_API_URL + "/user/" + (type === "email" ? "findemail" : "resetpw");
        
        if (type === "email") {
            data = { email };
        } else {
            data = {
                email, 
                username,
                password 
            };
        }

        try {
            const res = await axios.post(url, data);

            if(res.data.result == "success") {
                switch (type) {
                    case "email":
                        setMessage("존재하는 이메일 입니다.");
                        break;
                    case "password":
                        setMessage("비밀번호를 변경에 성공했습니다.");
                }    
                
                setPass(true);
            } else {
                const msg = type === "email" ? "이메일 존재하지 않습니다." 
                    : "사용자가 일치하지 않아 비밀번호 변경에 실패했습니다.";
                setMessage(msg);
                setPass(false);
            }
        } catch(e) {
            console.error(e);
        }
        
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        if(pass) navigate('/login');
    }

    return (
        <div>
            <Header/>
            <TextDialog open={open} message={message} close={(handleClose)} />
            <UserField type={type} change={handleChange} submit={handleSubmit} />
        </div>
    )
}

export default UserFindPage;