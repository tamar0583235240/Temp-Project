import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../shared/store/store";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaPen } from "react-icons/fa";
import { useMessageModal } from "../shared/ui/MessageModalContext";
import { useNavigate } from "react-router-dom";
import { ToggleSwitch } from "../shared/ui/ToggleSwitch";

// Type for external links
interface ExternalLink {
  url: string;
  label: string;
}

const EditProfilePage = () => {
  const navigate = useNavigate();

  const { showMessage, hideMessage } = useMessageModal();

  const user = useSelector((state: RootState) => state.auth.user);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    status: "",
    preferred_job_type: "",
    external_links: [] as { url: string; label: string }[],
    bio: "",
    is_public: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:5000";

  // Fetch profile data on component mount
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/profiles/user/${user.id}`);
        setProfile(res.data);
        setFormData({
          status: res.data.status || "",
          preferred_job_type: res.data.preferred_job_type || "",
          external_links: Array.isArray(res.data.external_links)
            ? res.data.external_links
            : [],
          bio: res.data.bio || "",
          is_public: res.data.is_public ?? false,
        });
      } catch (err) {
        setError("שגיאה בטעינת הפרופיל.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes for external links
  const handleLinkChange = (
    index: number,
    field: "url" | "label",
    value: string
  ) => {
    const updatedLinks = [...formData.external_links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value.trim(),
    };
    setFormData((prev: any) => ({
      ...prev,
      external_links: updatedLinks,
    }));
  };

  // Handle adding a new link
  const handleAddLink = () => {
    const emptyLink = formData.external_links.some(
      (link: ExternalLink) => !link.url?.trim()
    );
    if (emptyLink) return;

    setFormData((prev: any) => ({
      ...prev,
      external_links: [...prev.external_links, { url: "", label: "" }],
    }));
  };

  // Remove a link
  const handleRemoveLink = (index: number) => {
    const updatedLinks = formData.external_links.filter(
      (_: any, i: number) => i !== index
    );
    setFormData((prev: any) => ({
      ...prev,
      external_links: updatedLinks,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("אין משתמש מחובר.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await axios.put(`${API_BASE_URL}/profiles/user/${user.id}`, formData);
      showMessage("", "הפרופיל עודכן בהצלחה");
      setTimeout(() => {
        hideMessage();
      }, 2000);
      navigate("/my-profile");
    } catch (err) {
      console.error("Update error:", err);
      setError("שגיאה בעדכון הפרופיל.");
    } finally {
      setSaving(false);
    }
  };

  // Loading states
  if (loading) return <p className="text-center mt-8">טוען פרופיל...</p>;
  if (!user) return <p className="text-center mt-8">אין משתמש מחובר</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  // Disabled button logic to avoid empty URLs
  const isAddButtonDisabled = Object.values(formData.external_links).some(
    (link) => !(link as ExternalLink).url?.trim()
  );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        <FaPen className="inline mr-2" /> עריכת פרופיל
      </h1>
      <div>
        <ToggleSwitch
          checked={formData.is_public}
          onToggle={() =>
            setFormData((prev: any) => ({
              ...prev,
              is_public: !prev.is_public,
            }))
          }
          label="האם הפרופיל ציבורי?"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* סטטוס */}
        <div>
          <label className="block mb-1 font-medium">סטטוס</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">בחר סטטוס</option>
            <option value="Available">פתוחה להצעות</option>
            <option value="Not Available">לא מחפשת כרגע</option>
            <option value="working">עובדת כרגע</option>
          </select>
        </div>

        {/* סוג משרה מועדף */}
        <div>
          <label className="block mb-1 font-medium">סוג משרה מועדף</label>
          <select
            name="preferred_job_type"
            value={formData.preferred_job_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Full-time">משרה מלאה</option>
            <option value="Part-time">משרה חלקית</option>
            <option value="Freelance">פרילנס</option>
            <option value="Internship">התמחות</option>
            <option value="Any">כל האפשרויות</option>
          </select>
        </div>

        {/* קישורים חיצוניים */}
        <div>
          <label className="block mb-1 font-medium">קישורים חיצוניים</label>
          {formData.external_links.map(
            (link: { url: string; label: string }, index: number) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  placeholder={`URL ${index}`}
                  value={link.url || ""}
                  onChange={(e) =>
                    handleLinkChange(index, "url", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2 mb-2"
                />
                <input
                  type="text"
                  placeholder={`Label ${index}`}
                  value={link.label || ""}
                  onChange={(e) =>
                    handleLinkChange(index, "label", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2 mb-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="text-red-500 text-sm"
                >
                  <AiFillDelete />
                </button>
              </div>
            )
          )}
          <button
            type="button"
            onClick={handleAddLink}
            disabled={isAddButtonDisabled}
            className="text-primary text-sm"
          >
            הוסף קישור חדש
          </button>
        </div>

        {/* כפתור שמירה */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
        >
          {saving ? "שומר..." : "שמור שינויים"}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
