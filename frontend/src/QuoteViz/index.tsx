import { AreaChart } from '@mantine/charts';
import { XAxis, YAxis, Tooltip } from "@mantine/core";
import DetailsData from '../types/Company';
import React from "react";


const QuoteViz = ({stockData}: any) => {

    const dataPoints = [stockData['pc'], stockData['o'], stockData['l'], stockData['h'], stockData['c']]

    const data = [stockData['pc'], stockData['o'], stockData['l'], stockData['h'], stockData['c']].map((price) => ({price, name:'trend'}))
  
    return (

    <AreaChart
      h={300}
      w={300}
      data={data}
      dataKey={'index'}
      series={[
        { name: 'price', color: 'indigo.6' },
      ]}
      connectNulls
      curveType="linear"
    />
  );
};

export default QuoteViz;
