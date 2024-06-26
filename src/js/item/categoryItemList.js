import axios from "axios";

export const getCategoryItemList = async (categoryId, page, size) => {
    const url = `${import.meta.env.VITE_API_URL}/product/list/${categoryId}`;

    try {
        const res = await axios.get(url, 
            {
                 params : {page: page, size: size}
            }
        );

        if(res.data.result == "success") {
            return res.data.value;
        } else {
            alert("상품을 불러오지 못했습니다. 관리자에게 문의하세요.")
        }
    } catch(e) {
        console.error(e);
    }
    
    return [];
}