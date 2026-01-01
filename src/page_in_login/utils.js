export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload; // bu yerda back-end token ichida foydalanuvchi ma'lumotlari bo‘lishi kerak
  } catch (e) {
    return null;
  }
};
