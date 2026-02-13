import { Icons } from "../../components/ui/Icons";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useTheme } from "../../store/ThemeContext";
import { useGetMeQuery } from "../../services/authApi";
import { motion } from "framer-motion";

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();
    const { data: user, isLoading } = useGetMeQuery();

    const sections = [
        {
            title: "Profile Information",
            description: "Manage your personal details and account info.",
            icon: Icons.User,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted uppercase">Full Name</label>
                            <div className="p-3 rounded-xl bg-white/5 border border-muted text-main font-medium">
                                {user?.name || "User Name"}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted uppercase">Email Address</label>
                            <div className="p-3 rounded-xl bg-white/5 border border-muted text-main font-medium">
                                {user?.email || "user@example.com"}
                            </div>
                        </div>
                    </div>
                    <Button variant="secondary" className="w-full">Edit Profile</Button>
                </div>
            )
        },
        {
            title: "Preferences",
            description: "Customize your application experience.",
            icon: Icons.Settings,
            content: (
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-muted">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                {theme === 'dark' ? <Icons.Moon className="w-5 h-5" /> : <Icons.Sun className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="text-main font-bold">Appearance</p>
                                <p className="text-xs text-muted">Toggle between light and dark mode</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`
                w-14 h-8 rounded-full p-1 transition-all duration-300
                ${theme === 'dark' ? 'bg-brand-primary' : 'bg-gray-200 dark:bg-gray-700'}
              `}
                        >
                            <motion.div
                                animate={{ x: theme === 'dark' ? 24 : 0 }}
                                className="w-6 h-6 rounded-full bg-white shadow-lg"
                            />
                        </button>
                    </div>
                </div>
            )
        },
        {
            title: "Security",
            description: "Keep your account secure.",
            icon: Icons.CreditCard,
            content: (
                <div className="space-y-4">
                    <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                        Change Password
                    </Button>
                    <Button variant="secondary" className="w-full text-red-400 border-red-400/20 hover:bg-red-400/10">
                        Sign Out from all devices
                    </Button>
                </div>
            )
        }
    ];

    if (isLoading) return (
        <div className="flex items-center justify-center p-24">
            <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold text-main tracking-tight">Settings</h1>
                <p className="text-muted">Manage your account settings and preferences.</p>
            </div>

            <div className="grid gap-6">
                {sections.map((section, index) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="p-8">
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="lg:w-1/3">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                                            <section.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-main">{section.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted">{section.description}</p>
                                </div>
                                <div className="lg:w-2/3">
                                    {section.content}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
