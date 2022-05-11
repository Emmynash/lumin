import React, {useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Product, CartItem } from 'components'
import { useQuery, gql } from "@apollo/client";
import isocode from "iso-country-currency"

const CURRENCY_QUERY = gql`
  {
    currency
}
`;

interface Props {
  cartItems: Product[],
  addToCart: (clickedItem: Product) => void,
  removeFromCart: (id: number) => void,
  cartClose: () => void
};

interface Currency {
  currency: string[] 
}


export const CartSideMenu: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, cartClose }) => {
  const { data, loading, error } = useQuery<{currency: Currency[]}>(CURRENCY_QUERY, { errorPolicy: 'all' });
  const [currency, setCurrency] = React.useState('USD');
  const [symbol, setSymbol] = React.useState('');


  const handleChangeCurrency = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  useEffect(() => {
    const getAllIsoCodes = isocode.getAllISOCodes();
    getAllIsoCodes.map((code) => {
      if (code.currency === currency) {
        return setSymbol(code.symbol);
      }
    })
  }, [currency]);


  const calculateTotal = (items: Product[]) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

  return (
    <>
      <Paper>
        <>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="changeCurrency">Currency</InputLabel>
            <Select
              labelId="Change currency"
              id="changeCurrency"
              value={currency}
              onChange={handleChangeCurrency}
              label="Currency"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                !loading &&
                !error && 
                data?.currency.map(currency => (
                  // @ts-ignore
                  <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Divider />

          <Typography component="h2" variant='h5'>Your Cart</Typography>
          {cartItems.length === 0 ? cartClose : null}
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                symbol={symbol}
              />
            ))}
          <Typography component="h2" variant='h4'>Total: {symbol} {calculateTotal(cartItems).toFixed(2)}</Typography>
            </>
      </Paper>
    </>
  )
}