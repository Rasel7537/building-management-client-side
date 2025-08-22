
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UseAuth from "../../../hooks/UseAuth";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const { createUser, updateUserProfile } = UseAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      // 1. Firebase user create
      const result = await createUser(email, password);
      const loggedUser = result.user;
      console.log("Firebase user created:", loggedUser);

      // 2. Firebase profile update
      const userProfile = {
        displayName: name,
        photoURL: profilePic || "https://i.ibb.co/2nqZQFz/default-avatar.png",
      };
      await updateUserProfile(userProfile);
      console.log("Firebase profile updated ✅");

      // 3. Backend এ save user info
      const newUser = {
        name: name,
        email: email,
        photoURL: profilePic || "https://i.ibb.co/2nqZQFz/default-avatar.png",
        role: "user",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      const userRes = await axiosInstance.post("/users", newUser);
      console.log("User saved in DB:", userRes.data);

      toast.success("Registration successful!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error("Registration failed: " + err.message);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.url);
      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Name"
            className="input input-bordered w-full"
          />
          {/* Email */}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="input input-bordered w-full"
          />
          {/* Profile Picture */}
          <input
            type="file"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {/* Password */}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
