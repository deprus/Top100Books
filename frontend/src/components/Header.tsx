import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../app/store";
import { signOut } from "../features/auth/authSlice";

export default function Header() {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onLogOut() {
    dispatch(signOut());
    navigate("/");
  }

  return (
    <header className="mt-6">
      <h1 className="flex items-center justify-center font-serif text-2xl lg:text-4xl">
        Top 100 books checklist
      </h1>
      <nav>
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-10">
          <Link to="/">
            <button className="rounded bg-orange-800 px-4 py-2 text-white hover:bg-orange-900">
              Home
            </button>
          </Link>
          {authState.user ? (
            <div className="flex items-center gap-6">
              <div className="text-xl">Welcome, {authState.user.username}</div>
              <button
                onClick={() => onLogOut()}
                className="rounded bg-orange-800 px-4 py-2 text-white hover:bg-orange-900"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/signin">
                <button className="rounded bg-orange-800 px-4 py-2 text-white hover:bg-orange-900">
                  Sign in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded bg-orange-800 px-4 py-2 text-white hover:bg-orange-900">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
