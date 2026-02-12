export interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description?: string;
  paymentMethod: string;
  date: string;
}
