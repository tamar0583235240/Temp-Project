import { pool } from '../config/dbConnection'; 
import { ReminderInterface } from '../interfaces/reminderInterfaces';

const getAllReminders = async (): Promise<ReminderInterface[]> => {
  try {
    const query = `
      SELECT exampleField1, exampleField2, exampleField3
      FROM examples
    `;

    const result = await pool.query(query);
    return result.rows as ReminderInterface[];

  } catch (error) {
    console.error("Error fetching examples from PostgreSQL:", error);
    throw error;
  }
};

export default { getAllReminders };
