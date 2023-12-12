import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { signOut } from "../features/auth/authSlice";

export default function Header() {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function onLogOut() {
    dispatch(signOut());
    navigate("/");
  }

  return (
    <header className="w-full">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto py-4 px-10">
        <Link to="/">
          <button className="bg-orange-800 hover:bg-orange-900 px-4 py-2 text-white rounded">
            Home
          </button>
        </Link>
        {authState.user ? (
          <button
            onClick={() => onLogOut()}
            className="bg-orange-800 hover:bg-orange-900 px-4 py-2 text-white rounded"
          >
            Log out
          </button>
        ) : (
          <div className="flex gap-4">
            <Link to="/signin">
              <button className="bg-orange-800 hover:bg-orange-900 px-4 py-2 text-white rounded">
                Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-orange-800 hover:bg-orange-900 px-4 py-2 text-white rounded">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
