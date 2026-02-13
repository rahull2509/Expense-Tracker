"use client";

import { useEffect, useRef, useState } from "react";

export function useAnimatedCounter(
    target: number,
    duration: number = 1000,
    enabled: boolean = true
) {
    const [count, setCount] = useState(0);
    const previousTarget = useRef(0);

    useEffect(() => {
        if (!enabled) return;

        const startValue = previousTarget.current;
        previousTarget.current = target;
        const diff = target - startValue;

        if (diff === 0) {
            setCount(target);
            return;
        }

        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(startValue + diff * eased);
            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [target, duration, enabled]);

    return count;
}
