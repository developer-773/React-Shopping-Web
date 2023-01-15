import * as React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { NavLink, Route, Routes } from 'react-router-dom';
import Order from '../Order/Order';
import Products from "../Products/Products"
import Categories from '../Categories/Categories';

export const Admin = () => {

  const menuItem = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/admin",
      title: "Order"
    },
    {
      path: "products",
      title: "Product"
    },
    {
      path: "category",
      title: "Category"
    },
  ]

  const activeStyle = {
    textDecoration: "none",
    color: "silver",
    fontSize: "19px",
    borderBottom: "1px solid silver"
  }

  const inActiveStyle = {
    textDecoration: "none",
    color: "silver",
    fontSize: "19px",
  }

  return (
    <>
    <Box sx={{display:"flex", }}>
    <Box sx={{ width: '100%', maxWidth: "300px", height: "100vh", backgroundColor: "black", opacity: '.8' }}>
      <Typography variant='h2' component={'h2'}>
        Logo
      </Typography>
      <List>
        {menuItem.map((item) => (
          <ListItem key={item.title}>
            <NavLink  style={({ isActive }) =>
              isActive ? activeStyle : inActiveStyle
            } to={item.path}>{item.title}</NavLink>
          </ListItem>
        )) }
      </List>
     </Box>
     <Routes>
      <Route index element={<Order />} />
      <Route path='/products' element={<Products />} />
      <Route path='/category' element={<Categories />} />
     </Routes>
    </Box>
    </>
  );
}