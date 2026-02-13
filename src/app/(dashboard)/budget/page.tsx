"use client";

import { motion } from "framer-motion";
import { BudgetSetter } from "@/components/dashboard/budget-setter";
import { useExpenses } from "@/hooks/use-expenses";
import { useBudget } from "@/hooks/use-budget";
import { formatCurrency } from "@/lib/utils";
import { Wallet, Target, TrendingUp, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BudgetPage() {
    const { currentMonthTotal, totalTransactions } = useExpenses();
    const { budget, setBudget } = useBudget();

    const remaining = budget - currentMonthTotal;
    const dailyAvg = totalTransactions > 0 ? currentMonthTotal / new Date().getDate() : 0;
    const projectedMonthly = dailyAvg * 30;

    const stats = [
        {
            label: "Monthly Budget",
            value: formatCurrency(budget),
            icon: Target,
            color: "text-violet-600 dark:text-violet-400",
            bg: "bg-violet-500/10",
        },
        {
            label: "Total Spent",
            value: formatCurrency(currentMonthTotal),
            icon: TrendingUp,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            label: "Remaining",
            value: formatCurrency(Math.abs(remaining)),
            icon: Wallet,
            color: remaining >= 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400",
            bg: remaining >= 0 ? "bg-emerald-500/10" : "bg-red-500/10",
            prefix: remaining < 0 ? "- " : "",
        },
        {
            label: "Projected Monthly",
            value: formatCurrency(Math.round(projectedMonthly)),
            icon: PiggyBank,
            color: projectedMonthly > budget
                ? "text-orange-600 dark:text-orange-400"
                : "text-emerald-600 dark:text-emerald-400",
            bg: projectedMonthly > budget ? "bg-orange-500/10" : "bg-emerald-500/10",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 max-w-2xl mx-auto"
        >
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    Budget
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your monthly spending limit
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-4 shadow-sm"
                    >
                        <div className={cn("p-2 rounded-xl w-fit mb-2", stat.bg)}>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </div>
                        <p className="text-xs text-muted-foreground mb-0.5">
                            {stat.label}
                        </p>
                        <p className="text-lg font-bold">
                            {stat.prefix}
                            {stat.value}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Budget Setter */}
            <BudgetSetter
                budget={budget}
                spent={currentMonthTotal}
                onSetBudget={setBudget}
            />
        </motion.div>
    );
}
