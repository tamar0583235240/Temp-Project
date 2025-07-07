import React from "react";
import { useGetPersonalProjectsQuery } from "../../../shared/api/projectApi";

interface Props {
  userId: string;
}

const ProjectsList: React.FC<Props> = ({ userId }) => {
  const { data: projects, error, isLoading } = useGetPersonalProjectsQuery(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  return (
    <div>
      <h2>Projects for user {userId}</h2>
      {projects && projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {/* הוסף עוד שדות לפי הצורך */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found</p>
      )}
    </div>
  );
};

export default ProjectsList;
