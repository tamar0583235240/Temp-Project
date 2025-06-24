import { eType, Resource } from "../types/Resource";
import { ResourceListItem } from "./ResourceListItem";
import { useDeleteResourceMutation, useGetResourcesQuery, useUpdateResourceMutation } from "../../../shared/api/resourcesApi";


const ResourceList = () => {
  const resourceList: Resource[] = [
    {
      id: 1,
      title: "מדריך שימוש",
      type: eType.text,
      description: "הסבר קצר על המערכת",
      fileUrl: "https://example.com/resource.pdf",
      createdAt: new Date(2024, 5, 23, 10, 30, 0),
    },
    {
      id: 2,
      title: "מסמך הוראות",
      type: eType.pdf,
      description: "מסמך עם הנחיות נוספות",
      fileUrl: "https://example.com/instructions.pdf",
      createdAt: new Date(2024, 6, 1, 15, 45, 0),
    },
    {
      id: 2,
      title: "מסמך הוראות",
      type: eType.pdf,
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
      alert('Resource deleted!');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleUpdate = async (resource,id) => {
    try {
      const updated = await updateResource({ ...resource, id}).unwrap();
      alert(`Updated: ${updated.resource.name}`);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };



  // if (isLoading) return <div>טוען...</div>;
  // if (error) return <div>שגיאה בטעינת המשאבים</div>;
  return (
    <section dir="rtl" className="mt-6 space-y-4 px-4">
      <h2 className="text-xl font-bold text-green-700 mb-2">רשימת משאבים</h2>

      {resourceList && resourceList.length > 0 ? (
        resourceList.map((res) => (
          <div
            key={res.id}
            className="bg-white border border-gray-200 p-4 rounded-2xl shadow hover:shadow-lg transition"          >
            <ResourceListItem item={res} onEdit={handleUpdate} onDelete={handleDelete} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">אין משאבים להצגה כרגע.</p>
      )}
    </section>
  );
};

export default ResourceList;
