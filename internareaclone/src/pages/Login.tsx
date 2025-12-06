import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { login } from "../Feature/Userslice";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate(); // (if using react-router)

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(
        login({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      // navigate? or redirect to home
      window.location.href = "/";
    } catch (err) {
      console.error("Login error: ", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={handleGoogleLogin} className="px-6 py-3 bg-blue-600 text-white rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
