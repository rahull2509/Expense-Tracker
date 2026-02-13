"use client";

import { motion } from "framer-motion";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { BudgetSetter } from "@/components/dashboard/budget-setter";
import { AddExpenseForm } from "@/components/expenses/add-expense-form";
import { ExpenseList } from "@/components/expenses/expense-list";
import { CategoryPieChart } from "@/components/analytics/category-pie-chart";
import { MonthlyBarChart } from "@/components/analytics/monthly-bar-chart";
import { useExpenses } from "@/hooks/use-expenses";
import { useBudget } from "@/hooks/use-budget";

export default function DashboardPage() {
    const {
        expenses,
        isLoaded,
        addExpense,
        deleteExpense,
        currentMonthTotal,
        highestCategory,
        totalTransactions,
        categoryBreakdown,
        monthlyTotals,
    } = useExpenses();

    const { budget, setBudget, isLoaded: budgetLoaded } = useBudget();

    const remainingBudget = budget - currentMonthTotal;

    // Show last 5 expenses on dashboard
    const recentExpenses = expenses.slice(0, 5);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    Dashboard
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Your financial overview at a glance
                </p>
            </div>

            {/* Summary Cards */}
            <SummaryCards
                totalExpense={currentMonthTotal}
                remainingBudget={remainingBudget}
                highestCategory={highestCategory}
                totalTransactions={totalTransactions}
                isLoaded={isLoaded}
            />

            {/* Budget Progress */}
            <BudgetSetter
                budget={budget}
                spent={currentMonthTotal}
                onSetBudget={setBudget}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Add Expense + Recent */}
                <div className="space-y-6">
                    <AddExpenseForm onAdd={addExpense} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 shadow-sm"
                    >
                        <h3 className="text-sm font-semibold mb-3">Recent Expenses</h3>
                        <ExpenseList expenses={recentExpenses} onDelete={deleteExpense} />
                    </motion.div>
                </div>

                {/* Right: Charts */}
                <div className="space-y-6">
                    <CategoryPieChart data={categoryBreakdown} />
                    <MonthlyBarChart data={monthlyTotals} />
                </div>
            </div>
        </motion.div>
    );
}
