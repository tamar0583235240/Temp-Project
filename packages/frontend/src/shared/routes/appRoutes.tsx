import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
<<<<<<< HEAD
import Simulation from "../../features/interview/components/Simulation";
import Summary from '../../features/interview/components/Summary';
import InterviewComponent from "../../features/interview/components/interviewComponent";
=======
import InterviewPage from "../../pages/InterviewPage";
>>>>>>> 073ccf05cc991ecf25b86591561f47d7b57a9ca1

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<p>login</p>} />
<<<<<<< HEAD
            <Route path="/simulation" element={<RoleProtectedRoute allowedRoles={["student"]}><Simulation /></RoleProtectedRoute>} />
            <Route path="/summary" element={<RoleProtectedRoute allowedRoles={["student"]}><Summary /></RoleProtectedRoute>} />
=======
            <Route path="/simulation" element={
                <RoleProtectedRoute allowedRoles={["student"]}><InterviewPage /></RoleProtectedRoute>} />
>>>>>>> 073ccf05cc991ecf25b86591561f47d7b57a9ca1
            <Route path="/dashboard" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Dashboard </p></RoleProtectedRoute>} />
            <Route path="/recordings" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Recordings</p></RoleProtectedRoute>} />
            <Route path="/shared" element={<RoleProtectedRoute allowedRoles={["student"]}><p>SharedRecordings</p></RoleProtectedRoute>} />
            <Route path="/resources" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Resources</p></RoleProtectedRoute>} />
            {/* <Route path="/certificate" element={<CertificatePage />} /> */}
            <Route path="/admin/questions" element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                    <p>AdminQuestions</p>
                </RoleProtectedRoute>
            } />
            <Route path="/admin/users" element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                    <p>AdminUsers</p>
                </RoleProtectedRoute>
            } />
            <Route path="/admin/resources" element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                    <p>AdminResources</p>
                </RoleProtectedRoute>
            } />
        </Routes>
    );
}
