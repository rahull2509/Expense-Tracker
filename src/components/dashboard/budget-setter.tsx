"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, IndianRupee, Target, AlertTriangle } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";

interface BudgetSetterProps {
    budget: number;
    spent: number;
    onSetBudget: (value: number) => void;
}

export function BudgetSetter({ budget, spent, onSetBudget }: BudgetSetterProps) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(budget.toString());

    const remaining = budget - spent;
    const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
    const exceeded = remaining < 0;

    const handleSave = () => {
        const value = Number(inputValue);
        if (value > 0) {
            onSetBudget(value);
            toast.success("Budget updated!", {
                description: `Monthly budget set to ${formatCurrency(value)}`,
            });
            setOpen(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "rounded-2xl border bg-card/80 backdrop-blur-sm p-6 shadow-sm",
                exceeded
                    ? "border-red-500/50 bg-red-500/5"
                    : "border-border/50"
            )}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    Monthly Budget
                </h3>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 rounded-lg text-xs"
                            onClick={() => setInputValue(budget.toString())}
                        >
                            <Settings className="h-3.5 w-3.5 mr-1.5" />
                            Set Budget
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-2xl">
                        <DialogHeader>
                            <DialogTitle>Set Monthly Budget</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <Label>Budget Amount</Label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="number"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="pl-9 h-11 rounded-xl"
                                        placeholder="Enter budget amount"
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={handleSave}
                                className="w-full h-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                            >
                                Save Budget
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                        Spent: <span className="font-semibold text-foreground">{formatCurrency(spent)}</span>
                    </span>
                    <span className="text-muted-foreground">
                        Budget: <span className="font-semibold text-foreground">{formatCurrency(budget)}</span>
                    </span>
                </div>

                <div className="h-3 rounded-full bg-secondary/50 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={cn(
                            "h-full rounded-full transition-colors",
                            exceeded
                                ? "bg-gradient-to-r from-red-500 to-rose-500"
                                : percentage > 80
                                    ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                    : "bg-gradient-to-r from-violet-600 to-indigo-600"
                        )}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        {percentage.toFixed(0)}% used
                    </span>
                    {exceeded ? (
                        <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-xs font-semibold text-red-500 flex items-center gap-1"
                        >
                            <AlertTriangle className="h-3 w-3" />
                            Budget exceeded by {formatCurrency(Math.abs(remaining))}
                        </motion.span>
                    ) : (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            {formatCurrency(remaining)} remaining
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
