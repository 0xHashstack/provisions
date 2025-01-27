import { useKeenSlider } from 'keen-slider/react';
import React from 'react';
import { ANIMATION_DURATION, METRICS } from './constants';
import numberFormatter from '@/functions/numberFormatter';
import 'keen-slider/keen-slider.min.css';

interface MetricsSliderProps {
	protocolReserves: Record<string, number> | undefined;
	perviewCount: number;
}

const MetricItem: React.FC<{
	label: string;
	value: number | undefined;
	prefix?: string;
	suffix?: string;
}> = ({ label, value, prefix, suffix }) => (
	<div className='keen-slider__slide whitespace-nowrap text-sm flex items-center hover:underline'>
		{label}:
		{value ?
			<span className='text-[#B0F1DE] ml-3 hover:underline'>
				{prefix}
				{numberFormatter(value)}
				{suffix}
			</span>
		:	<div className='w-12 h-4 relative overflow-hidden ml-3'>
				<div className='absolute inset-0 bg-gradient-to-r from-[#323437] to-[#5e6978]  bg-[length:400%_100%] animate-pulse' />
			</div>
		}
	</div>
);

export const MetricsSlider: React.FC<MetricsSliderProps> = ({
	protocolReserves,
	perviewCount,
}) => {
	const [ref, slider] = useKeenSlider<HTMLDivElement>({
		loop: true,
		mode: 'free',
		slides: {
			perView: perviewCount,
			spacing: 11,
		},
		renderMode: 'performance',
		drag: false,
		created(s) {
			s.moveToIdx(5, true, {
				duration: ANIMATION_DURATION,
				easing: (t) => t,
			});
		},
		updated(s) {
			s.moveToIdx(s.track.details.abs + 5, true, {
				duration: ANIMATION_DURATION,
				easing: (t) => t,
			});
		},
		animationEnded(s) {
			s.moveToIdx(s.track.details.abs + 5, true, {
				duration: ANIMATION_DURATION,
				easing: (t) => t,
			});
		},
	});

	return (
		<div
			ref={ref}
			className='keen-slider h-full flex items-center cursor-pointer flex-1 pl-4 pr-16'
			onMouseOver={() => slider.current?.animator.stop()}
			onMouseLeave={() => {
				slider.current?.animator.start([
					{
						distance: 0,
						duration: 5,
						easing: (t) => t,
					},
				]);
			}}>
			{[...METRICS, ...METRICS].map((metric, index) => (
				<MetricItem
					key={`${metric.id}-${index}`}
					label={metric.label}
					value={protocolReserves?.[metric.key]}
					prefix={metric.prefix}
					suffix={metric.suffix}
				/>
			))}
		</div>
	);
};
