import { Request, Response } from 'express';
import { Users } from '../interfaces/entities/Users';
import userRepository from '../reposioty/userRepository'
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = async (req: Request, res: Response) => {
  const users : Users[] = await userRepository.getAllUsers();
  if (!users || users.length === 0) {
    return res.status(404).json({ message: 'No users found' });
  }
  console.log(users);
  
  res.json(users);
};

export const getUserById = async(req: Request, res: Response) => {
  const userId = req.params.id;
  const user: Users|null = await userRepository.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password } = req.body;
  
    const existing = await(await userRepository.getAllUsers()).find(user => user.email === email);
    if (existing) {
      return res.status(409).json({ message: 'אימייל כבר קיים' });
    }
  const newUser: Users = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    phone,
    password,
    role: 'student',
    createdAt: new Date(),
    isActive: true,
    answers: [],
    feedbacks: [],
    passwordResetTokens: [],
    sharedRecordings: []
  };
  
  const user: Users = await userRepository.createUser(newUser);
  res.status(201).json(user);
};
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userData: Partial<Users> = req.body;

  const updatedUser: Users | null = await userRepository.updateUser(userId, userData);
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(updatedUser);
};
export const deleteUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  
  userRepository.deleteUser(userId);
  
  res.status(204).send();
};