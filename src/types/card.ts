export type CardType = "VISA" | "MASTER" | "AMEX" | "JCB" | "LOCAL";

export type CardStatus = "ACTIVE" | "EXPIRED" | "BLOCKED" | "DELETED";

export type CardResponse = {
  cardId: number;
  cardName: string;
  cardCompany: string;
  cardType: CardType;
  maskedNumber: string;
  last4: string;
  cardImageUrl: string | null;
  isDefault: boolean;
};

export type CardDetailResponse = {
  cardId: number;
  cardName: string;
  cardCompany: string;
  cardType: CardType;
  maskedNumber: string;
  last4: string;
  cardImageUrl: string | null;
  isDefault: boolean;
  cardStatus: CardStatus;
};
