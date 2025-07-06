const url =
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:5000";

async function login(email: string, password: string, rememberMe: boolean = false) {
  const res = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, rememberMe }),
  });
  if (!res.ok) throw new Error("שגיאה בהתחברות");
  const data = await res.json();
  return data.token; // או data.user, לפי מה שהשרת מחזיר
}
async function loginWithGoogle(credential: string) {
  const res = await fetch(`${url}/auth/google-auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // כדי לקבל עוגיות מהשרת
    body: JSON.stringify({
      payload: { credential }
    }),
  });
  if (!res.ok) throw new Error("שגיאה בהתחברות עם Google");
  return await res.json();
}
async function getProgress(token: string) {
  const res = await fetch(`${url}/progress`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("שגיאה בשליפת התקדמות");
  return await res.json();
}
async function getTips(token: string) {
  const res = await fetch(`${url}/tips`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("שגיאה בשליפת טיפים");
  return await res.json();
}

export { login, loginWithGoogle, getProgress, getTips };