import { use } from 'react';
import { pool } from '../config/dbConnection';
import { Users } from "../interfaces/entities/Users";
import { getRepository } from 'typeorm';

const getColumnNamesFromUserEntity = (): string => {
  // const repository = getRepository(Users);
  // const columns = repository.metadata.columns;
  // return columns.map(column => column.databaseName) .join(', ');
  return 'id, first_name, last_name, email, password, phone, role, created_at, is_active ';
};

const getAllUsers = async (): Promise<Users[]> => {
  try {
    const res = await pool.query('SELECT * FROM users');
    return res.rows as Users[];
  } catch (error) {
    console.error("Error fetching users from local DB:", error);
    throw error;
  }
};

const getUserById = async (id: string): Promise<Users | null> => {
  try {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return (res.rows[0] as Users) || null;
  } catch (error) {
    console.error("Error fetching user by ID from local DB:", error);
    throw error;
  }
};

const updateUser = async (id: string, userData: Partial<Users>): Promise<Users | null> => {
  try {
    const res = await pool.query('UPDATE users SET $1 WHERE id = $2 RETURNING *', [userData, id]);
    return (res.rows[0] as Users) || null;
  } catch (error) {
    console.error("Error updating user in local DB:", error);
    throw error;
  }
};
const createUser = async (userData: Users): Promise<Users> => {
  try {
    // const columnNames = getColumnNamesFromUserEntity();
    // const placeholders = Object.keys(userData).map((_, index) => `$${index + 1}`).join(', ');
    // console.log("Column Names:", columnNames);
    // console.log("Placeholders:", placeholders);
    // console.log("User Data:", Object.values(userData));

    // const query = `INSERT INTO users (id, first_name, last_name, email, password, phone, role, created_at, is_active) 
    // VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

    const res = await pool.query(`INSERT INTO users (id, first_name, last_name, email, password, phone, role, created_at, is_active) 
    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [userData.id, userData.firstName, userData.lastName, userData.email, userData.password, userData.phone, userData.role, userData.createdAt, userData.isActive]);
    return (res.rows[0] as Users) || null;
  } catch (error) {
    console.error("Error creating user in local DB:", error);
    throw error;
  }
};

const deleteUser = async (id: string): Promise<void> => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  } catch (error) {
    console.error("Error deleting user from local DB:", error);
    throw error;
  }
};

export default { getAllUsers, getUserById, updateUser, createUser, deleteUser };
