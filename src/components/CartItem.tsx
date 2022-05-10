import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Product} from 'components'

interface Props {
  item: Product,
  addToCart: (clickedItem: Product) => void,
  removeFromCart: (id: number) => void,
};

const theme = createTheme()
export const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <ThemeProvider theme={theme}>
      <main
        style={{
        width: '100%',
        backgroundColor: "#c6c7c5",
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "Arial, Helvetica, sans-serif",
        borderBottom: "1px solid #363b2f",
        paddingBottom: "20px",
      }}>
        <Typography
          component="h5"
          variant="h2"
          gutterBottom
        >
          {item.title}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>Price: ${item.price}</p>
          <p>Total: ${item.amount} * ${item.price}</p>
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
            sx={{
              border: "none",
              boxShadow: "none",
              bgcolor: "transparent",
              fontSize: '12px'
            }}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
            sx={{
              border: "none",
              boxShadow: "none",
              bgcolor: "transparent",
              fontSize: '12px'
            }}
          >
            +
          </Button>
        </Typography>
      </main>
      <img src={item.image_url} alt={item.title} />
    </ThemeProvider>
  );
};
