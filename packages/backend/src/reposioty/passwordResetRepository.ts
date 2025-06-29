import {pool} from "../config/dbConnection";

export const createToken = async (userId: string, token: string, expiresAt: Date) => {
  await pool.query(
    'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
    [userId, token, expiresAt]
  );
};

export const getToken = async (token: string) => {
  const result = await pool.query(
    'SELECT * FROM password_reset_tokens WHERE token = $1 LIMIT 1',
    [token]
  );
  return result.rows[0] || null;
};

export const deleteToken = async (token: string) => {
  await pool.query(
    'DELETE FROM password_reset_tokens WHERE token = $1',
    [token]
  );
};


// import {supabase} from "../config/dbConnection";

// export const createToken = async (userId: string, token: string, expiresAt: Date) => {
//   const { error } = await supabase.from("password_reset_tokens").insert({
//     user_id: userId,
//     token,
//     expires_at: expiresAt.toISOString(),
//   });

//   if (error) throw error;
// };

// export const getToken = async (token: string) => {
//   const { data, error } = await supabase
//     .from("password_reset_tokens")
//     .select("*")
//     .eq("token", token)
//     .single();

//   if (error) return null; // או לזרוק שגיאה לפי החלטתך
//   return data;
// };

// export const deleteToken = async (token: string) => {
//   const { error } = await supabase.from("password_reset_tokens").delete().eq("token", token);
//   if (error) throw error;
// };
