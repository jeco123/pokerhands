import { CardSuit } from "./cardSuit";
import { CardValue } from "./cardValue";

interface CardProps {
    value: CardValue;
    suit: CardSuit;
}

export class Card {
    constructor(private cardProps: CardProps) {}
    isEqualValue(card: Card) {
        const cardValue = this.getValue();
        return cardValue.isEqual(card.getValue());
    }
    getValue() {
        return this.cardProps.value;
    }
    getSuit() {
        return this.cardProps.suit;
    }
    compare(card: Card) {
        const cardValue = this.getValue();
        return cardValue.compare(card.getValue());
    }
    isConsecutive(card: Card) {
        const cardValue = this.getValue();
        return cardValue.isConsecutive(card.getValue());
    }
}