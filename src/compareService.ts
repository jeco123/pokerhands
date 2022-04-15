import { PokerHand } from "./pokerHand";

export class CompareService {
  execute(pokerHands: PokerHand[]) {
    if (pokerHands.length < 2) {
      throw new Error("At least two poker hands must be compared");
    }
    const pokerHandsSortedFromHighestRankToLowestRank = pokerHands.sort((leftPokerHand, rightPokerHand) => rightPokerHand.getRank() - leftPokerHand.getRank());
    const winnerPokerHandId = pokerHandsSortedFromHighestRankToLowestRank[0].getId();
    return winnerPokerHandId;
  }
}
