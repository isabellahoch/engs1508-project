import { AreaChart } from '@mantine/charts';
import { XAxis, YAxis, Tooltip } from "@mantine/core";
import DetailsData from '../types/Company';
import React from "react";


const QuoteViz = ({stockData}: any) => {

    const dataPoints = [stockData['pc'], stockData['o'], stockData['l'], stockData['h'], stockData['c']]

    const data = [stockData['pc'], stockData['o'], stockData['l'], stockData['h'], stockData['c']].map((price) => ({price, name:'trend'}))

    console.log(data);
  
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

    // <AreaChart
    //   data={stockData}
    //   height={400}
    //   pointRadius={5}
    //   pointHoverRadius={7}
    //   lineColor="skyblue"
    //   yAxis
    //   xAxis={{
    //     labels: (date: any) => date.toLocaleDateString(),
    //     format: "dd MMM",
    //   }}
    //   tooltip={{
    //     label: (dataPoint: any) => `Price: ${dataPoint.close}`,
    //   }}
    // >
    //   {/* <Line
    //     data={stockData}
    //     points={(dataPoint: any) => ({ ...dataPoint, label: dataPoint.close.toFixed(2) })}
    //   /> */}
    //   <YAxis label="Price" />
    //   <XAxis label="Date" />
    // </AreaChart>
  );
};

export default QuoteViz;
