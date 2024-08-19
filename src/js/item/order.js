export const totalPrice = (data) => {
    let total = 0;
    for(let i=0; i<data.length; i++) {
        let price = data[i].price;
        let quantity = data[i].quantity;
        total = total + (price * quantity);
    }

    return total;
}