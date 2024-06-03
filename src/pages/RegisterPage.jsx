import React from "react";
import Header from "../components/common/Header";
import UserField from "../components/common/UserField";

function RegisterPage() {
    return(
        <div>
            <Header/>
            <UserField type="register"/>
        </div>
    );
}

export default RegisterPage;