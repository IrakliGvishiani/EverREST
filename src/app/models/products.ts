export class ProductResp {
      total!: number;
  limit!: number;
  page!: number;
  skip!: number;
  products!: Product[];
}

export class Product {
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
}

export class Category {
   id!: string;
  name!: string;
  image!: string;
}

export class Price {
      current!: number;
  currency!: string;
  beforeDiscount!: number;
  discountPercentage!: number;
}