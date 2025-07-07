async function login(email: string, password: string) {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("שגיאה בהתחברות");
  const data = await res.json();
  return data.token;
}
async function getProgress(token: string) {
  const res = await fetch("/progress", {
    method: "GET",
    headers: {
    Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("שגיאה בשליפת התקדמות");
  return await res.json();
}
async function getTips(token: string) {
  const res = await fetch("/tips", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("שגיאה בשליפת טיפים");
  return await res.json();
}

export { login, getProgress, getTips };