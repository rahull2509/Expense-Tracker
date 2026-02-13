"use client";

import { motion } from "framer-motion";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { CATEGORIES, CURRENCY_SYMBOL } from "@/lib/constants";
import { Category } from "@/lib/types";
import { PieChart as PieChartIcon } from "lucide-react";

interface CategoryPieChartProps {
    data: Partial<Record<Category, number>>;
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
    const chartData = CATEGORIES.filter((cat) => (data[cat.value] || 0) > 0).map(
        (cat) => ({
            name: cat.value,
            value: data[cat.value] || 0,
            color: cat.color,
        })
    );

    if (chartData.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 shadow-sm"
            >
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <PieChartIcon className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    Category Breakdown
                </h3>
                <div className="flex items-center justify-center h-[250px] text-sm text-muted-foreground">
                    No data available
                </div>
            </motion.div>
        );
    }

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover border border-border rounded-xl px-3 py-2 shadow-lg">
                    <p className="text-xs font-semibold">{payload[0].name}</p>
                    <p className="text-xs text-muted-foreground">
                        {CURRENCY_SYMBOL}
                        {payload[0].value.toLocaleString("en-IN")}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 shadow-sm"
        >
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <PieChartIcon className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                Category Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={800}
                        animationEasing="ease-out"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                strokeWidth={0}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={8}
                        formatter={(value: string) => (
                            <span className="text-xs text-muted-foreground">{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </motion.div>
    );
}
