"use client";

import { motion } from "framer-motion";
import { CategoryPieChart } from "@/components/analytics/category-pie-chart";
import { MonthlyBarChart } from "@/components/analytics/monthly-bar-chart";
import { useExpenses } from "@/hooks/use-expenses";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
    const { categoryBreakdown, monthlyTotals, currentMonthTotal, expenses } =
        useExpenses();

    // Calculate trend
    const lastMonthTotal =
        monthlyTotals.length >= 2
            ? monthlyTotals[monthlyTotals.length - 2].total
            : 0;
    const trend =
        lastMonthTotal > 0
            ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
            : 0;

    // Category breakdown list
    const sortedCategories = CATEGORIES.map((cat) => ({
        ...cat,
        total: categoryBreakdown[cat.value] || 0,
        percentage:
            currentMonthTotal > 0
                ? ((categoryBreakdown[cat.value] || 0) / currentMonthTotal) * 100
                : 0,
    }))
        .filter((c) => c.total > 0)
        .sort((a, b) => b.total - a.total);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    Analytics
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Detailed insights into your spending patterns
                </p>
            </div>

            {/* Trend Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 shadow-sm"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            This Month vs Last Month
                        </p>
                        <p className="text-2xl font-bold mt-1">
                            {formatCurrency(currentMonthTotal)}
                        </p>
                    </div>
                    <div
                        className={cn(
                            "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold",
                            trend > 0
                                ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                : trend < 0
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                        )}
                    >
                        {trend > 0 ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                        ) : trend < 0 ? (
                            <TrendingDown className="h-3.5 w-3.5" />
                        ) : (
                            <Minus className="h-3.5 w-3.5" />
                        )}
                        {Math.abs(trend).toFixed(1)}%
                    </div>
                </div>
            </motion.div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CategoryPieChart data={categoryBreakdown} />
                <MonthlyBarChart data={monthlyTotals} />
            </div>

            {/* Category Breakdown */}
            {sortedCategories.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 shadow-sm"
                >
                    <h3 className="text-sm font-semibold mb-4">
                        Category Breakdown (This Month)
                    </h3>
                    <div className="space-y-3">
                        {sortedCategories.map((cat) => (
                            <div key={cat.value} className="flex items-center gap-3">
                                <div
                                    className={cn(
                                        "flex items-center justify-center w-9 h-9 rounded-xl shrink-0",
                                        cat.bgColor
                                    )}
                                >
                                    <cat.icon
                                        className="h-4 w-4"
                                        style={{ color: cat.color }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">{cat.label}</span>
                                        <span className="text-sm font-semibold tabular-nums">
                                            {formatCurrency(cat.total)}
                                        </span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${cat.percentage}%` }}
                                            transition={{ duration: 0.6, delay: 0.1 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: cat.color }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
