import axios from "axios";

export const Logout = async () => {
    try {
        const url = import.meta.env.VITE_API_URL + '/user/logout';
        const res = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (res.data.result == "success") {
            alert("로그아웃");
            localStorage.clear();
            return false;
        } else {
            alert("로그아웃 실패");
        }
    } catch (e) {
        console.log(e);
    }

    return true;
}