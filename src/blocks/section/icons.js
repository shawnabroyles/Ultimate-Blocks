const icon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<path
			d="M0 149.854v212.293h512V149.854H0zm158.179 174.829H37.463V187.317h120.716v137.366zm158.178 0H195.643V187.317h120.715v137.366zm158.18 0H353.821V187.317h120.716v137.366z"
			fill="#F63D3D"
		></path>
	</svg>
);

const SvgWrapper = (props) => (
	<svg
		viewBox="0 0 60 30"
		xmlns="http://www.w3.org/2000/svg"
		fillRule="evenodd"
		clipRule="evenodd"
		strokeLinejoin="round"
		strokeMiterlimit="1.414"
	>
		{props.children}
	</svg>
);

export const oneCol = (
	<SvgWrapper>
		<rect x="0" y="0" width="60" height="30" />
	</SvgWrapper>
);
export const twoCols = (
	<SvgWrapper>
		{[...Array(2).keys()].map((i) => (
			<rect x={i * 31} y="0" width="29" height="30" />
		))}
	</SvgWrapper>
);
export const twoLeftGolden = (
	<SvgWrapper>
		<rect x="41" y="0" width="19" height="30" />
		<rect x="0" y="0" width="39" height="30" />
	</SvgWrapper>
);
export const twoRightGolden = (
	<SvgWrapper>
		<rect x="21" y="0" width="39" height="30" />
		<rect x="0" y="0" width="19" height="30" />
	</SvgWrapper>
);
export const threeCols = (
	<SvgWrapper>
		<rect x="0" y="0" width="18.5" height="30" />
		<rect x="20.5" y="0" width="19" height="30" />
		<rect x="41.5" y="0" width="18.5" height="30" />
	</SvgWrapper>
);
export const leftHalf = (
	<SvgWrapper>
		<rect x="0" y="0" width="29" height="30" />
		<rect x="31" y="0" width="13.500" height="30" />
		<rect x="46.500" y="0" width="13.500" height="30" />
	</SvgWrapper>
);
export const rightHalf = (
	<SvgWrapper>
		<rect x="0" y="0" width="13.5" height="30" />
		<rect x="15.5" y="0" width="13.5" height="30" />
		<rect x="31" y="0" width="29" height="30" />
	</SvgWrapper>
);
export const centerHalf = (
	<SvgWrapper>
		<rect x="0" y="0" width="13.5" height="30" />
		<rect x="15.5" y="0" width="29" height="30" />
		<rect x="46.5" y="0" width="13.5" height="30" />
	</SvgWrapper>
);
export const wideCenter = (
	<SvgWrapper>
		<rect x="0" y="0" width="11" height="30" />
		<rect x="13" y="0" width="34" height="30" />
		<rect x="49" y="0" width="11" height="30" />
	</SvgWrapper>
);
export const exWideCenter = (
	<SvgWrapper>
		<rect x="0" y="0" width="7.2" height="30" />
		<rect x="9.2" y="0" width="41.6" height="30" />
		<rect x="52.8" y="0" width="7.2" height="30" />
	</SvgWrapper>
);
export const fourCols = (
	<SvgWrapper>
		{[...Array(4).keys()].map((i) => (
			<rect x={i * 15.5} y="0" width="13.5" height="30" />
		))}
	</SvgWrapper>
);
export const lFourForty = (
	<SvgWrapper>
		<rect x="0" y="0" width="21.6" height="30" />
		{[...Array(3).keys()].map((i) => (
			<rect x={23.6 + i * 12.8} y="0" width="10.8" height="30" />
		))}
	</SvgWrapper>
);
export const rFourForty = (
	<SvgWrapper>
		{[...Array(3).keys()].map((i) => (
			<rect x={i * 12.8} y="0" width="10.8" height="30" />
		))}
		<rect x="38.4" y="0" width="21.6" height="30" />
	</SvgWrapper>
);
export const fiveCols = (
	<SvgWrapper>
		{[...Array(5).keys()].map((i) => (
			<rect x={i * 12.4} y="0" width="10.4" height="30" />
		))}
	</SvgWrapper>
);
export const sixCols = (
	<SvgWrapper>
		{[...Array(6).keys()].map((i) => (
			<rect x={i * 10.33} y="0" width="8.35" height="30" />
		))}
	</SvgWrapper>
);

export const resizeIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="30"
		height="30"
		viewBox="0 0 64 64"
	>
		<path d="M49.414 24.586a2 2 0 10-2.828 2.828L49.172 30H38V18a2 2 0 00-4 0v28a2 2 0 004 0V34h11.172l-2.586 2.586a2 2 0 102.828 2.828l6-6a2 2 0 000-2.828zM28 16a2 2 0 00-2 2v12H14.828l2.586-2.586a2 2 0 10-2.828-2.828l-6 6a2 2 0 000 2.828l6 6c.39.391.902.586 1.414.586s1.024-.195 1.414-.586a2 2 0 000-2.828L14.828 34H26v12a2 2 0 004 0V18a2 2 0 00-2-2z"></path>
	</svg>
);

export const twoRows = (
	<SvgWrapper>
		{[...Array(2).keys()].map((i) => (
			<rect x="0" y={i * 15} width="60" height="13" />
		))}
	</SvgWrapper>
);
export const threeRows = (
	<SvgWrapper>
		{[...Array(3).keys()].map((i) => (
			<rect x="0" y={i * 10} width="60" height="8" />
		))}
	</SvgWrapper>
);
export const wideFirstRow = (
	<SvgWrapper>
		<rect x="0" y="0" width="60" height="13" />
		<rect x="0" y="15" width="29" height="13" />
		<rect x="31" y="15" width="29" height="13" />
	</SvgWrapper>
);
export const wideLastRow = (
	<SvgWrapper>
		<rect x="0" y="0" width="29" height="13" />
		<rect x="31" y="0" width="29" height="13" />
		<rect x="0" y="15" width="60" height="13" />
	</SvgWrapper>
);
export const fourRows = (
	<SvgWrapper>
		{[...Array(4).keys()].map((i) => (
			<rect x="0" y={i * 7.5} width="60" height="5.5" />
		))}
	</SvgWrapper>
);
export const quadrants = (
	<SvgWrapper>
		<rect x="0" y="0" width="29" height="13" />
		<rect x="31" y="0" width="29" height="13" />
		<rect x="0" y="15" width="29" height="13" />
		<rect x="31" y="15" width="29" height="13" />
	</SvgWrapper>
);
export const fiveRows = (
	<SvgWrapper>
		{[...Array(5).keys()].map((i) => (
			<rect x="0" y={i * 6} width="60" height="4" />
		))}
	</SvgWrapper>
);
export const sixRows = (
	<SvgWrapper>
		{[...Array(6).keys()].map((i) => (
			<rect x="0" y={i * 5} width="60" height="3" />
		))}
	</SvgWrapper>
);
export default icon;
