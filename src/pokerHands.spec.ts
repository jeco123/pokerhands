import { Card } from "./card";
import { CardSuit } from "./cardSuit";
import { CardValue } from "./cardValue";
import { PokerHand } from "./pokerHand";
import { PokerHandRank } from "./pokerHandRank";

describe("getRank", () => {
  it("should return a HighCardRank when you haven't made any of the hands, the highest card plays (3D AD 8S 4S 2C)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("3"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("8"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("4"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("2"), suit: new CardSuit("C") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.HightCard);
  });
  it("should return a Pair rank when Two cards of the same rank (3D AD 3S 4S 2C)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("3"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("3"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("4"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("2"), suit: new CardSuit("C") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.Pair);
  });
  it("should return a Two Pair rank when Two different pairs (3D AD 3S AS 2C)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("3"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("3"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("2"), suit: new CardSuit("C") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.TwoPair);
  });
  it("should return a Three of a kind rank when Three cards of the same rank (3D AD 3S 4S 3C)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("3"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("3"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("4"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("3"), suit: new CardSuit("C") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.ThreeOfAKind);
  });
  it("should return a Straight rank when Five cards in a sequence, but not of the same suit (9C 8D 7H 6S 5C)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("7"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("5"), suit: new CardSuit("C") }),
      new Card({ value: new CardValue("9"), suit: new CardSuit("C") }),
      new Card({ value: new CardValue("6"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("8"), suit: new CardSuit("D") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.Straight);
  });
  it("should return a Straight rank when Five cards in a sequence, but not of the same suit (AC KD QH JS 10C)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("10"), suit: new CardSuit("C") }),
      new Card({ value: new CardValue("K"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("C") }),
      new Card({ value: new CardValue("J"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("Q"), suit: new CardSuit("H") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.Straight);
  });
  it("should return a Flush rank when Five cards have the same suit (3D AD 2D JD 8D)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("3"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("2"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("J"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("8"), suit: new CardSuit("D") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.Flush);
  });
  it("should return a Full house rank when Three cards have the same rank and two cards have same rank (3D 3H 3C AD AC)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("3"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("3"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("3"), suit: new CardSuit("C") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("C") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.FullHouse);
  });
  it("should return a Four of a kind rank when four cards have the same rank (KD KH KC KS 3C)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("K"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("K"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("K"), suit: new CardSuit("C") }),
      new Card({ value: new CardValue("K"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("3"), suit: new CardSuit("C") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.FourOfAKind);
  });
  it("should return a straight flush rank when four cards have (4D 5D 6D 7D 8D)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("4"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("5"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("6"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("7"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("8"), suit: new CardSuit("D") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.StraightFlush);
  });
  it("should return a royal flush rank when four cards have (AD KD QD JD 10D)", () => {
    const pokerHand = new PokerHand("id-1", [
      new Card({ value: new CardValue("K"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("10"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("J"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("Q"), suit: new CardSuit("D") }),
    ]);
    expect(pokerHand.getRank()).toBe(PokerHandRank.RoyalFlush);
  });
});
