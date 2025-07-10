import React, { useState } from "react";
import { cn } from "../../../shared/utils/cn";
import { Button } from "../../../shared/ui/button";
import { ToggleSwitch } from "../../../shared/ui/ToggleSwitch";
import { SpinnerSmall } from "../../../shared/ui/spiner";
import {
  useGetEducationEntriesQuery,
  useUpdateEducationEntryMutation,
  useDeleteEducationEntryMutation,
} from "../../../shared/api/educationApi";

interface EducationEntry {
  id: string;
  institutionName: string;
  degree?: string;
  startDate: string;
  endDate?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  userId: string;
  profileUrl?: string;
}

const EducationExperienceTab: React.FC<Props> = ({ userId, profileUrl }) => {
  const {
    data: entries = [],
    isLoading,
    isError,
    refetch,
  } = useGetEducationEntriesQuery(userId);

  const [updateEntry] = useUpdateEducationEntryMutation();
  const [deleteEntry] = useDeleteEducationEntryMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<EducationEntry>>({});
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = (entry: EducationEntry) => {
    setEditingId(entry.id);
    setFormData(entry);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleChange = (field: keyof EducationEntry, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setIsSaving(true);
    try {
      await updateEntry({ id: editingId, ...formData }).unwrap();
      setEditingId(null);
      setFormData({});
      refetch();
    } catch (e) {
      alert("שגיאה בשמירת הנתונים");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("האם את בטוחה שברצונך למחוק פריט זה?")) return;
    try {
      await deleteEntry(id).unwrap();
      refetch();
    } catch {
      alert("שגיאה במחיקה");
    }
  };

  const toggleIsPublic = async (entry: EducationEntry) => {
    try {
      await updateEntry({ ...entry, isPublic: !entry.isPublic }).unwrap();
      refetch();
    } catch {
      alert("שגיאה בעדכון הפרטיות");
    }
  };

  if (isLoading) return <SpinnerSmall />;

  if (isError) return <div className="text-danger">אירעה שגיאה בטעינת הנתונים</div>;
 

  return (  
   
    <div className="space-y-6 max-w-3xl mx-auto p-4">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-text-main">השכלה וניסיון לימודי</h2>
        <Button
          variant="outline"
          onClick={() => {
            if (profileUrl) {
              navigator.clipboard.writeText(profileUrl);
              alert("הקישור לפרופיל הועתק ללוח!");
            }
          }}
          aria-label="העתק קישור לפרופיל שלי"
        >
          העתק קישור לפרופיל שלי
        </Button>
      </div>

      {entries.length === 0 && (
        <p className="text-text-secondary italic">עדיין לא נוספו פריטים</p>
      )}

      {entries.map((entry: EducationEntry) => {
        const isEditing = editingId === entry.id;

        return (
          <div
            key={entry.id}
            className={cn(
              "border border-border rounded-lg p-4 relative",
              !entry.isPublic && "bg-muted"
            )}
          >
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">מוסד לימוד</label>
                  <input
                    type="text"
                    value={formData.institutionName || ""}
                    onChange={(e) => handleChange("institutionName", e.target.value)}
                    className="w-full border border-border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">תואר / תעודה</label>
                  <input
                    type="text"
                    value={formData.degree || ""}
                    onChange={(e) => handleChange("degree", e.target.value)}
                    className="w-full border border-border rounded px-3 py-2"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-text-main mb-1">מתאריך</label>
                    <input
                      type="date"
                      value={formData.startDate ? formData.startDate.slice(0, 10) : ""}
                      onChange={(e) => handleChange("startDate", e.target.value)}
                      className="w-full border border-border rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-text-main mb-1">עד תאריך</label>
                    <input
                      type="date"
                      value={formData.endDate ? formData.endDate.slice(0, 10) : ""}
                      onChange={(e) => handleChange("endDate", e.target.value)}
                      className="w-full border border-border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ToggleSwitch
                    checked={formData.isPublic ?? false}
                    onToggle={() => handleChange("isPublic", !(formData.isPublic ?? false))}
                    label={formData.isPublic ? "מוצג בפרופיל הציבורי" : "פרטי - לא מוצג בפרופיל הציבורי"}
                  />
                </div>
                <div className="flex gap-4 justify-end">
                  <Button variant="outline" onClick={cancelEdit} disabled={isSaving}>
                    ביטול
                  </Button>
                  <Button onClick={saveEdit} disabled={isSaving}>
                    {isSaving ? "שומר..." : "שמור"}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-text-main">
                    {entry.institutionName} {entry.degree ? `- ${entry.degree}` : ""}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(entry)}
                    aria-label={`ערוך ${entry.institutionName}`}
                  >
                    ערוך
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-text-secondary text-sm">
                    {entry.startDate.slice(0, 10)} - {entry.endDate ? entry.endDate.slice(0, 10) : "היום"}
                  </div>
                  <ToggleSwitch
                    checked={entry.isPublic}
                    onToggle={() => toggleIsPublic(entry)}
                    label={entry.isPublic ? "מוצג בפרופיל הציבורי" : "פרטי - לא מוצג בפרופיל הציבורי"}
                  />
                </div>
                {!entry.isPublic && (
                  <p className="text-sm italic text-text-secondary mt-2">* פרטי - לא יוצג בפרופיל הציבורי</p>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(entry.id)}
                  className="mt-4"
                  aria-label={`מחק ${entry.institutionName}`}
                >
                  מחק פריט
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EducationExperienceTab;
