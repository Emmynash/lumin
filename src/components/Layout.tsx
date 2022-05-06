import React from 'react';
import { CssBaseline, createStyles, makeStyles } from "@material-ui/core";
import { SideMenu } from "components";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      height: '100vh',
      overflowX: 'hidden'
    }
  })
)

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children}) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <SideMenu />
        {children}
      </div>

    </>
  )
}