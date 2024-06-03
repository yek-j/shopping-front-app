import React from "react";
import Header from "../components/common/Header";
import UserField from "../components/common/UserField";


function LoginPage() {
    return (
        <div>
            <Header/>
            <UserField type="login" />
        </div>
    )
}

export default LoginPage;