export class Price {
  current!: number;
  beforeDiscount!: number;
}

export class Total {
  price!: Price;
  quantity!: number;
  products!: number;
}

export class CartProduct {
  quantity!: number;
  pricePerQuantity!: number;
  beforeDiscountPrice!: number;
  productId!: string;
}

export class Cart {
  total!: Total;
  _id!: string;
  userId!: string;
  createdAt!: string;
  products!: CartProduct[];
}