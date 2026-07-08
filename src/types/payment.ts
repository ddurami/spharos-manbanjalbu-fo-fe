export type PaymentGatewayName = "MOCK" | "TOSS" | "INICIS" | "KAKAO_PAY";

export type PaymentApiStatus =
  | "SUCCESS"
  | "CANCEL"
  | "READY"
  | "IN_PROGRESS"
  | "FAILED"
  | "REFUNDED";

export type PaymentCreateRequest = {
  orderNo: string;
  cardId: number;
};

export type PaymentResponse = {
  paymentId: number;
  orderId: number;
  orderNo: string;
  paymentStatus: PaymentApiStatus;
  approvedNumber: string;
  paidAmount: number;
  paidAt: string;
  pgName: PaymentGatewayName;
};
