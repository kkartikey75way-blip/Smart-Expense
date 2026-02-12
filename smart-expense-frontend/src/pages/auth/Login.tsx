import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/reducer/authReducer";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const { register, handleSubmit } = useForm();
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        const res = await login(data).unwrap();

        dispatch(setToken(res.accessToken));
        navigate("/");
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <input {...register("email")} placeholder="Email" className="border p-2" />
                <input {...register("password")} type="password" placeholder="Password" className="border p-2" />

                <button className="bg-blue-500 text-white px-4 py-2">
                    Login
                </button>

            </form>
        </div>
    );
}
