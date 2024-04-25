import * as fs from 'node:fs/promises';

let text = await fs.readFile("./input.txt", { encoding: 'utf8' });
let lines = text.split("\n");

let totalScore = 0;
console.time("parse");
for (let i = 0; i < lines.length; i++) {
	const cardScore = evaluateCard(i);
	totalScore += cardScore;
}
console.timeEnd("parse");
console.log(`Total score: ${totalScore}`);

function evaluateCard(lineNumber) {
	const card = lines[lineNumber];

	const numbers = card.split(":")[1].replaceAll("  ", " ").split("|");
	const myNumbers = numbers[0].slice(1, numbers[0].length - 1).split(" ");
	const winningNumbers = numbers[1].slice(1, numbers[1].length - 1).split(" ");

	let matches = 0;
	for (let i = 0; i < myNumbers.length; i++) {
		for (let j = 0; j < winningNumbers.length; j++) {
			if (myNumbers[i] === winningNumbers[j]) {
				matches++;
			}
		}
	}

	return matches > 0 ? Math.pow(2, matches - 1) : 0;
}