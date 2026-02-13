"use client";

import { Category, FilterState } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getMonthLabel } from "@/lib/utils";
import { Filter } from "lucide-react";
import { motion } from "framer-motion";

interface ExpenseFiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    availableMonths: string[];
}

export function ExpenseFilters({
    filters,
    onFilterChange,
    availableMonths,
}: ExpenseFiltersProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 shadow-sm space-y-4"
        >
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filters
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Category
                </p>
                <div className="flex flex-wrap gap-1.5">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            onFilterChange({ ...filters, category: "All" })
                        }
                        className={cn(
                            "h-8 px-3 rounded-lg text-xs font-medium transition-all",
                            filters.category === "All"
                                ? "bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/30"
                                : "text-muted-foreground hover:bg-accent/50"
                        )}
                    >
                        All
                    </Button>
                    {CATEGORIES.map((cat) => (
                        <Button
                            key={cat.value}
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                onFilterChange({ ...filters, category: cat.value })
                            }
                            className={cn(
                                "h-8 px-3 rounded-lg text-xs font-medium transition-all",
                                filters.category === cat.value
                                    ? "bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/30"
                                    : "text-muted-foreground hover:bg-accent/50"
                            )}
                        >
                            {cat.value}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Month Filter */}
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Month
                </p>
                <div className="flex flex-wrap gap-1.5">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            onFilterChange({ ...filters, month: "All" })
                        }
                        className={cn(
                            "h-8 px-3 rounded-lg text-xs font-medium transition-all",
                            filters.month === "All"
                                ? "bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/30"
                                : "text-muted-foreground hover:bg-accent/50"
                        )}
                    >
                        All
                    </Button>
                    {availableMonths.map((month) => (
                        <Button
                            key={month}
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                onFilterChange({ ...filters, month })
                            }
                            className={cn(
                                "h-8 px-3 rounded-lg text-xs font-medium transition-all",
                                filters.month === month
                                    ? "bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/30"
                                    : "text-muted-foreground hover:bg-accent/50"
                            )}
                        >
                            {getMonthLabel(month)}
                        </Button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
