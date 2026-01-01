import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", { // backend login endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Login muvaffaqiyatli
        localStorage.setItem("token", data.token); // token saqlash
        toast.success("✅ Login muvaffaqiyatli!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/"); // bosh sahifaga yo'naltirish
        }, 1500); // 1.5s kutib yo'naltirish, toast ko‘rinishi uchun
      } else {
        // ❌ Xato bo'lsa
        toast.error(data.message || "Login xatolik!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Server bilan bog'lanishda xato!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-8 rounded-2xl shadow-lg w-80 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-[#7F1D8A] text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#7F1D8A]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#7F1D8A]"
          required
        />

        <button
          type="submit"
          className="bg-[#7F1D8A] text-white py-2 rounded-full font-semibold hover:bg-purple-800 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Toast container */}
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
