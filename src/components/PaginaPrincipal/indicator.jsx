import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({});

const Indicador = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={`/${props.url}`}>
        <CardMedia
          component="img"
          alt={props.label}
          height="140"
          image={props.image}
          title={props.label}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.total}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.label}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={`/${props.url}`}>
          Acessar
        </Button>
      </CardActions>
    </Card>
  );
};

export default Indicador;
