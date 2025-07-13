import { pool } from "config/dbConnection";

export const getPublicProfileBySlug = async (slug: string) => {

    const userResult = await pool.query(
        "SELECT user_id FROM users WHERE slug = $1 LIMIT 1",
        [slug]
    );

    if (userResult.rowCount === 0) {
        throw new Error("User not found");
    }

    const userId = userResult.rows[0].user_id;

    const profilePromise = pool.query(
        "SELECT image_url, location, external_links, status, preferred_job_type FROM profiles WHERE user_id = $1 AND is_public = true",
        [userId]
    );

    const educationPromise = pool.query(
        "SELECT institution_name, type, title, field_of_study, start_date, end_date, description FROM education_entries WHERE user_id = $1 AND is_public = true",
        [userId]
    );

    const expertisePromise = pool.query(
        `SELECT category, name, level FROM "expertise-skills" WHERE user_id = $1 AND is_public = true`,
        [userId]
    );

    const personalProjectsPromise = pool.query(
        "SELECT title, description, demo_url, code_url, thumbnail_url, tags, status FROM personal_projects WHERE user_id = $1 AND is_public = true",
        [userId]
    );

    const workExperiencesPromise = pool.query(
        "SELECT company_name, position, description, start_date, end_date FROM work_experience WHERE user_id = $1 AND is_public = true",
        [userId]
    );

    const [profile, education, expertise, personalProjects, workExperiences] = await Promise.all([
        profilePromise,
        educationPromise,
        expertisePromise,
        personalProjectsPromise,
        workExperiencesPromise
    ]);

    return {
        ...(profile.rows[0] || {}),
        education: education.rows,
        expertise: expertise.rows,
        personal_projects: personalProjects.rows,
        work_experience: workExperiences.rows
    };
};
