// import React from 'react';

// const DownloadCard: React.FC = () => {
//     const title = "קובץ לדוגמה";
//     const description = "זהו קובץ PDF מובנה שניתן לצפות בו או להוריד אותו";
//     const fileUrl = "/example.pdf";

//     const handleView = () => {
//         window.open(fileUrl, '_blank');
//     };

//     const handleDownload = () => {
//         const link = document.createElement('a');
//         link.href = fileUrl;
//         link.download = fileUrl.split('/').pop() || 'download';
//         link.click();
//     };

//     return (
//         <div style={styles.card}>
//             <div>
//                 <h3>{title}</h3>
//                 <p>{description}</p>
//             </div>
//             <div style={styles.buttons}>
//                 <button onClick={handleView}>צפייה</button>
//                 <button onClick={handleDownload}>הורדה</button>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     card: {
//         border: '1px solid #ccc',
//         padding: '12px',
//         borderRadius: '8px',
//         marginBottom: '10px',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         direction: 'rtl',
//     } as React.CSSProperties,
//     buttons: {
//         display: 'flex',
//         gap: '10px',
//     } as React.CSSProperties,
// };

// export default DownloadCard;
import React from 'react';

// רשימת קבצים לדוגמה
const files = [
    {
        title: "קובץ לדוגמה 1",
        description: "PDF תקין להורדה או צפייה",
        fileUrl: "/example1.pdf"
    },
    {
        title: "קובץ לא קיים",
        description: "הקובץ הוסר או אינו זמין",
        fileUrl: "" // סימון לקובץ חסר
    },
    {
        title: "קובץ לדוגמה 2",
        description: "עוד קובץ שניתן להוריד",
        fileUrl: "/example2.pdf"
    }
];

const DownloadList: React.FC = () => {
    const handleView = (fileUrl: string) => {
        if (!fileUrl) {
            alert("הקובץ לא זמין לצפייה");
            return;
        }
        window.open(fileUrl, '_blank');
    };

    const handleDownload = (fileUrl: string) => {
        if (!fileUrl) {
            alert("הקובץ לא זמין להורדה");
            return;
        }
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop() || 'download';
        link.click();
    };

    return (
        <div>
            {files.map((file, index) => (
                <div key={index} style={styles.card}>
                    <div>
                        <h3>{file.title}</h3>
                        <p>{file.description}</p>
                        {!file.fileUrl && (
                            <p style={{ color: 'red' }}>❌ הקובץ לא נמצא</p>
                        )}
                    </div>
                    <div style={styles.buttons}>
                        <button onClick={() => handleView(file.fileUrl)}>צפייה</button>
                        <button onClick={() => handleDownload(file.fileUrl)}>הורדה</button>
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

export default DownloadList;
