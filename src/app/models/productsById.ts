export class Price {
  current!: number;
  currency!: string;
  beforeDiscount!: number;
  discountPercentage!: number;
}

export class Category {
  id!: string;
  name!: string;
  image!: string;
}

export class Rating {
  userId!: string;
  value!: number;
  createdAt!: string;
}

export class SingleProduct {
  _id!: string;
  title!: string;
  description!: string;
  issueDate!: string;
  thumbnail!: string;
  stock!: number;
  rating!: number;
  brand!: string;
  warranty!: number;
  images!: string[];
  price!: Price;
  category!: Category;
  ratings!: Rating[];
}