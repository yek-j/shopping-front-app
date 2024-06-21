import React from "react";

import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

function ItemList(props) {
    return (
        <ImageList sx={{ width: props.w, height: props.h, overflow: 'hidden' }} cols={props.col} gap={8}>
          {props.items.map((item) => (
            <ImageListItem key={item.productId} href='/'>
              <a href="#" style={{ width: '100%', height: '100%', display: 'block' }}>
                <img
                  srcSet={`${item.primaryUrl}`}
                  src={`${item.primaryUrl}`}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </a>
              <ImageListItemBar 
              title={item.title}
              subtitle={`${item.price}원`}/>
            </ImageListItem>
          ))}
        </ImageList>
      );
}

export default ItemList;
