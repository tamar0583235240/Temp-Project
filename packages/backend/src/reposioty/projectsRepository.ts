import { pool } from '../config/dbConnection';
import { PersonalProjects } from '../interfaces/entities/PersonalProjects';

export const getProjects = async (userId: string): Promise<PersonalProjects[]> => {
    try {
        const result = await pool.query(
            'SELECT * FROM personal_projects WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return result.rows as PersonalProjects[];
    } catch (error) {
        console.error('Error fetching personal_projects from PostgreSQL:', error);
        throw error;
    }
};

export const getProjectById = async (id: string): Promise<PersonalProjects | null> => {
    try {
        const result = await pool.query('SELECT * FROM personal_projects WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error fetching project by ID from PostgreSQL:', error);
        throw error;
    }
};

export const createProject = async (project: {
    user_id: string;
    title: string;
    description: string;
    demo_url?: string;
    code_url?: string;
    thumbnail?: string;
    is_public: boolean;
}): Promise<PersonalProjects> => {
    try {
        const query = `
      INSERT INTO personal_projects 
        (user_id, title, description, demo_url, code_url, thumbnail, is_public, created_at, updated_at)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING *;
    `;
        const values = [
            project.user_id,
            project.title,
            project.description,
            project.demo_url || null,
            project.code_url || null,
            project.thumbnail || null,
            project.is_public,
        ];
        const result = await pool.query(query, values);
        return result.rows[0] as PersonalProjects;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const updateProject = async (
    id: string,
    project: {
        title?: string;
        description?: string;
        demo_url?: string;
        code_url?: string;
        thumbnail?: string;
        is_public?: boolean;
    }
): Promise<PersonalProjects> => {
    try {
        const existingProject = await getProjectById(id);
        if (!existingProject) throw new Error("Project not found");

        const updatedTitle = project.title ?? existingProject.title;
        const updatedDescription = project.description ?? existingProject.description;
        const updatedDemoUrl = project.demo_url ?? existingProject.demoUrl;
        const updatedCodeUrl = project.code_url ?? existingProject.codeUrl;
        const updatedThumbnail = project.thumbnail ?? existingProject.thumbnailUrl;
        const updatedIsPublic = project.is_public ?? existingProject.isPublic;

        const query = `
      UPDATE projects
      SET title = $1,
          description = $2,
          demo_url = $3,
          code_url = $4,
          thumbnail = $5,
          is_public = $6,
          updated_at = NOW()
      WHERE id = $7
      RETURNING *;
    `;

        const values = [
            updatedTitle,
            updatedDescription,
            updatedDemoUrl,
            updatedCodeUrl,
            updatedThumbnail,
            updatedIsPublic,
            id,
        ];

        const result = await pool.query(query, values);
        return result.rows[0] as PersonalProjects;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

export const deleteProject = async (id: string): Promise<void> => {
    try {
        await pool.query('DELETE FROM personal_projects WHERE id = $1', [id]);
    } catch (error) {
        console.error("Error deleting project by ID:", error);
        throw error;
    }
};
