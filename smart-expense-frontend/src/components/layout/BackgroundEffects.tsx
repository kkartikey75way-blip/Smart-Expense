import { motion } from "framer-motion";

export default function BackgroundEffects() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/15 dark:bg-brand-primary/20 blur-[120px] animate-blob"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-secondary/10 dark:bg-brand-secondary/10 blur-[120px] animate-blob [animation-delay:2s]"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute top-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-[100px] animate-blob [animation-delay:4s]"
            />
        </div>
    );
}
