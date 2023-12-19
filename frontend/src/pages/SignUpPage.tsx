import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/store";

type SignUpData = {
  email: string;
  username: string;
  password: string;
  _confirmPassword: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function onSignUp(credentials: SignUpData) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _confirmPassword, ...userData } = credentials;
      await dispatch(signUp(userData)).unwrap();
      navigate("/signin");
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-md space-y-4 rounded-lg border bg-amber-200 p-6 shadow">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <form onSubmit={handleSubmit(onSignUp)} className="space-y-4">
        <div>
          <label className="mb-2 block font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            className="block w-full rounded-lg border p-2.5"
          />
          {errors.email && <p>Email is required and must be valid</p>}
        </div>
        <div>
          <label className="mb-2 block font-medium ">Username</label>
          <input
            type="username"
            {...register("username", {
              required: true,
              minLength: {
                value: 2,
                message: "Username should be at least 2 characters long",
              },
            })}
            className="block w-full rounded-lg border p-2.5"
          />
          {errors.username && (
            <span>Username must be at least 2 characters long</span>
          )}
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
        <div>
          <label className="mb-2 block font-medium ">Confirm password</label>
          <input
            type="password"
            {...register("_confirmPassword", {
              validate: (value, formValues) => value === formValues.password,
            })}
            className="block w-full rounded-lg border p-2.5"
          />
          {errors._confirmPassword && <span>Passwords do not match</span>}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg  bg-orange-800 px-5 py-2.5 text-center text-white hover:bg-orange-900"
        >
          Create an account
        </button>
        <p className="font text-sm">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-yellow-900 hover:underline"
          >
            Login here
          </Link>
        </p>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}
