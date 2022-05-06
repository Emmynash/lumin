import React from "react";
import { MainPanel, CreateNoteFAB, } from "components";
import { createStyles, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => createStyles({
  content: {
    display: 'flex',
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    "& h4": {
      textAlign: "center"
    }
  }
}))

export const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <MainPanel>
      <div className={classes.content}>
        <Typography variant="h4" color="textSecondary">
          Select a note to get started
        </Typography>
      </div>
      <CreateNoteFAB />
    </MainPanel>
  )
}