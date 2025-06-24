import React from 'react';

const DownloadCard: React.FC = () => {
    const title = "קובץ לדוגמה";
    const description = "זהו קובץ PDF מובנה שניתן לצפות בו או להוריד אותו";
    const fileUrl = "/example.pdf";

    const handleView = () => {
        window.open(fileUrl, '_blank');
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop() || 'download';
        link.click();
    };

    return (
        <div style={styles.card}>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div style={styles.buttons}>
                <button onClick={handleView}>צפייה</button>
                <button onClick={handleDownload}>הורדה</button>
            </div>
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
