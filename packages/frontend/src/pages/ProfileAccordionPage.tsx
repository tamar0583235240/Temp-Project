import { FaPen } from "react-icons/fa";
import { Accordion } from "../shared/ui/Accordion";
import EditProfilePage from "./my-profile";

const ProfileAccordionPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        <FaPen className="inline mr-2" /> עריכת פרופיל
      </h1>

      <Accordion title="פרטים כלליים">
        <EditProfilePage />
      </Accordion>

      {/* דוגמא, צריך להוריד */}
      <Accordion title="פרטים נוספים">
        <p>פרטים נוספים על המשתמש</p>
      </Accordion>
    </div>
  );
};

export default ProfileAccordionPage;
