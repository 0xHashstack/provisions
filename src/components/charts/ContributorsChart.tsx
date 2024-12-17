import React from "react";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const ContributorsChart = () => {
  const splineColor = [
    "#3E7CFF",
    "#00D395",
    "#00C7F2",
    "#FFAB80",
    "#A38CFF",
    "#FFD347",
  ];
  const splineChartData: any = {
    series: [13.4, 29, 3.3, 14, 26, 14.3],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      labels: [
        "Hashstack Investors",
        "Adoption Incentives",
        "Community",
        "Product Development",
        "Founder(s) & Team",
        "Exchange Liquidity",
      ],
      colors: splineColor,
      legend: {
        show: false, // Hide the legends
      },
      dataLabels: {
        enabled: true,
        style: {
        //   colors: ["#000000"], // Set numbers on the chart to black
        },
        formatter: function (val: number) {
          return `${val.toFixed(1)}%`; // Format the text as percentages
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%", // Adjust the size of the donut
            labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#676D9A", // Set the "Total" label text color to white
                },
                value: {
                  show: true,
                  fontSize: "24px", // Slightly larger for better visibility
                  fontWeight: "bold",
                  color: "#FFFFFF", // Change the center percentage color to white
                },
                total: {
                  show: true,
                  label: "Total Supply",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#676D9A", // Change the "Total" label color
                  formatter: function () {
                    return "100"; // Display total percentage in the center
                  },
                },
              },
            // labels: {
            //   show: true,
            //   total: {
            //     show: true,
            //     label: "Total",
            //     color: "#FFFFFF", // Change the total text color in the center to white
            //     fontSize: "24px",
            //     formatter: function () {
            //       return "100%"; // Display total percentage
            //     },
            //   },
            // },
          },
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#FFFFFF"], // Set the border (stroke) color to white
      },
    },
  };

  return (
    <Box borderRadius="6px" maxWidth="600px">
      <Box display="flex" gap="10rem" flexDirection={"row"}>
        <ApexCharts
          options={splineChartData.options}
          series={splineChartData.series}
          type="donut"
          height={450}
          width={500}
        />
      </Box>
    </Box>
  );
};

export default ContributorsChart;
