import {
    UtensilsCrossed,
    Plane,
    ShoppingBag,
    Receipt,
    GraduationCap,
    HeartPulse,
    MoreHorizontal,
} from "lucide-react";
import { Category } from "./types";

export const APP_NAME = "SmartSpend";
export const APP_TAGLINE = "Advanced Expense Tracker";

export const CATEGORIES: {
    value: Category;
    label: string;
    icon: typeof UtensilsCrossed;
    color: string;
    bgColor: string;
}[] = [
        {
            value: "Food",
            label: "Food & Dining",
            icon: UtensilsCrossed,
            color: "#f97316",
            bgColor: "bg-orange-500/10",
        },
        {
            value: "Travel",
            label: "Travel",
            icon: Plane,
            color: "#3b82f6",
            bgColor: "bg-blue-500/10",
        },
        {
            value: "Shopping",
            label: "Shopping",
            icon: ShoppingBag,
            color: "#a855f7",
            bgColor: "bg-purple-500/10",
        },
        {
            value: "Bills",
            label: "Bills & Utilities",
            icon: Receipt,
            color: "#ef4444",
            bgColor: "bg-red-500/10",
        },
        {
            value: "Education",
            label: "Education",
            icon: GraduationCap,
            color: "#10b981",
            bgColor: "bg-emerald-500/10",
        },
        {
            value: "Health",
            label: "Health",
            icon: HeartPulse,
            color: "#ec4899",
            bgColor: "bg-pink-500/10",
        },
        {
            value: "Others",
            label: "Others",
            icon: MoreHorizontal,
            color: "#6b7280",
            bgColor: "bg-gray-500/10",
        },
    ];

export const DEFAULT_BUDGET = 50000;

export const CURRENCY_SYMBOL = "₹";

export const STORAGE_KEYS = {
    EXPENSES: "smartspend-expenses",
    BUDGET: "smartspend-budget",
} as const;
