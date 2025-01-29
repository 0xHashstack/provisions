import React from 'react';

const HstkLogo = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={151}
			height={150}
			fill='none'>
			<path
				fill='url(#hstk-logo-svg)'
				d='M75.5 150c41.421 0 75-33.579 75-75s-33.579-75-75-75S.5 33.579.5 75s33.579 75 75 75Z'
			/>
			<path
				fill='#fff'
				d='M40.306 24.872h12.087v37.035h46.186V24.872h12.086v48.345H40.283l.023-48.345ZM40.309 76.068h70.382v48.345h-12.11v-37.02H52.395v37.02H40.309V76.068Z'
			/>
			<defs>
				<linearGradient
					id='hstk-logo-svg'
					x1='0.507684'
					y1='75'
					x2='150.5'
					y2='75'
					gradientUnits='userSpaceOnUse'>
					<stop stopColor='#7C57F2'></stop>
					<stop
						offset='0.2'
						stopColor='#624BE2'></stop>
					<stop
						offset='0.55'
						stopColor='#3B39C9'></stop>
					<stop
						offset='0.83'
						stopColor='#232DBA'></stop>
					<stop
						offset='1'
						stopColor='#1A29B4'></stop>
				</linearGradient>
			</defs>
		</svg>
	);
};

export default HstkLogo;
