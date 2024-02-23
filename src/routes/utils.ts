export function binaryToDUArray(l: string) {
	let n = '';
	for (let i = 0; i < l.length; i++) {
		if (l[i] === '0') {
			n = n.concat('D');
		} else if (l[i] === '1') {
			n = n.concat('U');
		} else if (l[i] === '_') {
			n = n.concat('_');
		} else {
			console.log('wrong thing passed to binaryToDU fn');
		}
	}
	return n;
}
