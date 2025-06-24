import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer } from "lucide-react";
import { useUserStore } from "../store/progressSlice";

interface CertificateProps {
  fullName: string;
}

export const ImprovementSuggestions: React.FC<CertificateProps> = ({ fullName }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { answered, total } = useUserStore();
  const [showCertificate, setShowCertificate] = useState(false);

  const isComplete = answered === total && total > 0;

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    const canvas = await html2canvas(certificateRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("certificate.pdf");
  };

  const handlePrint = () => {
    if (!certificateRef.current) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head><title>הדפסת תעודה</title></head>
        <body dir="rtl" onload="window.print(); window.close();">
          ${certificateRef.current.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      {/* כפתור הצגת תעודה */}
      {isComplete && !showCertificate && (
        <button
          onClick={() => setShowCertificate(true)}
          className="py-2 px-5 rounded font-bold text-white bg-yellow-500 hover:bg-yellow-600 transition"
        >
          הצג תעודה
        </button>
      )}

      {/* תעודה */}
      {showCertificate && (
        <div
          ref={certificateRef}
          className="border-4 border-yellow-500 bg-white p-10 rounded-xl shadow-2xl w-[700px] text-center relative"
        >
          {/* כפתור הורדה */}
          <button
            onClick={handleDownload}
            title="הורד תעודה"
            className="absolute top-4 right-4 text-gray-600 hover:text-green-600"
          >
            <Download size={24} />
          </button>

          {/* כפתור הדפסה */}
          <button
            onClick={handlePrint}
            title="הדפס תעודה"
            className="absolute top-4 right-14 text-gray-600 hover:text-blue-600"
          >
            <Printer size={24} />
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">תעודת הצטיינות</h1>
          <p className="text-lg text-gray-700 mb-6">מוענקת ל־</p>
          <h2 className="text-2xl font-semibold text-green-700 mb-6">{fullName}</h2>
          <p className="text-gray-600 text-md">
            על הישגים יוצאי דופן, התמדה ומצוינות בלימודים.
          </p>
          <div className="mt-10 flex justify-between text-sm text-gray-500 px-4">
            <div>חתימה</div>
            <div>{new Date().toLocaleDateString("he-IL")}</div>
          </div>
        </div>
      )}
    </div>
  );
};
