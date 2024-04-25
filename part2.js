import * as fs from 'node:fs/promises';

const text = await fs.readFile("./input.txt", { encoding: 'utf8' });
const lines = text.split("\n");

console.time("parse");

let cards = lines.map((x) => {

	const numbers = x.split(":")[1].replaceAll("  ", " ").split("|");
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

	return ({ copies: 1, myNumbers: myNumbers, winningNumbers: winningNumbers, matches: matches });
});


for (let i = 0; i < cards.length; i++) {
	evaluateCard(i);
}

let totalCards = 0;
cards.forEach((x) => totalCards += x.copies);
console.timeEnd("parse");

console.log(`Number of cards: ${totalCards}`);

function evaluateCard(cardNumber) {
	const card = cards[cardNumber];
	for (let i = 0; i < card.matches; i++) {
		cards[cardNumber + i + 1].copies += card.copies;
	}
}