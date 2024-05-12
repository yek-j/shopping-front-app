import React from "react";

import { ImageList, ImageListItem } from "@mui/material";

function ItemList() {
    return (
        <ImageList sx={{ width: 800, height: '300' }} cols={3} gap={10}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}`}
                src={`${item.img}`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      );
}

const itemData = [
    {
      img: '/test/test1.png',
      title: 'item1',
    },
    {
        img: '/test/test2.png',
        title: 'item2',
    },
    {
        img: '/test/test3.png',
        title: 'item3',
    },
  ];

export default ItemList;