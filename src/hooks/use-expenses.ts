"use client";

import { useState, useEffect, useCallback } from "react";
import { Expense, Category, FilterState } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/constants";
import {
    generateId,
    getMonthKey,
    getCurrentMonthKey,
    getHighestCategory,
    getMonthlyTotal,
} from "@/lib/utils";

function loadFromStorage<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
}

function saveToStorage<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.error("Failed to save to localStorage");
    }
}

export function useExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = loadFromStorage<Expense[]>(STORAGE_KEYS.EXPENSES, []);
        setExpenses(stored);
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever expenses change
    useEffect(() => {
        if (isLoaded) {
            saveToStorage(STORAGE_KEYS.EXPENSES, expenses);
        }
    }, [expenses, isLoaded]);

    const addExpense = useCallback(
        (data: Omit<Expense, "id">) => {
            const newExpense: Expense = {
                ...data,
                id: generateId(),
            };
            setExpenses((prev) => [newExpense, ...prev]);
            return newExpense;
        },
        []
    );

    const deleteExpense = useCallback((id: string) => {
        setExpenses((prev) => prev.filter((e) => e.id !== id));
    }, []);

    const getFilteredExpenses = useCallback(
        (filters: FilterState) => {
            return expenses.filter((expense) => {
                const categoryMatch =
                    filters.category === "All" || expense.category === filters.category;
                const monthMatch =
                    filters.month === "All" ||
                    getMonthKey(expense.date) === filters.month;
                return categoryMatch && monthMatch;
            });
        },
        [expenses]
    );

    const currentMonthKey = getCurrentMonthKey();
    const currentMonthExpenses = expenses.filter(
        (e) => getMonthKey(e.date) === currentMonthKey
    );
    const currentMonthTotal = getMonthlyTotal(expenses, currentMonthKey);
    const highestCategory = getHighestCategory(currentMonthExpenses);
    const totalTransactions = currentMonthExpenses.length;

    // Category breakdown for current month
    const categoryBreakdown = currentMonthExpenses.reduce(
        (acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        },
        {} as Partial<Record<Category, number>>
    );

    // Monthly totals for bar chart (last 6 months)
    const monthlyTotals = (() => {
        const months: { month: string; total: number }[] = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            const label = d.toLocaleDateString("en-US", {
                month: "short",
                year: "2-digit",
            });
            months.push({
                month: label,
                total: getMonthlyTotal(expenses, key),
            });
        }
        return months;
    })();

    return {
        expenses,
        isLoaded,
        addExpense,
        deleteExpense,
        getFilteredExpenses,
        currentMonthTotal,
        highestCategory,
        totalTransactions,
        categoryBreakdown,
        monthlyTotals,
    };
}
