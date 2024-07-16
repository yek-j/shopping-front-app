import axios from "axios";

export const Logout = async () => {
    const token = getTokenWithExpiry();
    if(token == null) return false;
    try {
        const url = import.meta.env.VITE_API_URL + '/user/logout';
        const res = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (res.data.result == "success") {
            localStorage.clear();
            return false;
        } else {
            alert("로그아웃 실패");
        }
    } catch (e) {
        console.error(e);
    }

    return true;
}

export const getTokenWithExpiry = () => {
    const strToken = localStorage.getItem('token');
    if(!strToken) {
        return null;
    }

    const token = JSON.parse(strToken);
    const now = new Date();
    if(now.getTime() > token.expiry) {
        localStorage.clear();
        return null;
    }
    return token.value;
}