import React from 'react';
import { interview_materials_subType } from '../types/interview_materials_subType';
import { useGetAllMaterialsQuery,useUpdateDownloadsCountMutation } from '../store/interviewMaterialSubApi';

const DownloadCard: React.FC = () => {
  const { data: files = [], isLoading, isError } = useGetAllMaterialsQuery();
    const [incrementDownloadCount] = useUpdateDownloadsCountMutation();
const id:string="1"
console.log('files', files);
console.log("tamiiii");

  const handleView = (fileUrl: string) => {
    if (!fileUrl) {
      alert('הקובץ לא זמין לצפייה');
      return;
    }
    window.open(fileUrl, '_blank');
  };

  const handleDownload = (fileUrl: string) => {

    if (!fileUrl) {
      alert('הקובץ לא זמין להורדה');
      return;
    }
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || 'download';
    link.click();
    incrementDownloadCount({ id }); // עדכון ב־DB

  };

  if (isLoading) return <p>טוען קבצים...</p>;
  if (isError) return <p>אירעה שגיאה בטעינת הקבצים.</p>;
console.log('files', files);

  return (
    <div>
      {files.map((file, index) => (
        <div key={index} style={styles.card}>
          <div>
            <h3>{file.title}</h3>
            <p>{file.short_description}</p>

            {/* הכפתורים תמיד מוצגים */}
            <div style={styles.buttons}>
              <button onClick={() => handleView(file.thumbnail)}>צפייה</button>
              <button onClick={() => handleDownload(file.thumbnail)}>הורדה</button>
            </div>

            {/* אם אין thumbnail נציג אזהרה */}
            {!file.thumbnail && (
              <p style={{ color: 'red' }}>❌ הקובץ לא נמצא</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};




const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    direction: 'rtl',
  } as React.CSSProperties,
  buttons: {
    display: 'flex',
    gap: '10px',
  } as React.CSSProperties,
};

export default DownloadCard;
