import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../shared/store/store";
import axios from "axios";
import { AiFillDelete, AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaPen, FaSave } from "react-icons/fa";
import { useMessageModal } from "../shared/ui/MessageModalContext";
import { useNavigate } from "react-router-dom";
import { ToggleSwitch } from "../shared/ui/ToggleSwitch";
import { Button } from "../shared/ui/button";
import { Card } from "../shared/ui/card";

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
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    status: "",
    location: "",
    preferred_job_type: "",
    external_links: [] as { url: string; label: string }[],
    bio: "",
    is_public: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [linkErrors, setLinkErrors] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE_URL = "http://localhost:5000";

  const labelOptions = [
    "LinkedIn",
    "GitHub",
    "Stack Overflow",
    "Dev.to",
    "Medium",
    "Behance",
    "Dribbble",
    "CodePen",
    "Notion",
    "Google Drive / PDF",
    "Other",
  ];

  // Fetch profile data on component mount
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/profiles/user/${user.id}`);
        setProfile(res.data);
        setFormData({
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          email: res.data.email || "",
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

    const updatedErrors = [...linkErrors];

    // נקבל את הערכים אחרי העדכון
    const currentLabel = updatedLinks[index].label;
    const currentUrl = updatedLinks[index].url;

    // נבצע ולידציה
    updatedErrors[index] = validateLink(currentLabel, currentUrl);

    setFormData((prev: any) => ({
      ...prev,
      external_links: updatedLinks,
    }));
    setLinkErrors(updatedErrors);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateLink = (label: string, url: string): string => {
    if (!url) return "";
    if (!isValidUrl(url)) return "כתובת לא תקינה";

    if (
      label !== "Other" &&
      labelUrlMatchers[label] &&
      !labelUrlMatchers[label](url)
    ) {
      return `כתובת ה-URL לא תואמת לתווית "${label}"`;
    }

    return "";
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

    if (linkErrors.some((err) => err)) {
      setError("אנא תקני את הקישורים הלא תקינים לפני שמירה.");
      setSaving(false);
      return;
    }

    if (linkErrors.some((err) => err)) {
      setError("אנא תקני את הקישורים הלא תקינים לפני שמירה.");
      return;
    }

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

  const onCancelEdit = () => {
    navigate("/my-profile");
  };

  const labelUrlMatchers: Record<string, (url: string) => boolean> = {
    LinkedIn: (url) => url.includes("linkedin.com"),
    GitHub: (url) => url.includes("github.com"),
    "Stack Overflow": (url) => url.includes("stackoverflow.com"),
    "Dev.to": (url) => url.includes("dev.to"),
    Medium: (url) => url.includes("medium.com"),
    Behance: (url) => url.includes("behance.net"),
    Dribbble: (url) => url.includes("dribbble.com"),
    CodePen: (url) => url.includes("codepen.io"),
    Notion: (url) => url.includes("notion.so"),
    "Google Drive / PDF": (url) =>
      url.includes("drive.google.com") || url.endsWith(".pdf"),
    Other: () => true,
  };

  // Loading states
  if (loading) return <p className="text-center mt-8">טוען פרופיל...</p>;
  if (!user) return <p className="text-center mt-8">אין משתמש מחובר</p>;
  if (error && !error.includes("קישורים")) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  // Disabled button logic to avoid empty URLs
  const isAddButtonDisabled = Object.values(formData.external_links).some(
    (link) => !(link as ExternalLink).url?.trim()
  );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-4">
          <span>ציבורי</span>
          <ToggleSwitch
            checked={formData.is_public}
            onToggle={() =>
              setFormData((prev: any) => ({
                ...prev,
                is_public: !prev.is_public,
              }))
            }
          />
          <span className="flex items-center">
            פרטי
            {!formData.is_public && (
              <span className="text-sm text-gray-500 ml-2">
                 (המידע הזה לא יפורסם בפרופילים.) 
              </span>
            )}
          </span>
        </div>

        <input
          type="text"
          name="first_name"
          placeholder="הקלד שם פרטי"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <input
          type="text"
          name="last_name"
          placeholder="הקלד שם משפחה"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <input
          type="email"
          name="email"
          placeholder="הקלד מייל"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-2"
        />
        <input
          type="string"
          name="phone"
          placeholder="הקלד טלפון"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-2"
        />
        <input
          type="string"
          name="location"
          placeholder="הקלד עיר"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-2"
        />
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
              <div key={index} className="p-6 shadow-md">
                {/* שדה כתובת URL כפי שהיה */}
                <input
                  type="text"
                  placeholder={`URL ${index + 1}`}
                  value={link.url || ""}
                  onChange={(e) =>
                    handleLinkChange(index, "url", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2 mb-2"
                />
                {linkErrors[index] && (
                  <p className="text-sm text-red-500 mb-1">
                    {linkErrors[index]}
                  </p>
                )}

                {/* select תווית */}
                <select
                  value={
                    labelOptions.includes(link.label) ? link.label : "Other"
                  }
                  onChange={(e) =>
                    handleLinkChange(index, "label", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2 mb-2"
                >
                  <option value="" disabled hidden>
                    תווית הקישור
                  </option>
                  {labelOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {/* אם נבחר "Other" - אפשר להקליד תווית חופשית */}
                {(!labelOptions.includes(link.label) ||
                  link.label === "Other") && (
                  <input
                    type="text"
                    placeholder="הקלד תווית"
                    value={labelOptions.includes(link.label) ? "" : link.label}
                    onChange={(e) =>
                      handleLinkChange(index, "label", e.target.value)
                    }
                    className="w-full border rounded px-3 py-2 mb-2"
                  />
                )}

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
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {/* כפתור שמירה */}
        <div className="flex gap-2 justify-start ltr">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark transition"
          >
            <AiOutlineSave className="w-5 h-5" />
            {saving ? "שומר..." : "שמור שינויים"}
          </button>
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-300 transition"
          >
            <AiOutlineClose className="w-5 h-5" />
            בטל
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
