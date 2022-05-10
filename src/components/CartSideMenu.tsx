import React from 'react';
import { createStyles, makeStyles, Paper, Divider } from "@material-ui/core";
import { useSideBarContext } from "hooks";
import { SideMenuHeader, CartItem } from "components";
import { useSwipeable } from "react-swipeable";
import { Product } from 'components'

interface Props {
  cartItems: Product,
  addToCart: (clickedItem: Product) => void,
  removeFromCart: (id: number) => void,
};
const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      flex: '0 0 auto',
      overflowY: 'auto',
      zIndex: 1000,
      height: '100%',
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        transition: 'left 0.5s',
        maxWidth: (expanded) => expanded ? '350px' : 'auto',
        height: '100%',
        right: expanded => expanded ? '0px' : '-350px'
      }
    },
    swipe: {
      position: 'absolute',
      height: '100%',
      width: 0,
      zIndex: 0
    }
  })
)

export const CartSideMenu: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const { expanded, setExpanded } = useSideBarContext();
  const classes = useStyles();

  const calculateTotal = (items: Product[]) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

  const swipeHandler = useSwipeable({
    onSwipedRight: () => setExpanded(true)
  })

  const menuHandler = useSwipeable({
    onSwipedRight: () => setExpanded(true),
    onSwipedLeft: () => setExpanded(false)
  })

  return (
    <>
      {!expanded && (<div className={classes.swipe} {...swipeHandler} />)}
      <Paper className={classes.container} {...menuHandler}>
        <SideMenuHeader
          onClose={() => setExpanded(false)}
          onOpen={() => setExpanded(true)}
          expanded={expanded}
        />
        {expanded &&
          (
            <>
            <Divider />

            <h2>Your Cart</h2>
            {cartItems.length === 0 ? setExpanded(false) : null}
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
            </>
          )
        }
      </Paper>
    </>
  )
}