import { ResourceListItem } from "./ResourceListItem";
import { useDeleteResourceMutation, useGetResourcesQuery } from "../../../shared/api/resourcesApi";
import { Resource } from "../types/Source"

const ResourceList = () => {
  const { data: resources, error, isLoading } = useGetResourcesQuery();
  const [deleteResource] = useDeleteResourceMutation();


  const handleDelete = async (id: number) => {
    try {
      await deleteResource(id).unwrap();
      console.log('Resource deleted!');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleUpdate = async (id: number, resource: Resource) => {
    try {
      console.log(`Updated: ${id}`);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };



  if (isLoading) return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700"></div>
      <span className="ml-4 text-green-700 font-semibold">טוען נתונים...</span>
    </div>
  )
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
