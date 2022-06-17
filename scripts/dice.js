//TODO: Dice roll parser: Converts strings to dice rolls.

//Comparison functions for sorting array elements:

//FIXME: Use these for sorting.
function FnCompareAsc(a, b) {a - b};
function FnCompareDesc(a, b) {b - a};

//Dice rolls:

function FiGenDieRoll(IiSides) {
/*
Generates a random number between **1** and **`IiSides`** inclusive.
	**`IiSides`**:	*Should be integer!* The upper bound for random number generation.
*/
	return Math.floor(Math.random() * (IiSides) + 1);
}

function FaGenDiceRolls(IiNumber,IiSides) {
/*
Generates an array of random numbers between **1** and **`IiSides`** inclusive.
	**`IiNumber`**:	*Should be integer!* The size of the array.
	**`IiSides`**:	*Should be integer!* The upper bound for random number generation.
*/
	let LaDiceRolls = [];
	for (let i = 0; i < IiNumber; i++) {
		LaDiceRolls.push(FiGenDieRoll(IiSides));
	}
	return LaDiceRolls;
}

function FaDis_Advantage(IaDiceRolls, IbKeep, IiAmount, IbBig) {
/*
Applies (dis)advantage on an array of dice rolls:
	**`IaDiceRolls`**:	The array contianing dice rolls. - Don't have to be ordered, but should contain integers.
	**`IbKeep`**:	Boolean.
		If true, the number of dice rolls provided by IiAmount will be kept;
		Otherwise this amount will be dropped from the array.
	**`IiAmount`**:	The number of dice rolls that will be kept or dropped based on IbKeep.
	**`IbBig`**:	Boolean.
		If true, the function targets the bigger element in the sorted array;
		Otherwse it targets the smaller element in the sorted array.
**Examples**:
	-	For advantage IaDiceRolls should contain the result of 2 d20 rolls, IiAmount should be 1 and both IbKeep and `IbBig` should be the same (either true or false).
	-	For disadvantage IaDiceRolls should contain the result of 2 d20 dice, IiAmount should be 1 and IbKeep and `IbBig` should be different (either true and false or false and true).
	-	For character skill generation IaDiceRolls should contain the result of 4 d6 rolls and either IiAmount should be 3, IbKeep and `IbBig` should be true or IiAmount should be 1 and both IbKeep and `IbBig` should be false.
	-	For character skill generation IaDiceRolls should contain the result of 4 d6 rolls and either IiAmount should be 3, IbKeep and `IbBig` should be true or IiAmount should be 1 and both IbKeep and `IbBig` should be false.
*/
	IaDiceRolls.sort(	//	Sort the array in ascending order:
		(a, b) => (a - b)
	);

	if (IbKeep) {	//	Remove elements while the array is bigger than `IiAmount`:
		while (IaDiceRolls.length > IiAmount) {
			if (IbBig) {	//	From the start, since those are smaller (and we want to *keep* the larger):
				IaDiceRolls.shift();
			} else {	//	From the end, since those are larger:
				IaDiceRolls.pop();
			}
		}
	} else {	//	Remove `IiAmount` number of elements:
		for (let i = 0; i < IiAmount; i++) {
			if (IbBig) {	//	From the end, since those are larger (which we want to remove):
				IaDiceRolls.pop();
			} else {	//	From the start, since those are smaller:
				IaDiceRolls.shift();
			}
		}
	}

	return IaDiceRolls;

}

function FfSum(IaArrayToSum) {
/*
Sums the elements of an array. The array shoud contain numbers.
	**`IaArrayToSum`**:	The array, which's elements are summed.
*/
	return IaArrayToSum.reduce(
		(IfPrevVal, IfCurrentVal) => (IfPrevVal + IfCurrentVal)
	);
}

function FaGenSkills() {
/*
Generates an array of raw values, which can be assigned to the 6 skills.
	Based on: 4d6, sum top 3
*/
	const CiDieSides = 6;	//	Roll d6s.
	const CiDieNr = 4;	//	Roll 4×.
	const CiDiceToDrop = 1;	//	Drop 1 (lowest)
	const CiNrOfSkills = 6;	//	Generate 6 skill values.

	let LaSkills = [];

	for (let i = 0; i < CiNrOfSkills; i++) {

		LaSkills.push(	//	Add dicerolls to the array.
			FfSum(
				FaDis_Advantage(
					FaGenDiceRolls(CiDieNr, CiDieSides),
					false,	//	Drop.
					CiDiceToDrop,
					false	//	Lowest.
				)
			)
		);
	}

	LaSkills.sort(	//	Sort it, why not:
		(a, b) => (b - a)	//	In descending order.
	)

	return LaSkills;
}

function FiGetModifier(IfStat) {
/*
Calculate ability modifier from given skill.
	**`IfStat`**:	The skill, from which the modifier is calculated.
*/
	return Math.floor(IfStat / 2 -5);	//	Skill / 2 - 5; rounded down.
}

function FaGetModifiers(IaStats) {
/*
Calculate ability modifier from given array of skills.
	**`IaStats`**:	The array of skills, from which the modifier is calculated.
*/
	let LaModifiers = [];

	for (i of IaStats) {
		LaModifiers.push(
			FiGetModifier(i)
		);
	}

	return LaModifiers;
}