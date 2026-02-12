import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
    const { register, handleSubmit } = useForm();
    const [registerUser] = useRegisterMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            await registerUser(data).unwrap();
            toast.success("Registration successful! Please login.");
            navigate("/login");
        } catch (err: any) {
            toast.error(err.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <input
                    {...register("name")}
                    placeholder="Name"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    required
                />
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                    Register
                </button>
                <p className="text-sm text-center">
                    Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>Login</span>
                </p>
            </form>
        </div>
    );
}
