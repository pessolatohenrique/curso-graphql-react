import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

export default function CustomSeparator(props) {
  const classes = useStyles();
  const { parentLink, parentLabel, childrenLabel } = props;

  return (
    <div className={classes.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/" variant="body2">
          Início
        </Link>
        {parentLabel && (
          <Link color="inherit" href={parentLink} variant="body2">
            {parentLabel}
          </Link>
        )}
        <Typography color="textPrimary" variant="body2">
          {childrenLabel}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
