import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
    return inputs.filter(Boolean).join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "glass";
}

export default function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
    const variants = {
        primary: "bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:opacity-90 shadow-lg shadow-brand-primary/20",
        secondary: "bg-white/10 text-white hover:bg-white/20",
        glass: "glass text-white hover:bg-white/10"
    };

    return (
        <button
            className={cn(
                "px-6 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 active:scale-95 transition-all duration-300",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
