"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExpenseList } from "@/components/expenses/expense-list";
import { ExpenseFilters } from "@/components/expenses/expense-filters";
import { useExpenses } from "@/hooks/use-expenses";
import { FilterState } from "@/lib/types";
import { getUniqueMonths } from "@/lib/utils";

export default function ExpensesPage() {
    const { expenses, deleteExpense, getFilteredExpenses } = useExpenses();
    const [filters, setFilters] = useState<FilterState>({
        category: "All",
        month: "All",
    });

    const filteredExpenses = getFilteredExpenses(filters);
    const availableMonths = getUniqueMonths(expenses);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    Expenses
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    View and manage all your expenses
                </p>
            </div>

            <ExpenseFilters
                filters={filters}
                onFilterChange={setFilters}
                availableMonths={availableMonths}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 shadow-sm"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">
                        {filteredExpenses.length} expense
                        {filteredExpenses.length !== 1 ? "s" : ""}
                    </h3>
                </div>
                <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
            </motion.div>
        </motion.div>
    );
}
