import { useSelector } from "react-redux";
import { useGetProfilesQuery } from "../services/profileApi";
import {
  FaUserCircle,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import { RootState } from "../../../shared/store/store";
import { Profile } from "../types/profileTypes";

const getIconForLink = (url: string) => {
  if (url.includes("github.com")) return <FaGithub />;
  if (url.includes("linkedin.com")) return <FaLinkedin />;
  if (url.startsWith("http")) return <FaGlobe />;
  return <FaExternalLinkAlt />;
};

const ProfileList = () => {
  // הקריאה ל-useSelector חייבת להיות בתוך הקומפוננטה
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "manager";

  const { data: profiles, error, isLoading } = useGetProfilesQuery();

  const getFullName = (profile: Profile) =>
  `${profile.first_name} ${profile.last_name}`;


  if (isLoading) return <div>טוען פרופילים...</div>;
  if (error) {
    console.error("Profiles query error:", error);
    return <div>שגיאה בטעינת פרופילים</div>;
  }
  if (!profiles || profiles.length === 0) return <div>לא נמצאו פרופילים</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {profiles.filter((profile) => profile.is_public || isAdmin).length > 0
        ? profiles
            .filter((profile) => profile.is_public || isAdmin)
            .map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
              >
                {profile.image_url ? (
                  <img
                    src={profile.image_url}
                    alt={getFullName(profile)}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                ) : (
                  <FaUserCircle className="w-24 h-24 text-gray-300 mb-4" />
                )}

                <h2 className="text-xl font-semibold mb-1">
                  {getFullName(profile)}
                </h2>
                <p className="text-sm text-gray-500">{profile.location}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Status:</span> {profile.status}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Job Type:</span>{" "}
                  {profile.preferred_job_type}
                </p>

                {Array.isArray(profile.external_links) &&
                  profile.external_links.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                      {profile.external_links.map((link, i) => {
                        const url = typeof link === "string" ? link : link.url;
                        const label =
                          typeof link === "string" ? link : link.label || url;
                        return (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-primary hover:text-primary/80 transition ltr"
                          >
                            {getIconForLink(url)}
                            <span>{label}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
              </div>
            ))
        : !isAdmin && (
            <div className="col-span-full text-center text-gray-500 mt-8">
              לא נמצאו משתמשים ציבוריים.
            </div>
          )}
    </div>
  );
};

export default ProfileList;
