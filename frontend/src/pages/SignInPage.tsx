import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";

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
  const dispatch = useDispatch<AppDispatch>();
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
    <div className="bg-amber-200 p-6 space-y-4 w-full rounded-lg shadow max-w-md border mx-auto">
      <h1 className="text-2xl font-bold">Sign in to your account</h1>
      <form onSubmit={handleSubmit(onSignIn)} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Email/Username</label>
          <input
            {...register("email", {
              required: true,
            })}
            className="border rounded-lg block w-full p-2.5"
          />
          {errors.email && <p>Email is required and must be valid</p>}
        </div>
        <div>
          <label className="block mb-2 font-medium ">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long",
              },
            })}
            className="border rounded-lg block w-full p-2.5"
          />
          {errors.password && (
            <span>Password must be at least 8 characters long</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full hover:bg-orange-900  rounded-lg px-5 py-2.5 text-center bg-orange-800 text-white"
        >
          Sign in
        </button>
        <p className="text-sm font">
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
