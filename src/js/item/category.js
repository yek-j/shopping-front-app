import axios from "axios";

export const getCategory = async () => {
    try {
        const url = import.meta.env.VITE_API_URL + '/product/category/list';
        const res = await axios.get(url);
        return res.data.value;
    } catch (e) {
        alert("카테고리를 불러오는 중 에러 발생, 관리자에게 문의하세요");
        console.error(e);
    }
}