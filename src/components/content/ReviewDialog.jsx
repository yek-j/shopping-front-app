import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addReview, updateReview } from "../../js/item/review";

function ReviewDialog(props) {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        setName(props.data.productName || '');
        setComment(props.data.comment || '');
        setRating(props.data.rating || 0);
    }, [props.data.productId, props.data.reviewId]);

    const txt = props.data.reviewId == null ? "리뷰 추가" : "리뷰 수정";

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
                    console.log(formJson);
                    if(rating == 0) {
                        alert("평점을 입력하세요.");
                        return;
                    }
                    if(props.data.reviewId == null) addReview(formJson, props.update);
                    else updateReview(formJson, props.update);
                    props.close();
                }
            }}
        >
            <DialogTitle id="dialog-review">
                {txt}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', width:500, flexDirection: 'column', gap: 2, my: 0.5}}>
                {props.data.reviewId !== undefined && props.data.reviewId !== null ? (
                    <input
                    type="hidden"
                    name="reviewId"
                    value={props.data.reviewId}
                    />
                ) : null}
                <input type="hidden" name="productId" value={props.data.productId || 0}/>
                <Typography variant="h6" component="div">
                    제품명 : {name}
                </Typography>
                <Rating 
                    id="rating"
                    name="rating"
                    value={Number(rating)}
                    onChange={(e) => setRating(e.target.value)}
                />
                <TextField
                    required
                    id="comment"
                    name="comment"
                    fullWidth
                    multiline
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>닫기</Button>
                <Button type="submit">{txt}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReviewDialog;