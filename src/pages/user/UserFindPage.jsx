import React, {useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import UserField from "../../components/common/UserField";

function UserFindPage() {
    const { type } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleChange = (data) => {
        if(data.email) setEmail(data.email);
        if(data.username) setUsername(data.username);
    }

    return (
        <div>
            <Header/>
            <UserField type={type} change={handleChange} />
        </div>
    )
}

export default UserFindPage;