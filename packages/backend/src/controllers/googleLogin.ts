import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { findUserByEmail } from '../reposioty/userGoogleRepository';

const client = new OAuth2Client();

export const loginWithGoogle = async (req: Request, res: Response) => {
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

    const user = await findUserByEmail(googleUser.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Login failed' });
  }
};
