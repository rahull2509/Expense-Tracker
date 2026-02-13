"use client";

import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CURRENCY_SYMBOL } from "@/lib/constants";
import { BarChart3 } from "lucide-react";

interface MonthlyBarChartProps {
    data: { month: string; total: number }[];
}

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
    const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover border border-border rounded-xl px-3 py-2 shadow-lg">
                    <p className="text-xs font-semibold">{label}</p>
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
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 shadow-sm"
        >
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                Monthly Spending Trend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} barSize={32}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="hsl(var(--border))"
                        opacity={0.5}
                    />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                        tickFormatter={(value) =>
                            value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
                        }
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--accent))", opacity: 0.3 }} />
                    <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                        </linearGradient>
                    </defs>
                    <Bar
                        dataKey="total"
                        fill="url(#barGradient)"
                        radius={[6, 6, 0, 0]}
                        animationBegin={0}
                        animationDuration={800}
                        animationEasing="ease-out"
                    />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
}
