"use client";

import { motion } from "framer-motion";
import { AddExpenseForm } from "@/components/expenses/add-expense-form";
import { useExpenses } from "@/hooks/use-expenses";

export default function AddExpensePage() {
    const { addExpense } = useExpenses();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 max-w-xl mx-auto"
        >
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    Add Expense
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Record a new expense transaction
                </p>
            </div>

            <AddExpenseForm onAdd={addExpense} />
        </motion.div>
    );
}
