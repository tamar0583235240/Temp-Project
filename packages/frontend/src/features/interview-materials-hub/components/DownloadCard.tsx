// import React from 'react';
// import { interview_materials_subType } from '../types/interview_materials_subType';
// import { useGetAllMaterialsQuery,useUpdateDownloadsCountMutation } from '../store/interviewMaterialSubApi';

// const DownloadCard: React.FC = () => {
//   const { data: files = [], isLoading, isError } = useGetAllMaterialsQuery();
//     const [incrementDownloadCount] = useUpdateDownloadsCountMutation();
// const id:string="1"
// console.log('files', files);
// console.log("tamiiii");

//   const handleView = (fileUrl: string) => {
//     if (!fileUrl) {
//       alert('הקובץ לא זמין לצפייה');
//       return;
//     }
//     window.open(fileUrl, '_blank');
//   };

//   const handleDownload = (fileUrl: string) => {

//     if (!fileUrl) {
//       alert('הקובץ לא זמין להורדה');



"use client"

import type React from "react"
import { Download, Eye, Search } from "lucide-react"
import { Button } from "../../../shared/ui/button"
import { GridContainer } from "../../../shared/ui/GridContainer"
import { IconWrapper } from "../../../shared/ui/IconWrapper"
import type { interview_materials_subType } from "../../../features/interview-materials-hub/types/interview_materials_subType"
import { useUpdateDownloadsCountMutation } from "../../../features/interview-materials-hub/store/interviewMaterialSubApi"

type Props = {
  files: interview_materials_subType[]
  isLoading: boolean
  isError: boolean
  hasSearched: boolean
  didSearch: boolean
}

const DownloadCard: React.FC<Props> = ({ files, isLoading, isError, hasSearched, didSearch }) => {
  const [incrementDownloadCount] = useUpdateDownloadsCountMutation()

  const handleView = (fileUrl: string) => {
    if (!fileUrl) {
      alert("הקובץ לא זמין לצפייה")
      return
    }
    window.open(fileUrl, "_blank")
  }

  const handleDownload = (fileUrl: string, materialId: string) => {
    if (!fileUrl) {
      alert("הקובץ לא זמין להורדה")
      return
    }

    const link = document.createElement("a")
    link.href = fileUrl
    link.download = fileUrl.split("/").pop() || "download"
    link.click()

    incrementDownloadCount({ id: materialId }) // עדכון ב־DB
  }

  if (isLoading) {
    return (
      <GridContainer maxWidth="xl">
        <div className="text-center py-16">
          <IconWrapper size="lg" color="muted" className="mb-4 mx-auto">
            <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div>
          </IconWrapper>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">טוען חומרי ריאיון...</h3>
          <p className="text-gray-500">אנא המתן בזמן שאנחנו טוענים את החומרים</p>
        </div>
      </GridContainer>
    )
  }

  if (isError) {
    return (
      <GridContainer maxWidth="xl">
        <div className="text-center py-16">
          <IconWrapper size="lg" color="danger" className="mb-4 mx-auto">
            <span className="text-2xl">⚠️</span>
          </IconWrapper>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">אירעה שגיאה</h3>
          <p className="text-gray-500">אירעה שגיאה בטעינת הקבצים. אנא נסה שוב מאוחר יותר</p>
        </div>
      </GridContainer>
    )
  }

  return (
    <GridContainer maxWidth="xl">
      {!hasSearched && files.length === 0 ? (
        // Initial state - before any search
        <div className="text-center py-16">
          <IconWrapper size="lg" color="muted" className="mb-4 mx-auto">
            <Search className="h-8 w-8" />
          </IconWrapper>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">התחל לחפש חומרי ריאיון</h3>
          <p className="text-gray-500">השתמש בשדה החיפוש למעלה כדי למצוא את החומרים המתאימים לך</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {didSearch ? `תוצאות חיפוש (${files.length})` : `כל החומרים (${files.length})`}
            </h2>
          </div>

          {files.length === 0 ? (
            // No results found
            <div className="text-center py-16">
              <IconWrapper size="lg" color="muted" className="mb-4 mx-auto">
                <Search className="h-8 w-8" />
              </IconWrapper>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">לא נמצאו תוצאות</h3>
              <p className="text-gray-500">נסה לחפש במילות מפתח אחרות</p>
            </div>
          ) : (
            // Results grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="bg-white shadow-sm hover:shadow-lg transition-all duration-200 border-0 hover:border-primary/20 overflow-hidden rounded-xl border border-gray-200"
                >
                  <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {file.thumbnail ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={file.thumbnail||"📖"}
                            alt={file.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              // const target = e.target as HTMLImageElement
                              // target.src = "❔"
                            }}
                          />
                        </div>
                      ) : (
                        <IconWrapper size="md" color="muted" className="flex-shrink-0">
                          <span className="text-lg">📄</span>
                        </IconWrapper>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-relaxed">{file.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">{file.short_description}</p>
<p> ⬇️  {file.downloads_count} התקנות</p>
                    {/* File availability warning */}
                    {!file.thumbnail && (
                      <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-xs">❌ הקובץ לא נמצא</p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="primary-dark"
                        fullWidth
                        icon={<Download className="h-4 w-4" />}
                        iconPosition="right"
                        onClick={() => handleDownload(file.thumbnail, file.id)}
                        disabled={!file.thumbnail}
                      >
                        הורד
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        fullWidth
                        icon={<Eye className="h-4 w-4 bg-transparent" />}
                        iconPosition="right"
                        onClick={() => handleView(file.thumbnail)}
                        disabled={!file.thumbnail}
                      >
                        צפה
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </GridContainer>
  )
}

export default DownloadCard
