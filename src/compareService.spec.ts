import { Card } from "./card";
import { CardSuit } from "./cardSuit";
import { CardValue } from "./cardValue";
import { CompareService } from "./compareService";
import { PokerHand } from "./pokerHand";

describe("compareService", () => {
  it("should send an exception to compare at least two pairs when no poker hands passed into parameters", () => {
    const compareService = new CompareService();
    expect(() => compareService.execute([])).toThrowError(
      "At least two poker hands must be compared"
    );
  });
  it("should send an exception to compare at least two pairs when 1 poker hands passed into parameters", () => {
    const compareService = new CompareService();
    expect(() => compareService.execute([PokerHand.create()])).toThrowError(
      "At least two poker hands must be compared"
    );
  });
  it("should not send an exception to compare at least two pairs when 2 poker hands are passed into parameters", () => {
    const compareService = new CompareService();
    expect(() =>
      compareService.execute([PokerHand.create(), PokerHand.create()])
    ).not.toThrowError("At least two poker hands must be compared");
  });
  it("should return the winner poker hand id-1 when id-1 has a High card", () => {
    const compareService = new CompareService();
    const winnerPokerHandCards = [
      new Card({ value: new CardValue("3"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("8"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("4"), suit: new CardSuit("c") }),
      new Card({ value: new CardValue("2"), suit: new CardSuit("D") }),
    ];
    const looserPokerHandCards = [
      new Card({ value: new CardValue("3"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("8"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("4"), suit: new CardSuit("c") }),
      new Card({ value: new CardValue("2"), suit: new CardSuit("D") }),
    ];
    const winnerId = compareService.execute([
      new PokerHand("id-1", winnerPokerHandCards),
      new PokerHand("id-2", looserPokerHandCards),
    ]);
    expect(winnerId).toBe("id-1");
  });
  it("should return the winner poker hand id-1 when id-1 has a pair and id-2 has a hight card", () => {
    const compareService = new CompareService();
    const winnerPokerHandCards = [
      new Card({ value: new CardValue("3"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("3"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("7"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("6"), suit: new CardSuit("C") }),
      new Card({ value: new CardValue("4"), suit: new CardSuit("D") }),
    ];
    const looserPokerHandCards = [
      new Card({ value: new CardValue("9"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("8"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("5"), suit: new CardSuit("C") }),
      new Card({ value: new CardValue("2"), suit: new CardSuit("D") }),
    ];
    const winnerId = compareService.execute([
      new PokerHand("id-1", winnerPokerHandCards),
      new PokerHand("id-2", looserPokerHandCards),
    ]);
    expect(winnerId).toBe("id-1");
  });
  it("should return the winner poker hand id-2 when id-1 has a pair and id-2 has a royal flush", () => {
    const compareService = new CompareService();
    const winnerPokerHandCards = [
      new Card({ value: new CardValue("3"), suit: new CardSuit("D") }),
      new Card({ value: new CardValue("3"), suit: new CardSuit("S") }),
      new Card({ value: new CardValue("7"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("6"), suit: new CardSuit("C") }),
      new Card({ value: new CardValue("4"), suit: new CardSuit("D") }),
    ];
    const looserPokerHandCards = [
      new Card({ value: new CardValue("10"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("A"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("Q"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("K"), suit: new CardSuit("H") }),
      new Card({ value: new CardValue("J"), suit: new CardSuit("H") }),
    ];
    const winnerId = compareService.execute([
      new PokerHand("id-1", winnerPokerHandCards),
      new PokerHand("id-2", looserPokerHandCards),
    ]);
    expect(winnerId).toBe("id-2");
  });
});