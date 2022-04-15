import { nanoid } from "nanoid";
import { Card } from "./card";
import { PokerHandRank } from "./pokerHandRank";
import { PokerHandRankService } from "./PokerHandRankService";

export class PokerHand {
  constructor(private id: string, private cards: Card[]) {}
  static create() {
    const uuid = nanoid();
    return new PokerHand(uuid, []);
  }
  getId() {
    return this.id;
  }
  getRank(): PokerHandRank {
    return PokerHandRankService.getPokerHandRank(this.cards);
  }
  
}

// [2,2,3,4,5] => 1 dupplicate of 2
