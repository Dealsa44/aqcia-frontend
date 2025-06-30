export interface Product {
  id: number;
  name: string[]; // Array of translations [georgian, english, russian]
  image: string;
  category: string;
  description: string[];
  prices: {
    market: string;
    price: number;
    discount: number;
    history: number[];
  }[];
  reviews: {
    user: string;
    rating: number;
    comment: string[];
    date: string;
  }[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}