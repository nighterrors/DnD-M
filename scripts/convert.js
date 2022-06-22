//	LENGTH

function FaParseFootInch(IsLenInFootInch) {
/*
Splits a string of (feet)'(inches)" into an array of [ (feet), (inches) ]
	**Example**:	3'11" => [3,11]
	**`IsLenInFootInch`**:	String representing the length in feet'inches".
*/
	const CsPattern = /\d+/g;

	let LaFootInch = IsLenInFootInch.match(CsPattern);

	//TODO: Convert to number

	return LaFootInch;

	//TODO: Error handling
}

/*----------------------------------------------------------------------------*/

//	VOLUME



/*----------------------------------------------------------------------------*/

//	WEIGHT



/*----------------------------------------------------------------------------*/
