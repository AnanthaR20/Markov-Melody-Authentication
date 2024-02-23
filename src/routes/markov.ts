// returns an n x n markov matrix given the sequence.
// n is the number of distinct digits in 'sequence'
function getMarkovMatrix(sequence: string, asProbs: boolean = true) {
	const dimsize = [...new Set(sequence)].length;
	const MM = Array.from({ length: dimsize }, () => Array(dimsize).fill(0));

	for (let i = 0; i < sequence.length - 1; i++) {
		const index1 = parseInt(sequence[i]);
		const index2 = parseInt(sequence[i + 1]);
		MM[index1][index2]++;
	}

	if (asProbs) {
		for (let i = 0; i < MM.length; i++) {
			const rowSum = MM[i].reduce((acc, val) => acc + val, 0);
			MM[i] = MM[i].map((value) => (rowSum === 0 ? Array(2).fill(0) : value / rowSum));
		}
	}

	return MM;
}

// returns probability of a given sequence, given a Markov Matrix
function getSeqProb(MM: Array<Array<number>>, sequence: string) {
	// const numStates = [...new Set(sequence)].length;
	let runProd = 1;

	for (let i = 0; i < sequence.length - 1; i++) {
		const index1 = parseInt(sequence[i]);
		const index2 = parseInt(sequence[i + 1]);
		runProd *= MM[index1][index2];
	}

	return runProd;
}

export function markov_authenticate(right_sequence: string, input_sequence: string) {
	const MM = getMarkovMatrix(right_sequence, true);
	console.log('\n\n\nYou entered:  ' + input_sequence);

	const p_input_seq = getSeqProb(MM, input_sequence);
	const p_right_seq = getSeqProb(MM, right_sequence);
	console.log('ratio of probabilities p_input/p_correct = ');
	console.log(p_input_seq / p_right_seq);

	console.log('\nRight Pass: ' + right_sequence);
	console.log('Your Input: ' + input_sequence);
	console.log('Matrix: ' + MM);

	const auth_criteria_1 = p_input_seq / p_right_seq > 0.05;
	const auth_criteria_2 = p_input_seq / p_right_seq < 1.95;
	const auth_criteria = auth_criteria_1 && auth_criteria_2;

	if (auth_criteria) {
		console.log('PASSWORD ACCEPTED');
		return true;
	} else {
		console.log('PASSWORD REJECTED!');
		return false;
	}
}
