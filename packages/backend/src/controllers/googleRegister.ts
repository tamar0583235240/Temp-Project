// import { Request, Response } from 'express';
// import { OAuth2Client } from 'google-auth-library';
// // import { supabase } from '../config/dbConnection';
// import { supabase } from '../config/fakeSupabase'; // using fake DB

// const client = new OAuth2Client();

// export const registerWithGoogle = async (req: Request, res: Response) => {
//     try {
//         const { payload } = req.body;

//         if (!payload || !payload.credential) {
//             return res.status(400).json({ message: 'Missing Google credential' });
//         }

//         const ticket = await client.verifyIdToken({
//             idToken: payload.credential,
//             audience: process.env.GOOGLE_CLIENT_ID,
//         });

//         const googleUser = ticket.getPayload();
//         if (!googleUser) {
//             return res.status(400).json({ message: 'Invalid Google token' });
//         }

//         const firstName = googleUser.given_name ?? '';
//         const lastName = googleUser.family_name ?? '';
//         const email = googleUser.email ?? '';

//         const { data: existingUser } = await supabase
//             .from('users')
//             .select('*')
//             .eq('email', email)
//             .single();

//         if (existingUser) {
//             return res.status(409).json({ message: 'User already exists. Please login instead.' });
//         }

//         const { data: newUser, error } = await supabase
//             .from('users')
//             .insert([
//                 {
//                     id: crypto.randomUUID(),
//                     firstName,
//                     lastName,
//                     email,
//                     phone: '',
//                     role: 'student',
//                     isActive: true,
//                     createdAt: new Date(),
//                 },
//             ])
//             .select()
//             .single();

//         if (error) {
//             return res.status(500).json({ message: 'Error registering user', error });
//         }

//         return res.status(201).json({ user: newUser });
//     } catch (err) {
//         console.error('Register error:', err);
//         return res.status(500).json({ message: 'Registration failed' });
//     }
// };







import { Request, Response } from 'express';
import { pool } from '../config/dbConnection';
import { OAuth2Client } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';

const client = new OAuth2Client();

export const registerWithGoogle = async (req: Request, res: Response) => {
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

         const id = uuidv4();
        const first_name = googleUser.given_name ?? '';
        const last_name = googleUser.family_name ?? '';
        const email = googleUser.email;
        const phone = null;
        const role = 'student';
        const password = '';
        const created_at = new Date();
        const is_active = true;

        // בדיקת קיום מראש
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'User already exists. Please login.' });
        }

        // יצירת משתמש חדש
        const result = await pool.query(
            `INSERT INTO users (id, first_name, last_name, email, phone, role, is_active, password, created_at)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
   RETURNING *`,
            [id, first_name, last_name, email, phone, role, is_active, password, created_at]
        );

        const newUser = result.rows[0];

        return res.status(201).json({ user: newUser });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ message: 'Registration failed' });
    }
};
