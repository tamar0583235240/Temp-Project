import * as React from "react";
import { EditableListItem } from "../../../shared/ui/EditableListItem";
import { Heading2 } from "../../../shared/ui/typography";
import { Input } from "../../../shared/ui/input";
import {
  useGetWorkExperiencesQuery,
  useCreateWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
} from "../../profile/services/workExperienceApi";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { IconButton } from "../../../shared/ui/IconButon";
export interface WorkExperienceItem {
  id: string;
  companyName: string;
  position: string;
  description?: string;
  startDate: string;
  endDate?: string;
  is_public: boolean;  // שונה מ-isPublic ל-is_public
}

export const WorkExperienceTab = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  console.log("Redux userId:", userId);

  const {
    data = [],
    refetch,
    error,
    isLoading,
  } = useGetWorkExperiencesQuery(userId!, {
    skip: !userId,
  });

  console.log("WorkExperience data:", data);
  if (error) {
    console.error("Error fetching work experiences:", error);
  }
  console.log("isLoading:", isLoading);

  const [create] = useCreateWorkExperienceMutation();
  const [update] = useUpdateWorkExperienceMutation();
  const [remove] = useDeleteWorkExperienceMutation();

  const [editingId, setEditingId] = React.useState<string | null>(null);

  if (!userId) {
    console.warn("No userId available yet, skipping work experience display.");
    return null;
  }

  const handleSave = async (id: string, updated: WorkExperienceItem) => {
    try {
      const payload = {
        user_id: userId,
        companyName: updated.companyName,
        position: updated.position,
        description: updated.description || "",
        startDate: updated.startDate,
        endDate: updated.endDate || null,
        is_public: updated.is_public ?? false,  
      };

      if (id === "new") {
        await create(payload).unwrap();
      } else {
        await update({ id, ...payload }).unwrap();
      }

      setEditingId(null);
      refetch();
    } catch (err) {
      console.error("Failed saving work experience:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed deleting work experience:", err);
    }
  };

  const handleToggleVisibility = async (id: string | number) => {
    const item = data.find((x: WorkExperienceItem) => x.id === id);

    if (!item || !userId) return;

    const newIsPublic = !item.is_public;
    const payload = {
      id: String(item.id),
      user_id: userId,
      companyName: item.companyName,
      position: item.position,
      description: item.description || "",
      startDate: item.startDate,
      endDate: item.endDate || null,
      is_public: newIsPublic,  // שינוי כאן
    };

    try {
      const res = await update(payload).unwrap();
      console.log("Update response:", res);
      refetch();
    } catch (err) {
      console.error("Failed toggling visibility:", err);
    }
  };

  return (
    <GridContainer maxWidth="lg" gridClasses="" padding="px-4" mt="mt-10" mb="mb-10">
      <div className="space-y-4 w-full">
        <Heading2>ניסיון תעסוקתי</Heading2>

        {data.map((item: WorkExperienceItem) => (
          <EditableListItem<WorkExperienceItem>
            key={item.id}
            itemData={item}
            isEditing={editingId === item.id}
            onEdit={() => setEditingId(item.id)}
            onCancelEdit={() => setEditingId(null)}
            onSave={(id, updated) => void handleSave(String(id), updated)}
            onDelete={(id) => void handleDelete(String(id))}
            onToggleVisibility={(id) => handleToggleVisibility(id)}
            isPubliclyVisible={item.is_public} 
            renderDisplay={(data) => (
              <div>
                <div className="font-semibold">
                  {data.companyName} – {data.position}
                </div>
                <div className="text-sm text-text-secondary">
                  {data.startDate} עד {data.endDate || "היום"}
                </div>
                <p className="mt-1">{data.description}</p>
              </div>
            )}
            renderEditForm={(data, onChange) => (
              <div className="space-y-2">
                <Input
                  value={data.companyName}
                  onChange={(e) => onChange("companyName", e.target.value)}
                  placeholder="שם מקום עבודה"
                />
                <Input
                  value={data.position}
                  onChange={(e) => onChange("position", e.target.value)}
                  placeholder="תפקיד"
                />
                <textarea
                  value={data.description}
                  onChange={(e) => onChange("description", e.target.value)}
                  placeholder="תיאור התפקיד"
                  className="border rounded p-2 w-full"
                />
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={data.startDate}
                    onChange={(e) => onChange("startDate", e.target.value)}
                  />
                  <Input
                    type="date"
                    value={data.endDate ?? ""}
                    onChange={(e) => onChange("endDate", e.target.value)}
                  />
                </div>
              </div>
            )}
          />
        ))}

        {editingId !== "new" && (
          <button
            onClick={() => setEditingId("new")}
            className="text-sm text-primary hover:underline"
          >
            + הוספת מקום עבודה חדש
          </button>
        )}

        {editingId === "new" && (
          <EditableListItem<WorkExperienceItem>
            itemData={{
              id: "new",
              companyName: "",
              position: "",
              description: "",
              startDate: "",
              endDate: "",
              is_public: true,  // שינוי כאן
            }}
            isEditing={true}
            onEdit={() => {}}
            onCancelEdit={() => setEditingId(null)}
            onSave={(id, updated) => void handleSave(String(id), updated)}
            onDelete={() => setEditingId(null)}
            onToggleVisibility={() => {}}
            isPubliclyVisible={true}
            renderDisplay={() => null}
            renderEditForm={(data, onChange) => (
              <div className="space-y-2">
                <Input
                  value={data.companyName}
                  onChange={(e) => onChange("companyName", e.target.value)}
                  placeholder="שם מקום עבודה"
                />
                <Input
                  value={data.position}
                  onChange={(e) => onChange("position", e.target.value)}
                  placeholder="תפקיד"
                />
                <textarea
                  value={data.description}
                  onChange={(e) => onChange("description", e.target.value)}
                  placeholder="תיאור התפקיד"
                  className="border rounded p-2 w-full"
                />
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={data.startDate}
                    onChange={(e) => onChange("startDate", e.target.value)}
                  />
                  <Input
                    type="date"
                    value={data.endDate ?? ""}
                    onChange={(e) => onChange("endDate", e.target.value)}
                  />
                </div>
              </div>
            )}
          />
          
        )}
      </div>
    </GridContainer>
  );
};
