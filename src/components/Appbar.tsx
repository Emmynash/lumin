import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  createStyles
} from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      color: "#363738"
    },
    RightNavLinks: {
      marginLeft: theme.spacing(5),
      display: "flex",
    },
    LeftLinks: {
      marginLeft: theme.spacing(10),
    },
    LeftNavLinks: {
      flexGrow: 1,
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "#363738",
      fontSize: "16px",
      marginLeft: theme.spacing(3),
      "&:hover": {
        borderBottom: "2px solid #363b2f",
      },
    },
  })
)

export const Appbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="default">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" color="inherit" className={classes.LeftNavLinks}>
          L U M I N
          <span className={classes.LeftLinks}>
            <Link to="/shop" className={classes.link}>
              Shop
            </Link>
            <Link to="/learn" className={classes.link}>
              Learn
            </Link>
          </span>
        </Typography>
        <div className={classes.RightNavLinks}>
          <Link to="/account" className={classes.link}>
            Account
          </Link>
          <Link to="/checkout" className={classes.link}>
            <ShoppingCartIcon color="inherit" aria-label="Shopping Cart"/>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}