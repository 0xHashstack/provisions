import React, { useEffect, useState } from "react";
import { Box, Button, Skeleton } from "@chakra-ui/react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import numberFormatter from "@/functions/numberFormatter";
import emissionData from '../../../hash-token-distribution.json'

const EmissionRateChart = () => {
  const [liquidityProviderChartPeriod, setLiquidityProviderChartPeriod] =
    useState(0);
  const [chartData, setChartData] = useState([
    {
      name: "Supply",
      data: [30000, 40000, 35000, 50000, 49000, 60000, 80000],
    },
  ]);

  const [xAxisCategories, setXAxisCategories] = useState([1, 2, 3, 4, 5,6,7,8,9,0]);
  useEffect(() => {
    // Fetch data based on selected option
    const fetchData = async () => {
      // Simulating API call or data update
      const { newData, newCategories } = await fetchDataBasedOnOption(
        liquidityProviderChartPeriod
      );
      setChartData(newData);
      setXAxisCategories(newCategories);
    };

    fetchData();
  }, [liquidityProviderChartPeriod]);
  
const splineColor = [
  "#323FF4", 
  "#14A262", 
  "#917AE6", 
  "#FEEE91", 
  "#FBAF86", 
  "#A5D7E8",
  "#7E8EF1", // Vibrant orange-red
  "#4E4EDA", // Bright green
  "#9EDF9C", // Bold purple
];
  ////console.log(daiData?.supplyAmounts, "data protocol");
  //  //console.log(new Date("2022-01-01").getTime(),"trial chart data")
  const minValue = Math.min(...chartData.flatMap((series) => series.data));
  const fetchDataBasedOnOption = async (option: number) => {
    // Simulating API call or data update based on option
    // Replace this with your actual implementation
    let newData: any = [];
    let newCategories: any = [];

    const startDate = new Date("2024-12-18").getTime();
    const months = Array.from({ length: 61 }, (_, i) => {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + i);
      return date.getTime();
    });
    
    switch (liquidityProviderChartPeriod) {
        case 0:
          newData = emissionData.tokenDistribution
          newCategories = months;
          break;
      
        default:
          newData = [];
          newCategories = [];
          break;
      }
      
    

    return { newData, newCategories };
  };

  const splineChartData = {
    series: chartData,
    // Set fillOpacity to 1 for each series data
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        stacked: true,
      },
      dataLabels: {
        position: "bottom",
        enabled: false,
        style: {
          colors: ["black"],
        },
        formatter: function (val: any) {
          return "$" + numberFormatter(val); // Display the data value as the label
        },
      },

      xaxis: {
        type: "datetime" as const,
        // Set x-axis type to datetime
        labels: {
          style: {
            colors: "#6E7681",
            fontSize: "12px",
            fontWeight: "400",
          },
          formatter: function (value: string | number | Date) {
            const date = new Date(value); // Convert the timestamp to a Date object
            const month = date.toLocaleString("en-US", { month: "short" }); // Short month name (e.g., Jan)
            const year = date.getFullYear(); // Year (e.g., 2024)
            return `${month} ${year}`; // Combine month and year
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          color: "grey",
        },
        formatter: function (value:any) {
            const date = new Date(value); // Convert the timestamp to a Date object
            return date.toLocaleDateString("en-US", { month: "short", year: "numeric" }); // Format as "Jan 2024"
          },
        categories: xAxisCategories,
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return "$" + numberFormatter(value);
          },
          style: {
            colors: "#6E7681",
            fontSize: "12px",
            fontWeight: "400",
          },
        },
        min: minValue - 0.05 * minValue,
      },
      legend: {
        fontSize: "12px",
        fontWeight: "400",
        labels: {
          colors: "#fff",
          // Set the color of the legend texts to white
        },
      },
      // legend:{
      //   color:"#fff"
      // },
      // stroke: {
      //   curve: "smooth",
      //   color: splineColor,
      //   opacity: 1,
      // },
      plotOptions: {
        bar: {
          opacity: 1,
          columnWidth: "70%",
          colors: {
            backgroundBarOpacity: 1,
          },
        },
      },
      fill: {
        type: "solid",
      },
      // color: ["#804D0F", "#3B48A8","#136B5","#1A2683","#996B22"],
      color: splineColor,

      grid: {
        borderColor: "#2B2F35",
        padding: {
          bottom: 10,
        },
      },
      annotations: {
        xaxis: [
          {
            x: xAxisCategories[0],
            strokeDashArray: 0,
            borderColor: "#292D30",
            borderWidth: 1,
          },
          {
            x: xAxisCategories[xAxisCategories.length - 1], // End position for the box
            strokeDashArray: 0,
            borderColor: "#292D30",
            borderWidth: 1,
          },
        ],
      },
    },
  };

  const options: ApexOptions = {
    ...splineChartData.options,
    // stroke: {
    //   ...splineChartData.options.stroke,
    //   curve: "smooth",
    // },
    colors: splineColor,
    tooltip: {
        enabled: true,
        theme: "dark", 
        shared: true, 
        intersect: false,
        x: {
          format: 'dd MMM yyyy', // Format to show the full date with year
          formatter: function (value) {
            const date = new Date(value); // Convert timestamp to Date
            return date.toDateString(); // Display the full date string
          },
        },
        y: {
          formatter: function (value) {
            return `$${numberFormatter(value)}`; // Format y-axis value as currency
          },
        },
      },
    // colors: ["#804D0F", "#3B48A8","#136B5","#1A2683","#996B22"],
  };

  return (
    <Box display="flex" flexDirection="column" gap="8px" width="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        height="72px"
        border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
        color="#E6EDF3"
        // padding="24px 24px 16px"
        px="24px"
        fontSize="20px"
        fontStyle="normal"
        fontWeight="600"
        lineHeight="30px"
        borderRadius="6px"
      >
        <Box
          w="100%"
          display="flex"
          gap="2"
          justifyContent="space-between"
          my="auto"
        >
          <Box mt="auto" display="flex">Token Emissions
          </Box>
        </Box>
      </Box>
      <Box
        border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
        borderRadius="6px"
        padding="16px 24px 40px"
      >
        <ApexCharts
          options={options}
          series={splineChartData.series}
          type="area"
          height={350}
        />
      </Box>
    </Box>
  );
};

export default EmissionRateChart;
