import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

// Firebase
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "react-toastify";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectuser } from "@/Feature/Userslice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectuser);

  // LOGIN — store Google data in Redux
  const handlelogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const u = result.user;

      dispatch(
        login({
          name: u.displayName,
          email: u.email,
          photo: u.photoURL,
        })
      );

      toast.success("Logged in successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  // LOGOUT — clears Redux user
  const handlelogout = () => {
    signOut(auth);
    dispatch(logout());
    toast.info("Logged out");
  };

  return (
    <div className="relative">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            {/* 🔵 LOGO — using your real asset */}
            <div className="flex-shrink-0 cursor-pointer">
              <Link href="/">
                <img
                  src="/assets/logo.png"   // <-- Your logo from public/assets
                  alt="Intern Area"
                  className="h-14 w-auto"
                />
              </Link>
            </div>

            {/* 🔵 NAVIGATION LINKS */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/internship"
                className="text-gray-700 hover:text-blue-600"
              >
                Internships
              </Link>

              <Link
                href="/job"
                className="text-gray-700 hover:text-blue-600"
              >
                Jobs
              </Link>

              {/* Search Bar */}
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  className="ml-2 bg-transparent focus:outline-none text-sm w-48"
                />
              </div>
            </div>

            {/* 🔵 AUTH BUTTONS */}
            <div className="flex items-center space-x-4">
              {user ? (
                // If user logged in
                <div className="flex items-center space-x-4">
                  <Link href="/profile">
                    <img
                      src={user.photo}
                      alt="User"
                      className="w-9 h-9 rounded-full border"
                    />
                  </Link>

                  <button
                    onClick={handlelogout}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // USER NOT LOGGED IN
                <>
                  <button
                    onClick={handlelogin}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center space-x-2 hover:bg-gray-50"
                  >
                    {/* Google Icon */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>

                    <span className="text-gray-700">Continue with Google</span>
                  </button>

                  <Link href="/adminlogin" className="text-gray-600 hover:text-gray-800">
                    Admin
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
