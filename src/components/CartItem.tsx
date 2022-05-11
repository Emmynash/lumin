import React from "react";
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Product} from 'components'

interface Props {
  item: Product,
  addToCart: (clickedItem: Product) => void,
  removeFromCart: (id: number) => void,
  symbol: string
};

const theme = createTheme()
export const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart, symbol }) => {
  return (
    <ThemeProvider theme={theme}>
      <main
        style={{
        width: '100%',
        backgroundColor: "#c6c7c5",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
        fontFamily: "Arial, Helvetica, sans-serif",
        borderBottom: "1px solid #363b2f",
        paddingBottom: "20px",
      }}>
        <Toolbar sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            component="h5"
            gutterBottom
          >
           {item.title}
          </Typography>

          <img
            src={item.image_url}
            alt={item.title}
            style={{
              maxWidth: "80px",
              objectFit: "cover",
              marginLeft: "40px",
            }}
          />
        </Toolbar>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 4
          }}
        >
          <Typography
            component="h5"
            gutterBottom
          >
            Price: {symbol} {item.price}
          </Typography>
          <Typography
            component="h5"
            gutterBottom
          >
            Total: {symbol} {(item.amount * item.price).toFixed(2)}
          </Typography>
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
              fontSize: '30px',
              "&:hover": {
                border: "none",
                bgcolor: "#363b2f",
              },
              px: 1
            }}
          >
            -
          </Button>
          <Typography component="h5">{item.amount}</Typography>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
            sx={{
              border: "none",
              boxShadow: "none",
              bgcolor: "transparent",
              fontSize: '30px',
              "&:hover": {
                border: "none",
                bgcolor: "#363b2f",
              },
              px: 1
            }}
          >
            +
          </Button>
        </Typography>
      </main>
    </ThemeProvider>
  );
};
