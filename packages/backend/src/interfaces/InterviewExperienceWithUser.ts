import { InterviewExperiences } from "./entities/InterviewExperiences";
import { Users } from "./entities/Users";

export type InterviewExperienceWithUser = InterviewExperiences & {
  user: Users;
};