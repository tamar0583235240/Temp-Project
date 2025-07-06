import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/homePage";
import { RecordingsList } from "../../features/recordings/components/recordingsList";
import SharedRecordingsPage from "../../pages/SharedRecordingsPage";
// import SharedRecordingDetailsPage from "../../pages/SharedRecordingDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<p>login</p>} />
      
      {/* זמנית: הסרנו הגנות */}
      <Route path="/simulation" element={<p>Simulation</p>} />
      <Route path="/dashboard" element={<p>Dashboard</p>} />
      <Route path="/recordings" element={<RecordingsList />} />
      <Route path="/shared" element={<SharedRecordingsPage />} />
      {/* <Route path="/shared/:recordingId" element={<SharedRecordingDetailsPage />} /> */}
      <Route path="/resources" element={<p>Resources</p>} />
      <Route path="/admin/questions" element={<p>AdminQuestions</p>} />
      <Route path="/admin/users" element={<p>AdminUsers</p>} />
      <Route path="/admin/resources" element={<p>AdminResources</p>} />
    </Routes>
  );
}
