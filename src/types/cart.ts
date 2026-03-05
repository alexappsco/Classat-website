export interface CartItem {
    cartItemId: string;
    itemType: string;
    title: string;
    imageUrl: string | null;
    price: number;
    rating: number | null;
    sessions: any[];
  }

  export interface PaymentSummary {
    subTotal: number;
    vat: number;
    discount: number;
    total: number;
    totalAfterDiscount: number;
    platformProfitPercentage: number;
    taxRate: number;
    platformProfit: number;
  }

  export interface CartData {
    cartId: string;
    items: CartItem[];
    paymentSummary: PaymentSummary;
  }