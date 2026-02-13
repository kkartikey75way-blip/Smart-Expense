import { InputHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
    return inputs.filter(Boolean).join(" ");
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, className, ...props }, ref) => {
    return (
        <div className="space-y-1.5 w-full">
            {label && <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>}
            <input
                ref={ref}
                className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500",
                    "focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all",
                    className
                )}
                {...props}
            />
        </div>
    );
});

Input.displayName = "Input";

export default Input;
