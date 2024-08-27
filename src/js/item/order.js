import axios from 'axios';

export const totalPrice = (data) => {
    let total = 0;
    for(let i=0; i<data.length; i++) {
        let price = data[i].price;
        let quantity = data[i].quantity;
        total = total + (price * quantity);
    }

    return total;
}

export const getOrderListAll = async (page, size) => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const url = import.meta.env.VITE_API_URL + '/order/list';

    try {
        const res = await axios.get(url,
            {
                params : {page: page, size: size}
            },
            { headers }
        );

        if(res.data.result == "success") {
            return res.data.value;
        } else {
            alert("주문 내역을 불러오지 못했습니다. 관리자에게 문의하세요.")
        }
    } catch(e) {
        console.error(e);
    }

    return [];
}