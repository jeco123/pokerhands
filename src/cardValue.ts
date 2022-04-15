

export class CardValue {
    static VALUES: {[k: string]: number} = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14
    }
    constructor(private value: string) {}
    isEqual(cardValue: CardValue) {
        return this.value === cardValue.value;
    }
    compare(cardValue: CardValue) {
        const firstValue = CardValue.VALUES[this.value];
        const secondValue = CardValue.VALUES[cardValue.value];
        return firstValue - secondValue;
    }
    isConsecutive(cardValue: CardValue) {
        return this.compare(cardValue) === 1;
    }
    getValue() {
        return this.value;
    }
}