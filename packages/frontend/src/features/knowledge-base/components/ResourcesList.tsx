import { eType, Resource } from "../types/Resource";
import { ResourceListItem } from "./ResourceListItem";
import { useGetResourcesQuery } from "../../../shared/api/resourcesApi";


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







  const onEdit = (id: number, res: Resource) => {
    console.log(`Edit resource with id: ${id}`);
  };

  const onDelete = (id: number) => {
    console.log(`Delete resource with id: ${id}`);
  };

  const { data: resources, error, isLoading } = useGetResourcesQuery();



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
            <ResourceListItem item={res} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">אין משאבים להצגה כרגע.</p>
      )}
    </section>
  );
};

export default ResourceList;
