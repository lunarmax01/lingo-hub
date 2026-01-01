import React, { useEffect, useState } from "react";
import { getUserFromToken } from "./utils";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getUserFromToken();
    setUser(u);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <h1 className="text-3xl font-bold text-[#7F1D8A] mb-4">Profil</h1>
      <p><strong>Ism:</strong> {user.firstName}</p>
      <p><strong>Familya:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Telefon:</strong> {user.phone}</p>
      <p><strong>O‘rganish statusi:</strong> {user.learningStatus}</p>
    </div>
  );
};

export default Profile;
