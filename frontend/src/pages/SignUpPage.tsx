import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { signUp } from "../features/auth/authSlice";

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
  const dispatch = useDispatch<AppDispatch>();
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
    <div className="bg-amber-200 p-6 space-y-4 w-full rounded-lg shadow max-w-md border mx-auto">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <form onSubmit={handleSubmit(onSignUp)} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            className="border rounded-lg block w-full p-2.5"
          />
          {errors.email && <p>Email is required and must be valid</p>}
        </div>
        <div>
          <label className="block mb-2 font-medium ">Username</label>
          <input
            type="username"
            {...register("username", {
              required: true,
              minLength: {
                value: 2,
                message: "Username should be at least 2 characters long",
              },
            })}
            className="border rounded-lg block w-full p-2.5"
          />
          {errors.username && (
            <span>Username must be at least 2 characters long</span>
          )}
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
        <div>
          <label className="block mb-2 font-medium ">Confirm password</label>
          <input
            type="password"
            {...register("_confirmPassword", {
              validate: (value, formValues) => value === formValues.password,
            })}
            className="border rounded-lg block w-full p-2.5"
          />
          {errors._confirmPassword && <span>Passwords do not match</span>}
        </div>
        <button
          type="submit"
          className="w-full hover:bg-orange-900  rounded-lg px-5 py-2.5 text-center bg-orange-800 text-white"
        >
          Create an account
        </button>
        <p className="text-sm font">
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
