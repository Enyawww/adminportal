"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { FiAlertTriangle, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";

const LoginForm = () => {
  const router = useRouter(); // Initialize the router
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    // Make a POST request to the login API
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        setSuccess("Login successful");

        // Save the username in localStorage to maintain session state
        localStorage.setItem("username", username);
        localStorage.setItem("isAuthenticated", "true");

        setTimeout(() => {
          router.push("/MainPage");
        }, 2500);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
      <div className="w-full h-screen flex justify-center items-center bg-black bg-opacity-25">
        <aside className="bg-white w-full max-w-md rounded-xl bg-opacity-20 shadow-lg shadow-black">
          <h1 className="text-center text-white font-bold shadow-lg text-4xl bg-opacity-60 rounded-t-xl m-0 pt-10 pb-8 ">
            SAC Admin Portal
          </h1>
          <form className="p-10" onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="py-2 px-3 w-full text-black text-lg font-light outline-none rounded-lg"
            />
            <div className="relative mt-3">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="py-2 px-3 w-full text-black text-lg font-light outline-none rounded-lg pr-10"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            {error && (
              <p className="text-red-400 text-center mt-5">
                <>
                  <div className="flex items-center gap-3 justify-center shadow-lg mt-8 p-2 bg-red-600 bg-opacity-20 rounded-lg animate-bounce">
                    <FiAlertTriangle className="animate-pulse" /> {error}
                  </div>                  
                </>
                
              </p>
            )}
            {success && (
              <p className="text-green-400 text-center mt-5">
                <>
                  <div className="flex items-center gap-2 justify-center shadow-lg mt-8 p-2 bg-green-600 bg-opacity-20 rounded-lg animate-bounce">
                    <FiLoader className="animate-spin"/> {success}
                  </div>                  
                </>
              </p>
            )}
            <div className="text-center mt-10 items-center">
              <button
                type="submit"
                className="bg-black text-lightPurple font-medium py-2 px-8 rounded-lg transition hover:text-white"
              >
                Login
              </button>
            </div>
          </form>
        </aside>
      </div>
    </main>
  );
};

export default LoginForm;
