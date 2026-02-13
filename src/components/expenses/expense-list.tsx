"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Expense } from "@/lib/types";
import { CATEGORIES, CURRENCY_SYMBOL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

interface ExpenseListProps {
    expenses: Expense[];
    onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
    if (expenses.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
            >
                <div className="w-20 h-20 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-4">
                    <FileText className="h-10 w-10 text-violet-500/50" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                    No expenses yet
                </h3>
                <p className="text-sm text-muted-foreground max-w-[250px]">
                    Start tracking your spending by adding your first expense
                </p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-2">
            <AnimatePresence mode="popLayout">
                {expenses.map((expense) => {
                    const categoryInfo = CATEGORIES.find(
                        (c) => c.value === expense.category
                    );
                    const CategoryIcon = categoryInfo?.icon;

                    return (
                        <motion.div
                            key={expense.id}
                            layout
                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                            className="group flex items-center gap-3 p-3.5 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-200 hover:shadow-sm"
                        >
                            {/* Category Icon */}
                            <div
                                className={cn(
                                    "flex items-center justify-center w-10 h-10 rounded-xl shrink-0",
                                    categoryInfo?.bgColor
                                )}
                            >
                                {CategoryIcon && (
                                    <CategoryIcon
                                        className="h-4 w-4"
                                        style={{ color: categoryInfo?.color }}
                                    />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold truncate">
                                        {expense.notes || expense.category}
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className="text-[10px] px-1.5 py-0 rounded-md font-medium shrink-0"
                                    >
                                        {expense.category}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {format(parseISO(expense.date), "MMM d, yyyy")}
                                </p>
                            </div>

                            {/* Amount & Delete */}
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-sm font-bold tabular-nums">
                                    {CURRENCY_SYMBOL}
                                    {expense.amount.toLocaleString("en-IN")}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(expense.id)}
                                    className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
