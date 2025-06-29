import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer } from "lucide-react";
import { Button } from "../../../shared/ui/button";


interface CertificateProps {
  fullName: string;
}

export const Certificate: React.FC<CertificateProps> = ({ fullName }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [showCertificate, setShowCertificate] = useState(false);

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
    <>
      {!showCertificate && (
        <div className="flex justify-center">
          {/* <Button variant="primary-dark" size="lg" onClick={() => setShowCertificate(true)}>
            התעודה שלי
          </Button> */}
          <Button variant="primary-dark" size="lg" onClick={() => setShowCertificate(true)}>
            התעודה שלי
          </Button>

        </div>
      )}

      {showCertificate && (
        <div
          ref={certificateRef}
          className="relative max-w-3xl mx-auto p-8 rounded-xl border border-[--color-primary]/30 bg-[--color-background] text-center space-y-6 shadow-lg"
        >
          <div className="absolute top-4 left-4 flex gap-2">
            <Button icon={<Download size={16} />} size="sm" onClick={handleDownload} />
            <Button icon={<Printer size={16} />} size="sm" onClick={handlePrint} />
          </div>

          <h1 className="text-3xl font-bold text-[--color-primary-dark] mb-2">
            תעודת הצטיינות
          </h1>
          <p className="text-lg text-[--color-text]">מוענקת ל־</p>
          <h2 className="text-xl font-semibold text-[--color-primary]">{fullName}</h2>
          <p className="text-[--color-secondary-text] mt-4 leading-relaxed">
            על הישגים יוצאי דופן, התמדה ומצוינות בלימודים. אנו מוקירים אותך ומאחלים המשך הצלחה.
          </p>

          <div className="mt-8 flex justify-between text-sm text-[--color-secondary-text] px-6">
            <span>חתימה</span>
            <span>{new Date().toLocaleDateString("he-IL")}</span>
          </div>
        </div>
      )}
    </>
  );
};
