import axios from "axios";

export const getReviewByUser = async(page, size) => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const url = import.meta.env.VITE_API_URL + '/review/list';

    try {
        const res = await axios.get(url, 
            {
                headers: headers,
                params: {page: page, size: size}
            },
        );

        if(res.data.result == "success") {
            return res.data.value;
        } else {
            alert("리뷰를 불러올 수 없습니다. 관리자에게 문의하세요.")
        }

    } catch (e) {
        console.error(e);
    }

    return [];
}