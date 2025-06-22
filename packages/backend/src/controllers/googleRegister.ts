import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';
import { findUserByEmail, insertUser } from '../reposioty/userGoogleRepository';

const client = new OAuth2Client();

export const authWithGoogle = async (req: Request, res: Response) => {
  try {
    const { payload } = req.body;
    if (!payload?.credential) {
      return res.status(400).json({ message: 'Missing Google credential' });
    }

    const ticket = await client.verifyIdToken({
      idToken: payload.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const googleUser = ticket.getPayload();
    if (!googleUser?.email) {
      return res.status(400).json({ message: 'Invalid token or email not found' });
    }

    let user = await findUserByEmail(googleUser.email);

    if (!user) {
      user = await insertUser({
        id: uuidv4(),
        first_name: googleUser.given_name ?? '',
        last_name: googleUser.family_name ?? '',
        email: googleUser.email,
        phone: null,
        role: 'student',
        is_active: true,
        password: '',
        created_at: new Date(),
      });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error('Google Auth error:', err);
    return res.status(500).json({ message: 'Google authentication failed' });
  }
};