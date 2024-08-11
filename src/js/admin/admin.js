import axios from "axios";

export const getCategoryList = async () => {
    try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/product/category/list');
        
        if(res.data.result == "success") {
            return res.data.value.data;
        } else {
            alert("카테고리 리스트를 불러오지 못했습니다.")
        }
    } catch(e) {
        console.log(e);
    }

    return [];
}

export const getItemList = async(page, size) => {
    try {
        const res = await axios.get(import.meta.env.VITE_API_URL + 
        `/product/list?page=${page}&size=${size}`);
        
        if(res.data.result == "success") {
            return res.data.value;
        } else {
            alert("상품 리스트를 불러오지 못했습니다.");
        }
    } catch(e) {
        console.error(e);
    }
    
    return [];
}

export const getHeader = (type) => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Content-type': `${type}`,
        'Authorization': `Bearer ${token}`
    };

    return headers;
}


export const addCategory = async (data) => {
    try {
        const url = import.meta.env.VITE_API_URL + '/product/category/add';
        const headers = getHeader('application/json');

        const res = await axios.post(url, data, {headers});

        if(res.data.result == "success") {
            return true;
        } else {
            alert(res.data.value);
        }
    } catch (e) {
        console.log(e);
    }

    return false;
}

export const deleteCategory = async (data) => {
    try {
        const url = import.meta.env.VITE_API_URL + '/product/category/delete';
        const headers = getHeader('application/json');

        const res = await axios.post(url, data, {headers});
  
        if(res.data.result == "success") {
            return true;
        } else {
            alert(res.data.value);
        }
    } catch (e) {
        console.log(e);
    }
}

export const updateCategory = async (data, update) => {
    try {
        const url = import.meta.env.VITE_API_URL + '/product/category/update';
        const headers = getHeader('application/json');

        const res = await axios.put(url, data, {headers});

        if(res.data.result == "success") {
            alert('업데이트 성공');
            update();
        } else {
            alert(res.data.value);
        }
    } catch(e) {
        console.log(e);
    } 
}

export const addProduct = async (data, update) => {
    try {
        const url = import.meta.env.VITE_API_URL + '/product/add';
        const headers = getHeader('multipart/form-data')

        const res = await axios.post(url, data, {headers});

        if(res.data.result == "success") {
            alert('상품 추가 성공');
            update();
        } else {
            alert(res.data.value);
        }
    } catch(e) {
        console.log(e);
    }
}

export const getProductDetail = async (id) => {
    const url = `${import.meta.env.VITE_API_URL}/product/${id}`;
    try {
        const res = await axios.get(url);
        if(res.data.result == 'success') {
            return res.data.value;
        } else {
            alert('상품 정보를 가져오는데 실패했습니다.');
        }
    }catch(e) {
        console.error(e);
    }
}

export const updateProduct = async (data, update) => {
    try {
        const url = import.meta.env.VITE_API_URL + '/product/update';
        const headers = getHeader('multipart/form-data')

        const res = await axios.put(url, data, {headers});

        if(res.data.result == "success") {
            alert('상품 수정 성공');
            update();
        } else {
            alert(res.data.value);
        }
    } catch(e) {
        console.log(e);
    }
}