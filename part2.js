const shuffle = document.querySelector("#shuffle");
const draw = document.querySelector("#draw");
const table = document.querySelector("div");

const baseURL = "https://deckofcardsapi.com/api/deck/";
const shuffleURL = baseURL + "new/shuffle/?deck_count=1";
let deckID = null;
let cardsArray;
let cards;

draw.style.marginBottom = "4rem";
shuffle.style.marginBottom = "4rem";

const degrees = () => {
	return Math.floor(Math.random() * 360 + 1);
};

const rotate = () => {
	return `rotate(${degrees()}deg)`;
};

draw.style.display = "none";

shuffle.addEventListener("click", async () => {
	try {
		const newDeck = await axios.get(shuffleURL);
		deckID = newDeck.data.deck_id;
		const drawURL = baseURL + deckID + "/draw/?count=52";

		const deck = await axios.get(drawURL);
		cardsArray = deck.data.cards;
		cards = cardsArray[Symbol.iterator]();

		draw.style.display = "block";
		shuffle.style.display = "none";
	} catch (err) {
		console.log(err);
	}
});

draw.addEventListener("click", () => {
	card = cards.next().value;

	if (!card) {
		shuffle.style.display = "block";
		draw.style.display = "none";
		table.innerHTML = "";
		return;
	}

	const suit = card.suit;
	const value = card.value;
	const title = `${value} OF ${suit}`;

	const cardElement = document.createElement("img");
	cardElement.src = card.image;
	cardElement.alt = title;
	cardElement.style.position = "absolute";
	cardElement.style.transform = rotate();

	table.appendChild(cardElement);
});
