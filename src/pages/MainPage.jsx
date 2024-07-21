import React from 'react'
import Header from '../components/common/Header'
import Carousel from '../components/content/Carousel';
import ItemList from '../components/content/ItemList';

import { Grid } from '@mui/material';
// 임시 데이터
const itemData = [
  {
    productId: 1,
    primaryUrl: '/test/test1.png',
    url: '/test/test1.png',
    title: 'item1',
    price:1000,
  },
  {
    productId: 2,
    primaryUrl: '/test/test2.png',
    url: '/test/test2.png',
    title: 'item2',
    price:2000,
  },
  {
    productId: 3,
    primaryUrl: '/test/test3.png',
    url: '/test/test3.png',
    title: 'item3',
    price:3000,
  },
];

function Main() {
  return (
    <>
      <Header/>
      <Carousel imgs={itemData} w={'100vh'} h={300}/>
      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{marginTop: 10}}
      >
        <h1>Best</h1>
        <ItemList items={itemData} col={3} w={800} h={'300'} to=''/>
      </Grid>
    </>
  )
}

export default Main;

