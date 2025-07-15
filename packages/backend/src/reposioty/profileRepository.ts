import { pool } from "../config/dbConnection";

// Get all profiles
export const getAllProfiles = async () => {
  const result = await pool.query(
    "SELECT * FROM profiles ORDER BY created_at DESC"
  );
  return result.rows;
};

// Get profile by its own ID (UUID)
export const getProfileById = async (id: string) => {
  const result = await pool.query("SELECT * FROM profiles WHERE id = $1", [id]);
  return result.rows[0] || null;
};

type ExternalLink = {
  url: string;
  label: string;
};

export const updateProfileById = async (id: string, data: any) => {
  const { image_url, location, external_links, status, preferred_job_type, is_public } =
    data;

  // Ensure external_links is always an array, even if empty
  const updatedExternalLinks = Array.isArray(external_links)
    ? external_links
        .filter((link: { url: string; label: string }) => link.url?.trim())
        .map((link: { url: string; label: string }) => ({
          url: link.url.trim(),
          label: link.label.trim(),
        }))
    : [];

  // Safely serialize the external_links array
  const serializedExternalLinks = JSON.stringify(updatedExternalLinks);

  // Retrieve the profile from the database
  const profile = await findProfileByUserId(id);
  if (!profile) {
    throw new Error("Profile not found.");
  }

  // Debug to make sure the profile contains the expected data
  try {
    // Update query with parameters, excluding full_name
    const result = await pool.query(
      `
      UPDATE profiles
      SET
        image_url = $1,
        location = $2,
        external_links = $3,
        status = $4,
        preferred_job_type = $5,
        updated_at = CURRENT_TIMESTAMP,
        is_public = $6
      WHERE id = $7
      RETURNING *;
      `,
      [
        image_url,
        location,
        serializedExternalLinks,
        status,
        preferred_job_type,
        is_public,
        profile.id,
      ]
    );

    return result.rows[0] || null;
  } catch (err) {
    console.error("Error during the update:", err);
    throw new Error("Failed to update profile.");
  }
};

// ✅ Get profile by user_id (not profile id)
export const findProfileByUserId = async (userId: string) => {
  const result = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [
    userId,
  ]);
  return result.rows[0] || null;
};

// (Optional) Create a profile for a user — useful if you want to do this later manually
export const createProfile = async (userId: string, data: any) => {
  const {
    full_name,
    image_url,
    location,
    external_links,
    status,
    preferred_job_type,
    is_public,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO profiles (
      user_id,
      full_name,
      image_url,
      location,
      external_links,
      status,
      preferred_job_type,
      is_public
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `,
    [
      userId,
      full_name,
      image_url,
      location,
      JSON.stringify(external_links || {}),
      status,
      preferred_job_type,
      is_public,
    ]
  );

  return result.rows[0];
};
