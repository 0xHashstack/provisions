import React from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const ContributorsChart = () => {
	const isSmallerThan500 = useMediaQuery('(max-width: 500px)');
	const splineColor = [
		'#3E7CFF',
		'#00D395',
		'#00C7F2',
		'#FFAB80',
		'#A38CFF',
		'#FFD347',
	];
	const splineChartData: any = {
		series: [18, 24.4, 3.3, 14, 26, 14.3],
		options: {
			chart: {
				type: 'donut',
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 350,
						},
						legend: {
							position: 'bottom',
						},
					},
				},
			],
			labels: [
				'Hashstack Investors',
				'Adoption Incentives',
				'Community',
				'Product Development',
				'Founder(s) & Team',
				'Exchange Liquidity',
			],
			colors: splineColor,
			legend: {
				show: false, // Hide the legends
			},
			dataLabels: {
				enabled: true,
				formatter: function (val: number) {
					return `${val.toFixed(1)}%`; // Format the text as percentages
				},
			},
			plotOptions: {
				pie: {
					donut: {
						size: '70%', // Adjust the size of the donut
						labels: {
							show: true,
							name: {
								show: true,
								fontSize: '16px',
								fontWeight: 'bold',
								color: '#676D9A', // Set the "Total" label text color to white
							},
							value: {
								show: true,
								fontSize: isSmallerThan500 ? '16px' : '24px', // Slightly larger for better visibility
								fontWeight: 'bold',
								color: '#FFFFFF', // Change the center percentage color to white
							},
							total: {
								show: true,
								label: 'Total Supply',
								fontSize: isSmallerThan500 ? '16px' : '24px',
								fontWeight: 'bold',
								color: '#676D9A', // Change the "Total" label color
								formatter: function () {
									return '100'; // Display total percentage in the center
								},
							},
						},
					},
				},
			},
			stroke: {
				show: true,
				width: 1,
				colors: ['#FFFFFF'], // Set the border (stroke) color to white
			},
		},
	};

	return (
		<div className='rounded-lg max-w-xl'>
			<div className='flex justify-center items-center w-full'>
				<ApexCharts
					options={splineChartData.options}
					series={splineChartData.series}
					type='donut'
					height={isSmallerThan500 ? '300' : 450}
					width={500}
				/>
			</div>
		</div>
	);
};

export default ContributorsChart;
