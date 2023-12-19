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
      <div className="flex flex-col items-center font-serif ">
        <h1 className="flex items-center justify-center text-2xl lg:text-4xl">
          Top 100 books checklist
        </h1>
        <h2 className="max-w-xs sm:max-w-full">
          Time Magazine's 100 best English-language novels from 1923-2005
        </h2>
      </div>
      <nav>
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-2 md:px-10">
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
