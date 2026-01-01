// DrawerOffline.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const DrawerOffline = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "male",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Shu yerda backendga yuborish ham mumkin
    alert(`Offline kursga yozildingiz!\n\nFoydalanuvchi ma'lumotlari:\n${JSON.stringify(formData, null, 2)}`);
    onClose();
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-30 p-6 flex flex-col overflow-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-700">Offline Kursga Yozilish</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-xl">X</button>
      </div>

      <p className="text-gray-600 mb-4">
        Iltimos, quyidagi ma’lumotlarni to‘ldiring:
      </p>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="Ism"
            value={formData.firstName}
            onChange={handleChange}
            className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Familya"
            value={formData.lastName}
            onChange={handleChange}
            className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            name="age"
            placeholder="Yosh"
            value={formData.age}
            onChange={handleChange}
            className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="male">Erkak</option>
            <option value="female">Ayol</option>
          </select>
        </div>

        <input
          type="text"
          name="address"
          placeholder="Yashash joyi / Manzil"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Telefon raqami"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-600 transition"
        >
          Yozilish
        </button>
      </form>
    </motion.div>
  );
};

export default DrawerOffline;
