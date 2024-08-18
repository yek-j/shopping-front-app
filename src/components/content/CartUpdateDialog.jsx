import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateCart } from "../../js/cart/cart";

function CartUpdateDialog(props) {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(props.data.quantity);
    }, [props.data.id, props.data.quantity]);

    return (
        <Dialog
            open={props.open}
            onClose={props.close}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    updateCart(formJson, props.update);
                    props.close();
                }
            }}
        >
            <DialogTitle id="dialog-cart-update">
                {"장바구니 주문 수정"}
            </DialogTitle>
            <DialogContent>
                <input type="hidden" name="cartId" value={props.data.id}/>
                <TextField 
                    required
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={quantity || 1}
                    inputProps={{ min: 1 }}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>닫기</Button>
                <Button type="submit">주문 수정</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CartUpdateDialog;