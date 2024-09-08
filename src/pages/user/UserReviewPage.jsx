import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, Pagination, Typography } from "@mui/material";
import { deleteReview, getReviewByUser } from "../../js/item/review";
import ReviewDialog from "../../components/content/ReviewDialog";

function UserReviewPage() {
    const [reviewList, setReviewList] = useState([]);
    const [reviewTotal, setReviewTotal] = useState(1);
    const [reviewPage, setReviewPage] = useState(1);

    // Dialog
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        fetchReviews();
    }, [reviewPage])

    const fetchReviews = async () => {
        const result = await getReviewByUser(reviewPage, 10);
        setReviewList(result.data);
        if(result.length != 0) setReviewTotal(Math.ceil(result.total / 10));
    }

    const dialogHandler = (review) => {
        setData(review);
        setOpen(true);
    }

    const deleteHandler = (review) => {
        const deleteData = {
            reviewId: review.reviewId,
            productId: review.productId,
            rating: review.rating,
            comment: review.comment,
        }
        deleteReview(deleteData, fetchReviews);
    }

    return (
        <Box>
            <ReviewDialog
                open={open}
                close={() => setOpen(false)}
                data={data}
                update={fetchReviews}
            />
            <List>
                {reviewList.map((review, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    variant="square"
                                    src={review.image}
                                    alert={review.productName}
                                    sx={{width: 80, height: 80}}
                                />
                            </ListItemAvatar>
                            <Box sx={{ ml: 2, flex: 1}}>
                                <Typography variant="h6" component="div">
                                    {review.productName}
                                </Typography>
                            </Box>
                            {review.reviewStatus && <Button onClick={() => dialogHandler(review)}>리뷰 수정</Button>}
                            {review.reviewStatus && <Button onClick={() => deleteHandler(review)}>리뷰 삭제</Button>}
                            {!review.reviewStatus && <Button onClick={() => dialogHandler(review)}>리뷰 작성</Button>}
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                ))}
            </List>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Pagination
                    count={reviewTotal}
                    onChange={(e, curPage) => setReviewPage(curPage)}
                    sx={{my: 2}}
                />
            </Box>
            
        </Box>
    );
}

export default UserReviewPage;