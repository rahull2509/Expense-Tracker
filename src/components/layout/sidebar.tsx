"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PlusCircle,
    List,
    BarChart3,
    Settings,
    Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/add", label: "Add Expense", icon: PlusCircle },
    { href: "/expenses", label: "Expenses", icon: List },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/budget", label: "Budget", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex flex-col w-[260px] border-r border-border/50 bg-card/30 backdrop-blur-xl h-screen sticky top-0">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-6 border-b border-border/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25">
                    <Wallet className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        {APP_NAME}
                    </h1>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Expense Tracker
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-gradient-to-r from-violet-600/10 to-indigo-600/10 text-violet-700 dark:text-violet-400 shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-4 w-4 transition-colors",
                                    isActive
                                        ? "text-violet-600 dark:text-violet-400"
                                        : "text-muted-foreground"
                                )}
                            />
                            {item.label}
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Theme</span>
                    <ThemeToggle />
                </div>
            </div>
        </aside>
    );
}
