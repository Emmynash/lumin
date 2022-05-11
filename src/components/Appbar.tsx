import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const theme = createTheme()
const menus = ['Shop', 'Learn', 'Account',];

export const Appbar: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        color: "#363738",
        display: "flex",
      }}
    >
      <CssBaseline />
      <Toolbar
        sx={{
          color: "#363738",
          flexDirection: 'row',
        }}
      >
        <Typography
          variant="h4"
          color="inherit"
          sx={{
            cursor: "pointer",
            display: "flex",
            flexGrow: 1,
          }}>
          L U M I N
          <Typography 
            sx={{
              marginLeft: theme.spacing(10),
              display: "none",
              [theme.breakpoints.up("lg")]: {
                display: "flex"
              }
            }}
          >
            <Link
              to="/shop"

              style={{
                textDecoration: "none",
                color: "#363738",
                fontSize: "16px",
                marginLeft: theme.spacing(3),
              }}
            >
              Shop
            </Link>
            <Link
              to="/learn"

              style={{
                textDecoration: "none",
                color: "#363738",
                fontSize: "16px",
                marginLeft: theme.spacing(3),
              }}
            >
              Learn
            </Link>
          </Typography>
        </Typography>
        <Typography
          sx={{
            marginLeft: theme.spacing(5),
            display: "none",
            [theme.breakpoints.up("lg")]: {
              display: 'flex'
            }
          }}
        >
          <Link
            to="/account"
            style={{
              textDecoration: "none",
              color: "#363738",
              fontSize: "16px",
              marginLeft: theme.spacing(3),
            }}
          >
            Account
          </Link>
          <Link
            to="/checkout"
            style={{
              textDecoration: "none",
              color: "#363738",
              fontSize: "16px",
              marginLeft: theme.spacing(3),
            }}
            >
            <ShoppingCartIcon color="inherit" aria-label="Shopping Cart"/>
          </Link>
        </Typography>
        <Box sx={{
          flexGrow: 0,
          marginLeft: theme.spacing(20),
          [theme.breakpoints.up("lg")]: {
            display: "none"
          }
        }}>
          <Tooltip title="Open Menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {menus.map((menu) => (
              <MenuItem key={menu} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{menu}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}