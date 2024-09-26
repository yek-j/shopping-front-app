import axios from 'axios';
import dayjs from 'dayjs';

export const totalPrice = (data) => {
    let total = 0;
    for(let i=0; i<data.length; i++) {
        let price = data[i].price;
        let quantity = data[i].quantity;
        total = total + (price * quantity);
    }

    return total;
}

export const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

const formatDateSafely = (date) => {
    if (date && dayjs(date).isValid()) {
        return dayjs(date).format('YYYY-MM-DD');
    }
    return null;
};

export const getOrderListAll = async (page, size) => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const url = import.meta.env.VITE_API_URL + '/order/list';

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
            alert("주문 내역을 불러오지 못했습니다. 관리자에게 문의하세요.")
        }
    } catch(e) {
        console.error(e);
    }

    return [];
}

export const getOrderListByPeriod = async (page, size, startDate, endDate) => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const url = import.meta.env.VITE_API_URL + '/order/listByPeriod';

    try {
        const formattedStartDate = formatDateSafely(startDate);
        const formattedEndDate = formatDateSafely(endDate);
          
        const res = await axios.get(url,
            {
                headers: headers,
                params: {
                    page: page, 
                    size: size, 
                    startDate: formattedStartDate, 
                    endDate: formattedEndDate
                }
            },
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

// 상품 상세 페이지 결제 ProductList 데이터 생성
export const singleProductData = (data) => {
    const productList = {
        product: [
            {
                productId: data[0].productId,
                quantity: data[0].quantity
            }
        ]
    }

    return productList;
}

// 장바구니 결제 ProductList 데이터 생성 
export const cartProductData = (data) => {
    return {
        product: data.map(item => ({
            productId: item.product.productId,
            quantity: item.quantity
        }))
    };
}