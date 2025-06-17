import {pool} from "../config/dbConnection";

export const getUserByEmail = async (email: string) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1 LIMIT 1',
    [email]
  );
  return result.rows[0] || null;
};

export const updateUserPassword = async (userId: string, hashedPassword: string) => {
  await pool.query(
    'UPDATE users SET password = $1 WHERE id = $2',
    [hashedPassword, userId]
  );
};


// import {supabase} from "../config/dbConnection";

// export const getUserByEmail = async (email: string) => {
//   const { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("email", email)
//     .single();

//   if (error) throw error;
//   return data;
// };

// export const updateUserPassword = async (userId: string, hashedPassword: string) => {
//   const { error } = await supabase
//     .from("users")
//     .update({ password: hashedPassword })
//     .eq("id", userId);

//   if (error) throw error;
// };
