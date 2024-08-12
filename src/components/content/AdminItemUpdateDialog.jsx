import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button, TextField, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProductDetail, updateProduct } from "../../js/admin/admin";
import UploadPreviewImages from "../../components/common/UploadPreviewImages";

function AdminItemUpdateDialog(props) {
    const [item, setItem] = useState({});
    const [categoryId, setCategoryId] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages([]);
        getDetail();
    }, [props.productId]);

    const getDetail = async () => {
        const id = await props.productId;
        if (id != undefined) {
            const data = await getProductDetail(id);
            setItem(data);
            setCategoryId(data.category.categoryId);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    }
    
    const categoryIdChange = (event) => {
        setCategoryId(event.target.value);
    }

    const imageChange = (event) => {
        const imgLists = event.target.files;
        let imgUrlLists = [...images];
        for (let i = 0; i < imgLists.length; i++) {
            const file = imgLists[i];
            const preview = URL.createObjectURL(file);
            if(imgUrlLists.length < 5) imgUrlLists.push({file, preview});
        } 

        setImages(imgUrlLists);
    }

    const imageDelete = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.close}
            fullWidth
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const productData = new FormData(event.currentTarget);

                    const data = {
                        productId: productData.get('productId'),
                        name: productData.get('name'),
                        description: productData.get('description'),
                        price: productData.get('price'),
                        quantity: productData.get('quantity'),
                        categoryId: productData.get('categoryId')
                    };

                    const formData = new FormData();
                    
                    formData.append('product', new Blob([JSON.stringify(data)], { type: 'application/json' }));
                    for (const img of images) {
                        formData.append('image', img.file);
                    }

                    updateProduct(formData, props.update)
                    props.close();
                }
            }}
        >
            <DialogTitle id="dialog-item-update">
                {"상품 수정"}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 0.5}}>
                <input type="hidden" id="productId" name="productId" value={props.productId} />
                <TextField
                    id="name"
                    name="name"
                    label="상품 이름"
                    margin="dense"
                    value={item.name || ""}
                    onChange={handleChange}
                />
                <TextField
                    select
                    label="카테고리"
                    id="categoryId"
                    name="categoryId"
                    value={categoryId || ""}
                    onChange={categoryIdChange}
                >
                    {props.list.map((category) => (
                        <MenuItem key={category.categoryId} value={category.categoryId}>{category.name}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    type="number"
                    label="상품 가격"
                    id="price"
                    InputProps={{ inputProps: { min: 1 } }}
                    name="price"
                    margin="dense"
                    value={item.price || ""}
                    onChange={handleChange}
                />
                <TextField
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    label="상품 재고"
                    id="quantity"
                    name="quantity"
                    margin="dense"
                    value={item.quantity || ""}
                    onChange={handleChange}
                />
                <TextField 
                    fullWidth
                    multiline
                    rows={5}
                    id="description"
                    name="description"
                    label="상품 설명"
                    margin="dense"
                    value={item.description || ""}
                    onChange={handleChange}
                />
                <Grid 
                    container 
                    spacing={2} 
                >
                    <Grid item xs={9} sx={{ height: 100}}>
                        <UploadPreviewImages imgs={images} handleDelete={imageDelete}/>
                    </Grid>
                    <Grid item xs={3} sx={{ paddingLeft: 3, marginTop: 1}}>
                        <Button
                            component="label"
                            variant="contained"
                        >
                            파일 선택
                            <input 
                                id="image" 
                                name="image"
                                onChange={imageChange} 
                                type="file" 
                                hidden 
                                multiple 
                                accept="image/*"/>
                        </Button>
                    </Grid>
                </Grid>
                <span>이미지 파일을 변경하지 않으려면 파일 선택을 하지마세요!</span>
                <span>부분 수정은 불가능 합니다.</span>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>닫기</Button>
                <Button type="submit">상품 수정</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdminItemUpdateDialog;