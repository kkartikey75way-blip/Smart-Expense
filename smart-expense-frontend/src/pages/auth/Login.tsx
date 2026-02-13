import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/reducer/authReducer";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import BackgroundEffects from "../../components/layout/BackgroundEffects";
import { toast } from "react-hot-toast";

export default function LoginPage() {

    const { register, handleSubmit } = useForm();
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            const res = await login(data).unwrap();
            dispatch(setToken(res.accessToken));
            toast.success("Welcome back!");
            navigate("/");
        } catch (error: any) {
            toast.error(error?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <BackgroundEffects />

            <Card className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        <span className="text-gradient">Welcome</span> Back
                    </h1>
                    <p className="text-gray-400">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
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
                        Sign In
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-gray-400">Don't have an account? </span>
                    <Link to="/register" className="text-brand-primary hover:underline font-medium">
                        Create an account
                    </Link>
                </div>
            </Card>
        </div>
    );
}
