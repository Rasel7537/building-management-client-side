import { NavLink, useNavigate } from "react-router-dom"; // ✅ useNavigate added
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import SocialLogin from "../socilaLogin/SocialLogin";
// ✅ Toast import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ✅ Firebase imports
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../../firebase/firebase.init";

const auth = getAuth(app);

const Login = () => {
  const navigate = useNavigate(); // ✅ for redirect after login

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Updated login logic with Firebase
  const onSubmit = (data) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("User logged in:", result.user);
        toast.success("Login Successful!", {
          position: "top-center",
        });

        // ✅ Redirect user after short delay
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Login Failed! Please check your credentials.", {
          position: "top-center",
        });
      });
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-2xl">
      <h2 className="text-4xl font-bold text-center text-black-700 mb-6">
        Welcome Back 👋
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <FaEnvelope />
            </span>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <FaLock />
            </span>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
              className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full text-white">
            Login
          </button>
        </div>
      </form>

      <SocialLogin />

      {/* Register Link */}
      <p className="text-sm text-center mt-4 text-gray-600">
        New here?{" "}
        <NavLink
          to="/register"
          className="text-blue-600 font-medium hover:underline"
        >
          Register now
        </NavLink>
      </p>

      {/* ✅ Toast container for showing notifications */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
