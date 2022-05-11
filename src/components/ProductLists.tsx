import React, { useState} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Drawer from '@mui/material/Drawer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery, gql } from "@apollo/client";
import { CartSideMenu } from "components";

const PRODUCTS_QUERY = gql`
  {
    products{
      id
      title
      price(currency: USD)
      image_url
      product_options {
        title
        prefix
        suffix
        options {
          id
          value
        }
      }
    }
}
`;

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    buttonColor?: string;
  }
  interface SimplePaletteColorOptions {
    buttonColor?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}


const theme = createTheme({
  status: {
  danger: '#e53e3e',
  },
  palette: {
  primary: {
    main: '#363b2f',
    buttonColor: '#363b2f',
  },
  neutral: {
    main: '#64748B',
    contrastText: '#fff',
  },
  },
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

interface Options{
  id: number,
  value: string
}
interface ProductOptions{
  title : string,
  prefix : string,
  suffix : string,
  options: Options[]
}
export interface Product {
    id: number,
    title: string,
    image_url: string,
    price: number,
    amount: number,
    product_options: ProductOptions[]
}
const cards = [1, 2, 3]
export const ProductLists: React.FC = () => {
  const { data, loading, error } = useQuery<{ products: Product[] }>(PRODUCTS_QUERY, { errorPolicy: 'all' });
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  
  const getTotalItems = (items: Product[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem: Product) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as Product[])
    );
  };
  
  
 
  return (
    <>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <CartSideMenu
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          cartClose={() => setCartOpen(false) }
        />
      </Drawer>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main
        style={{
          width: '100%',
          backgroundColor: "#c6c7c5"
      }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            display: "flex"
          }}
        >
          <Container maxWidth="lg"> 
            <Typography
              component="h1"
              variant="h2"
              align="left"
              textAlign="left"
              color="text.primary"
              gutterBottom
            >
              All Products
            </Typography>
            <Toolbar sx={{ flexGrow: 1 }}>
                <Typography component="h5">A 360 look at lumin</Typography>
                <Autocomplete
                  id="filter-products"
                  options={cards.sort((a, b) => {return a})}
                  // groupBy={(option) => option.firstLetter}
                  // getOptionLabel={(option) => option.title}
                  sx={{
                    width: 300,
                    display: "flex",
                    [theme.breakpoints.up("sm")]: {
                      marginLeft: theme.spacing(2)
                    },
                    [theme.breakpoints.up("lg")]: {
                      marginLeft: theme.spacing(80)
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Filter by" />}
                 />
            </Toolbar>
          </Container>
          <CssBaseline />
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={10}>
            {loading ? 
              (<Typography alignItems="center" textAlign='center' justifyContent='center' >
                Loading...
              </Typography>) : 
              error ? (
                <Typography alignItems="center" textAlign='center' justifyContent='center'>
                  {error.message}
                </Typography>
              ) : 
                data === undefined ? (
                  <Typography alignItems="center" textAlign='center' justifyContent='center'>
                    No Products Available
                  </Typography>
                ) :
                data.products.map((product) => (
                  <Grid item key={product.id} xs={12} sm={12} md={4} alignItems="center" textAlign='center' justifyContent='center'>
                <Card
                  sx={{
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: theme.spacing(5),
                    border: "none",
                    boxShadow: "none",
                    width: '100%',
                    bgcolor: "transparent",
                    maxWidth: 300
                  }}
                    >
                    <div
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "180px",
                        position: "relative"
                        }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          p: '10%',
                          width: "auto",
                          maxHeight: "200px",
                          position: "absolute"
                        }}
                        image={product.image_url}
                        alt={product.title}
                      />
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "180px"
                      }}
                    >
                    <CardContent
                        sx={{
                        flexGrow: 1,
                          maxHeight: "180px"
                        }}
                      >
                    <Typography gutterBottom sx={{ fontSize: '12px', marginTop: "20px" }}>
                      {product.title}
                    </Typography>
                    <Typography gutterBottom sx={{ fontSize: '14px', marginTop: "5px", marginBottom: "-10px"  }}>
                      From $ {product.price}
                    </Typography>
                  </CardContent>
                    <CardActions
                      sx={{
                        justifyContent: 'center',
                        maxHeight: "180px"
                      }}
                    >
                    <Button
                      size="medium"
                      variant="contained"
                      onClick={() => {
                        setCartOpen(true)
                        handleAddToCart(product);
                      }}
                      color="primary"
                          sx={{ justifyContent: 'center', fontSize: '12px', px: 4 }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                 </div>
                </Card>
              </Grid>
            ))
          }
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
      </ThemeProvider>
    </>
  );
}