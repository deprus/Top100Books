import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/store";

type SignInData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function onSignIn(credentials: SignInData) {
    setError("");
    try {
      await dispatch(signIn(credentials)).unwrap();
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-md space-y-4 rounded-lg border bg-amber-200 p-6 shadow">
      <h1 className="text-2xl font-bold">Sign in to your account</h1>
      <form onSubmit={handleSubmit(onSignIn)} className="space-y-4">
        <div>
          <label className="mb-2 block font-medium">Email/Username</label>
          <input
            {...register("email", {
              required: true,
            })}
            className="block w-full rounded-lg border p-2.5"
          />
          {errors.email && <p>Email is required and must be valid</p>}
        </div>
        <div>
          <label className="mb-2 block font-medium ">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long",
              },
            })}
            className="block w-full rounded-lg border p-2.5"
          />
          {errors.password && (
            <span>Password must be at least 8 characters long</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg  bg-orange-800 px-5 py-2.5 text-center text-white hover:bg-orange-900"
        >
          Sign in
        </button>
        <p className="font text-sm">
          Don't have an account yet?{" "}
          <Link
            to="/signup"
            className="font-medium text-yellow-900 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}
