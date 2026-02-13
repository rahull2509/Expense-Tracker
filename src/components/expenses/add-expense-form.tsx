"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Category, Expense } from "@/lib/types";
import { toast } from "sonner";

const expenseSchema = z.object({
    amount: z
        .string()
        .min(1, "Amount is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Amount must be a positive number",
        }),
    category: z.string().min(1, "Category is required"),
    date: z.date({ error: "Date is required" }),
    notes: z.string().max(200, "Notes must be under 200 characters").optional(),
});

interface ExpenseFormData {
    amount: string;
    category: string;
    date: Date;
    notes?: string;
}

interface AddExpenseFormProps {
    onAdd: (data: Omit<Expense, "id">) => void;
}

export function AddExpenseForm({ onAdd }: AddExpenseFormProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<ExpenseFormData>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            amount: "",
            category: "" as Category,
            notes: "",
        },
    });

    const dateValue = watch("date");

    const onSubmit = (data: ExpenseFormData) => {
        onAdd({
            amount: Number(data.amount),
            category: data.category as Category,
            date: format(data.date, "yyyy-MM-dd"),
            notes: data.notes || "",
        });

        toast.success("Expense added successfully!", {
            description: `₹${Number(data.amount).toLocaleString("en-IN")} for ${data.category}`,
        });

        reset();
        setSelectedCategory("");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 shadow-sm"
        >
            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <Plus className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                Add New Expense
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Amount */}
                <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-medium">
                        Amount
                    </Label>
                    <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0"
                            className={cn(
                                "pl-9 h-11 rounded-xl bg-background/50 border-border/50 text-base",
                                errors.amount && "border-red-500 focus-visible:ring-red-500"
                            )}
                            {...register("amount")}
                        />
                    </div>
                    {errors.amount && (
                        <p className="text-xs text-red-500">{errors.amount.message}</p>
                    )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Category</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                type="button"
                                onClick={() => {
                                    setSelectedCategory(cat.value);
                                    setValue("category", cat.value, { shouldValidate: true });
                                }}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border",
                                    selectedCategory === cat.value
                                        ? "border-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-300 shadow-sm"
                                        : "border-border/50 bg-background/50 text-muted-foreground hover:bg-accent/50 hover:border-border"
                                )}
                            >
                                <cat.icon className="h-3.5 w-3.5" />
                                {cat.value}
                            </button>
                        ))}
                    </div>
                    {errors.category && (
                        <p className="text-xs text-red-500">{errors.category.message}</p>
                    )}
                </div>

                {/* Date */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full h-11 justify-start text-left rounded-xl bg-background/50 border-border/50 font-normal",
                                    !dateValue && "text-muted-foreground",
                                    errors.date && "border-red-500"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateValue ? format(dateValue, "MMMM d, yyyy") : "Pick a date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                            <Calendar
                                mode="single"
                                selected={dateValue}
                                onSelect={(date) =>
                                    date && setValue("date", date, { shouldValidate: true })
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {errors.date && (
                        <p className="text-xs text-red-500">{errors.date.message}</p>
                    )}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium">
                        Notes{" "}
                        <span className="text-muted-foreground font-normal">
                            (optional)
                        </span>
                    </Label>
                    <Textarea
                        id="notes"
                        placeholder="Add a description..."
                        className="rounded-xl bg-background/50 border-border/50 resize-none min-h-[80px]"
                        {...register("notes")}
                    />
                    {errors.notes && (
                        <p className="text-xs text-red-500">{errors.notes.message}</p>
                    )}
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium shadow-lg shadow-violet-500/25 transition-all duration-200"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                </Button>
            </form>
        </motion.div>
    );
}
