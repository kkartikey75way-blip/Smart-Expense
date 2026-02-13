import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
    return inputs.filter(Boolean).join(" ");
}

interface CardProps {
    children: ReactNode;
    className?: string;
}

export default function Card({ children, className }: CardProps) {
    return (
        <div className={cn("glass-card animate-in fade-in zoom-in duration-500", className)}>
            {children}
        </div>
    );
}
