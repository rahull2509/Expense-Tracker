"use client";

import { motion } from "framer-motion";
import { TrendingUp, Wallet, PieChart, ArrowDownUp } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { formatCurrency, cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import { Category } from "@/lib/types";

interface SummaryCardsProps {
    totalExpense: number;
    remainingBudget: number;
    highestCategory: { category: Category; total: number } | null;
    totalTransactions: number;
    isLoaded: boolean;
}

export function SummaryCards({
    totalExpense,
    remainingBudget,
    highestCategory,
    totalTransactions,
    isLoaded,
}: SummaryCardsProps) {
    const animatedTotal = useAnimatedCounter(totalExpense, 800, isLoaded);
    const animatedRemaining = useAnimatedCounter(remainingBudget, 800, isLoaded);
    const animatedTransactions = useAnimatedCounter(
        totalTransactions,
        800,
        isLoaded
    );

    const budgetExceeded = remainingBudget < 0;
    const categoryInfo = highestCategory
        ? CATEGORIES.find((c) => c.value === highestCategory.category)
        : null;

    const cards = [
        {
            title: "Monthly Expense",
            value: formatCurrency(animatedTotal),
            icon: TrendingUp,
            gradient: "from-violet-600 to-indigo-600",
            iconBg: "bg-violet-500/10",
            iconColor: "text-violet-600 dark:text-violet-400",
        },
        {
            title: "Remaining Budget",
            value: formatCurrency(Math.abs(animatedRemaining)),
            icon: Wallet,
            gradient: budgetExceeded
                ? "from-red-600 to-rose-600"
                : "from-emerald-600 to-teal-600",
            iconBg: budgetExceeded ? "bg-red-500/10" : "bg-emerald-500/10",
            iconColor: budgetExceeded
                ? "text-red-600 dark:text-red-400"
                : "text-emerald-600 dark:text-emerald-400",
            prefix: budgetExceeded ? "- " : "",
        },
        {
            title: "Top Category",
            value: categoryInfo?.label || "—",
            icon: PieChart,
            gradient: "from-orange-500 to-amber-500",
            iconBg: "bg-orange-500/10",
            iconColor: "text-orange-600 dark:text-orange-400",
            subtitle: highestCategory
                ? formatCurrency(highestCategory.total)
                : undefined,
        },
        {
            title: "Transactions",
            value: animatedTransactions.toString(),
            icon: ArrowDownUp,
            gradient: "from-blue-600 to-cyan-600",
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-600 dark:text-blue-400",
            subtitle: "this month",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className={cn(
                        "relative overflow-hidden rounded-2xl border border-border/50",
                        "bg-card/80 backdrop-blur-sm p-5",
                        "shadow-sm hover:shadow-md transition-shadow duration-300",
                        budgetExceeded && card.title === "Remaining Budget" && "animate-pulse"
                    )}
                >
                    {/* Gradient accent bar */}
                    <div
                        className={cn(
                            "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r",
                            card.gradient
                        )}
                    />

                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {card.title}
                            </p>
                            <p className="text-2xl font-bold tracking-tight">
                                {card.prefix}
                                {card.value}
                            </p>
                            {card.subtitle && (
                                <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                            )}
                        </div>
                        <div className={cn("p-2.5 rounded-xl", card.iconBg)}>
                            <card.icon className={cn("h-5 w-5", card.iconColor)} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
