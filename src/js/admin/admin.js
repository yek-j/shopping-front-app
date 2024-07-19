import axios from "axios";
export const getCategoryList = async () => {
    const res = await axios.get(import.meta.env.VITE_API_URL + '/product/category/list');
    return res.data.value.data;
}