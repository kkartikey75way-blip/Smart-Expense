import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../services/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import BackgroundEffects from "../../components/layout/BackgroundEffects";

export default function RegisterPage() {
    const { register, handleSubmit } = useForm();
    const [registerUser] = useRegisterMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            await registerUser(data).unwrap();
            toast.success("Account created successfully!");
            navigate("/login");
        } catch (err: any) {
            toast.error(err.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <BackgroundEffects />

            <Card className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        <span className="text-gradient">Join</span> Us
                    </h1>
                    <p className="text-gray-400">Create an account to start tracking your expenses</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <Input
                            {...register("name")}
                            label="Full Name"
                            placeholder="John Doe"
                            required
                        />
                        <Input
                            {...register("email")}
                            label="Email Address"
                            placeholder="name@example.com"
                            type="email"
                            required
                        />
                        <Input
                            {...register("password")}
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-gray-400">Already have an account? </span>
                    <Link to="/login" className="text-brand-primary hover:underline font-medium">
                        Sign In
                    </Link>
                </div>
            </Card>
        </div>
    );
}
