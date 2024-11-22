import React from "react";
import { Box, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const ContributorsChart = ({
    series,
    formatter,
    color,
    categories,
}: any) => {
    const splineColor = ["#3E7CFF", "#00D395", "#00C7F2", "#FFAB80", "#A38CFF","#FFD347"];
    const splineChartData = {
        series: [13.4, 29, 3.3, 14,26, 14.3],
        options: {
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom',
                    },

                }
            }],
            labels: ['Hashstack Investors', 'Adoption Incentives','Community', 'Product development','Founder(s) & team' , 'Exchange Liquidity'],
            colors: splineColor,
            legend: {
                show: false, // Set this to false to hide the legends
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "70%", // You can adjust the size of the donut
                    labels: {
                        show: true,
                        name: {
                            show: true,
                        },
                        value: {
                            show: true,
                        },
                    },
                },
            },
            stroke: {
                color: "none", // Set the border color to "none" to remove the border
            },
        },

    };

    return (
        <Box borderRadius="6px"  maxWidth="600px">
            <Box
                // ml="8rem"
                display="flex"
                gap="10rem"
                flexDirection={'row'}
            >
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
