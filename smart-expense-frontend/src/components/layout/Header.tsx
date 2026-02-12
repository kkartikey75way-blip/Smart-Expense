import { useDispatch } from "react-redux";
import { logout } from "../../store/reducer/authReducer";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">

      <h2 className="text-lg font-semibold">
        Dashboard
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

    </header>
  );
}
