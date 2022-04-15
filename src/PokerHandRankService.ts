import { Card } from "./card";
import { CardValue } from "./cardValue";
import { PokerHandRank } from "./pokerHandRank";

export class PokerHandRankService {
  static getPokerHandRank(cards: Card[]) {
    if (PokerHandRankService.pokerHandIsRoyalFlush(cards)) {
      return PokerHandRank.RoyalFlush;
    }
    if (PokerHandRankService.pokerHandIsStraightFlush(cards)) {
      return PokerHandRank.StraightFlush;
    }
    if (PokerHandRankService.pokerHandIsFourOfAKind(cards)) {
      return PokerHandRank.FourOfAKind;
    }
    if (PokerHandRankService.pokerHandIsFullHouse(cards)) {
      return PokerHandRank.FullHouse;
    }
    if (PokerHandRankService.pokerHandIsThreeOfKind(cards)) {
      return PokerHandRank.ThreeOfAKind;
    }
    if (PokerHandRankService.pokerHandIsTwoPair(cards)) {
      return PokerHandRank.TwoPair;
    }
    if (PokerHandRankService.pokerHandIsOnePair(cards)) {
      return PokerHandRank.Pair;
    }
    if (PokerHandRankService.pokerHandIsStraight(cards)) {
      return PokerHandRank.Straight;
    }
    if (PokerHandRankService.pokerHandIsFlush(cards)) {
      return PokerHandRank.Flush;
    }
    return PokerHandRank.HightCard;
  }
   private static countPairs(cards: Card[]): number {
    const pairs: Card[][] = [];
    cards.forEach((card, index) => {
      const cardsToCompare = cards.slice(index + 1);
      const sameCardValues = cardsToCompare.filter((cardsToCompare) =>
        cardsToCompare.getValue().isEqual(card.getValue())
      );
      if (sameCardValues.length === 1) {
        pairs.push([...sameCardValues, card]);
      }
    });
    return pairs.length;
  }
  private static pokerHandIsRoyalFlush(cards: Card[]) {
    const isFlush = PokerHandRankService.pokerHandIsFlush(cards);
    const isStraight = PokerHandRankService.pokerHandIsStraight(cards);
    const hasAceCardValue = cards.find(card => card.getValue().isEqual(new CardValue('A'))) !== undefined;
    return isFlush && isStraight && hasAceCardValue;
  }
  private static pokerHandIsStraightFlush(cards: Card[]) {
    const isFlush = PokerHandRankService.pokerHandIsFlush(cards);
    const isStraight = PokerHandRankService.pokerHandIsStraight(cards);
    return isFlush && isStraight;
  }
  private static pokerHandIsFlush(cards: Card[]) {
    return cards
      .map((card) => card.getSuit())
      .every((suit, index, suits) => suit.getValue() === suits[0].getValue());
  }
  private static pokerHandIsOnePair(cards: Card[]) {
    return PokerHandRankService.countPairs(cards) === 1;
  }
  private static pokerHandIsTwoPair(cards: Card[]) {
    return PokerHandRankService.countPairs(cards) === 2;
  }
  private static pokerHandIsFourOfAKind(cards: Card[]) {
    return  cards.reduce((acc, card, index, cardArray) => {
        return acc || cardArray.filter(c => c.isEqualValue(card)).length === 4;
    }, false)
  }
  private static pokerHandIsFullHouse(cards: Card[]) {
    const pokerHandIsThreeOfKind = PokerHandRankService.pokerHandIsThreeOfKind(cards);
    const pokerHandIsTwoPair = PokerHandRankService.pokerHandIsTwoPair(cards);
    return pokerHandIsThreeOfKind && pokerHandIsTwoPair;
  }
  private static pokerHandIsThreeOfKind(cards: Card[]): boolean {
    const result: Card[] = [];
    cards.forEach((card, index) => {
      const cardsToCompare = cards.slice(index + 1);
      const sameCardValues = cardsToCompare.filter((cardsToCompare) =>
        cardsToCompare.getValue().isEqual(card.getValue())
      );
      if (sameCardValues.length === 2) {
        result.push(...sameCardValues, card);
      }
    });
    return result.length === 3;
  }
  private static pokerHandIsStraight(cards: Card[]): boolean {
    const sortCards = (firstCard: Card, secondCard: Card) => {
      return secondCard.compare(firstCard);
    };
    const sortedCards = cards.sort(sortCards);
    return sortedCards.reduce(
      (acc: boolean, card: Card, index: number, cardsArray: Card[]) => {
        const isNotLastCard = index < cardsArray.length - 1;
        if (isNotLastCard) {
          const nextCard = cardsArray[index + 1];
          acc &&= card.isConsecutive(nextCard);
        }
        return acc;
      },
      true
    );
  }
}
