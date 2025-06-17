// import { Request, Response } from 'express';
// import { supabase } from '../config/fakeSupabase';
// // import { supabase } from '../config/dbConnection';

// export const loginWithGoogle = async (req: Request, res: Response) => {
//   try {
//     const { payload } = req.body;
//     const { email } = payload;

//     const { data: user, error } = await supabase
//       .from('users')
//       .select('*')
//       .eq('email', email)
//       .single();

//     if (error || !user) {
//       return res.status(401).json({ message: 'User not found. Please register first.' });
//     }

//     return res.status(200).json({ user });
//   } catch (err) {
//     console.error('Login error:', err);
//     return res.status(500).json({ message: 'Login failed' });
//   }
// };




import { Request, Response } from 'express';
import { pool } from '../config/dbConnection';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();

export const loginWithGoogle = async (req: Request, res: Response) => {
  try {
    const { payload } = req.body;
    if (!payload || !payload.credential) {
      return res.status(400).json({ message: 'Missing Google credential' });
    }

    const ticket = await client.verifyIdToken({
      idToken: payload.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const googleUser = ticket.getPayload();

    if (!googleUser || !googleUser.email) {
      return res.status(400).json({ message: 'Invalid token or email not found' });
    }

    const email = googleUser.email;

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    return res.status(200).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Login failed' });
  }
};
