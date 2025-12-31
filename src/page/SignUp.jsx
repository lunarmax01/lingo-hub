import { useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccess("Account created successfully 🎉");
      setForm({ name: "", email: "", password: "" });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-[350px] flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#7F1D8A]">
          Create account
        </h2>

        <input
          name="name"
          placeholder="Full name"
          value={form.name}
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

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          disabled={loading}
          className="bg-[#7F1D8A] text-white py-2 rounded-full hover:bg-purple-800 transition"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
