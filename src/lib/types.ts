export type Category =
  | "Food"
  | "Travel"
  | "Shopping"
  | "Bills"
  | "Education"
  | "Health"
  | "Others";

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  date: string;
  notes: string;
}

export interface BudgetSettings {
  monthlyBudget: number;
}

export interface FilterState {
  category: Category | "All";
  month: string; // "YYYY-MM" format or "All"
}
