export type MypageInfoItem = {
  count: number;
  summary: string;
};

export type MypageShoppingInfo = {
  orderHistory: MypageInfoItem;
  orderCancellation: MypageInfoItem;
  deliveryReservation: MypageInfoItem;
  deliveryAddress: MypageInfoItem;
};

export type MypagePaymentMethods = {
  creditCard: MypageInfoItem;
  bankAccount: MypageInfoItem;
  coupon: MypageInfoItem;
};

export type MypageSummaryResponse = {
  name: string;
  shoppingInfo: MypageShoppingInfo;
  paymentMethods: MypagePaymentMethods;
};
