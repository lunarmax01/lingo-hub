// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", { // backend login endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Login muvaffaqiyatli
        localStorage.setItem("token", data.token); // agar token qaytsa
        alert("Login muvaffaqiyatli!");
        navigate("/"); // bosh sahifaga yo'naltirish
      } else {
        // Xato bo'lsa
        alert(data.message || "Login xatolik!");
      }
    } catch (error) {
      console.error(error);
      alert("Server bilan bog'lanishda xato!");
    }

    setLoading(false);
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
      </form>
    </div>
  );
};

export default Login;
