import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";

const BarChart = (props) => {
  const { title, description, data } = props;

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis max={100} />

          <BarSeries valueField="data" argumentField="label" />
          <Animation />
        </Chart>
      </CardContent>
    </Card>
  );
};

export default BarChart;
