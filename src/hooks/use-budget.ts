"use client";

import { useState, useEffect } from "react";
import { STORAGE_KEYS, DEFAULT_BUDGET } from "@/lib/constants";

export function useBudget() {
    const [budget, setBudgetState] = useState<number>(DEFAULT_BUDGET);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.BUDGET);
            if (stored) {
                setBudgetState(JSON.parse(stored));
            }
        } catch {
            // ignore
        }
        setIsLoaded(true);
    }, []);

    const setBudget = (value: number) => {
        setBudgetState(value);
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(value));
        }
    };

    return { budget, setBudget, isLoaded };
}
