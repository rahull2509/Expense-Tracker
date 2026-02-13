import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Expense, Category } from "./types";
import { CURRENCY_SYMBOL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function getMonthKey(date: string): string {
  return date.substring(0, 7); // "YYYY-MM"
}

export function getMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function getCategoryTotal(
  expenses: Expense[],
  category: Category
): number {
  return expenses
    .filter((e) => e.category === category)
    .reduce((sum, e) => sum + e.amount, 0);
}

export function getMonthlyTotal(expenses: Expense[], monthKey: string): number {
  return expenses
    .filter((e) => getMonthKey(e.date) === monthKey)
    .reduce((sum, e) => sum + e.amount, 0);
}

export function getHighestCategory(
  expenses: Expense[]
): { category: Category; total: number } | null {
  if (expenses.length === 0) return null;

  const totals: Partial<Record<Category, number>> = {};
  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });

  let maxCategory: Category = "Others";
  let maxTotal = 0;
  (Object.entries(totals) as [Category, number][]).forEach(
    ([category, total]) => {
      if (total > maxTotal) {
        maxCategory = category;
        maxTotal = total;
      }
    }
  );

  return { category: maxCategory, total: maxTotal };
}

export function getUniqueMonths(expenses: Expense[]): string[] {
  const months = new Set(expenses.map((e) => getMonthKey(e.date)));
  return Array.from(months).sort().reverse();
}
