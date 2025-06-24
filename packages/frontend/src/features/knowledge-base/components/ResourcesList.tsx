import { ResourceListItem } from "./ResourceListItem";
import { useDeleteResourceMutation, useGetResourcesQuery, useUpdateResourceMutation } from "../../../shared/api/resourcesApi";
import{Resource,eFileType} from "../types/Source"

const ResourceList = () => {
  const resourceList: Resource[] = [
    {
      id: 1,
      title: "מדריך שימוש",
      type: eFileType.text,
      description: "הסבר קצר על המערכת",
      fileUrl: "https://example.com/resource.pdf",
      createdAt: new Date(2024, 5, 23, 10, 30, 0),
    },
    {
      id: 2,
      title: "מסמך הוראות",
      type: eFileType.pdf,
      description: "מסמך עם הנחיות נוספות",
      fileUrl: "https://example.com/instructions.pdf",
      createdAt: new Date(2024, 6, 1, 15, 45, 0),
    },
    {
      id: 2,
      title: "מסמך הוראות",
      type: eFileType.pdf,
      description: "מסמך עם הנחיות נוספות",
      fileUrl: "https://example.com/instructions.pdf",
      createdAt: new Date(2024, 6, 1, 15, 45, 0),
    }
  ];



  const { data: resources, error, isLoading } = useGetResourcesQuery();
  const [deleteResource] = useDeleteResourceMutation();
  const [updateResource] = useUpdateResourceMutation();


 const handleDelete = async (id: number) => {
    try {
      await deleteResource(id).unwrap();
      console.log('Resource deleted!');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleUpdate = async (id:number,resource:Resource) => {
    try {
      console.log(`Updated: ${id}`);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };



  if (isLoading) return <div>טוען...</div>;
  if (error) return <div>שגיאה בטעינת המשאבים</div>;
  return (
    <section dir="rtl" className="mt-6 space-y-4 px-4">
      <h2 className="text-xl font-bold text-green-700 mb-2 •	text-4xl md:text-5xl">רשימת משאבים</h2>

      {resources && resources.length > 0 ? (
        resources.map((res) => (
          <div
            key={res.id}
            className="bg-white border border-gray-200 p-4 rounded-2xl shadow hover:shadow-lg transition"          >
            <ResourceListItem item={res} onEdit={handleUpdate} onDelete={handleDelete} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">אין ען להצגה כרגע.</p>
      )}
    </section>
  );
};

export default ResourceList;
