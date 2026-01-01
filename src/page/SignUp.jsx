import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    repassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error");

      // ✅ Success toast
      toast.success("🎉 Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        repassword: ""
      });

    } catch (err) {
      // ❌ Error toast
      toast.error(err.message || "Something went wrong", {
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
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-[400px] flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#7F1D8A]">
          Create account
        </h2>

        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />
        <input
          name="repassword"
          type="password"
          placeholder="Confirm Password"
          value={form.repassword}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />

        <button
          disabled={loading}
          className="bg-[#7F1D8A] text-white py-2 rounded-full hover:bg-purple-800 transition"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Toast container */}
        <ToastContainer />
      </form>
    </div>
  );
};

export default SignUp;
