// import { Request, Response } from 'express';
// import { Pool } from 'pg';
// import { OAuth2Client } from 'google-auth-library';

// const client = new OAuth2Client();

// export const registerUser = async (req: Request, res: Response) => {
//   const { payload } = req.body;

//   // 🔍 TEMP DEBUG LOG
//   console.log('Received payload:', payload);

//   if (!payload || !payload.credential) {
//     return res.status(400).json({ message: 'Missing Google credential' });
//   }

//   try {
//     console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
//     const ticket = await client.verifyIdToken({
//       idToken: payload.credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const googleUser = ticket.getPayload();
//     if (!googleUser) {
//       return res.status(400).json({ message: 'Invalid Google token' });
//     }

//     // Use fallback values to avoid TypeScript errors
//     const firstName = googleUser.given_name ?? '';
//     const lastName = googleUser.family_name ?? '';
//     const email = googleUser.email ?? '';

//     // Check if user already exists
//     const { data: existingUser } = await supabase
//       .from('users')
//       .select('*')
//       .eq('email', email)
//       .single();

//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists' });
//     }

//     // Insert new user
//     const { data: newUser, error: insertError } = await supabase
//       .from('users')
//       .insert([
//         {
//           id: crypto.randomUUID(),
//           firstName,
//           lastName,
//           email,
//           phone: '',
//           role: 'student',
//           isActive: true,
//           createdAt: new Date(),
//         },
//       ])
//       .select()
//       .single();

//     if (insertError) {
//       throw insertError;
//     }

//     return res.status(201).json({ user: newUser });
//   } catch (error) {
//     console.error('Registration error:', error);
//     return res.status(500).json({ message: 'Registration failed', error });
//   }
// };







import { Request, Response } from 'express';
import { pool } from '../config/dbConnection';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';

const client = new OAuth2Client();

export const registerUser = async (req: Request, res: Response) => {
  const { payload } = req.body;

  console.log('Received payload:', payload);

  if (!payload || !payload.credential) {
    return res.status(400).json({ message: 'Missing Google credential' });
  }

  try {
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: payload.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const googleUser = ticket.getPayload();
    if (!googleUser) {
      return res.status(400).json({ message: 'Invalid Google token' });
    }

    const firstName = googleUser.given_name ?? '';
    const lastName = googleUser.family_name ?? '';
    const email = googleUser.email ?? '';

    const existing = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const id = crypto.randomUUID();
    const phone = '';
    const role = 'student';
    const isActive = true;
    const password = '';
    const createdAt = new Date();

    const result = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, is_active, password, created_at)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
   RETURNING *`,
      [id, firstName, lastName, email, phone, role, isActive, password, createdAt]
    );

    return res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Registration failed' });
  }
};