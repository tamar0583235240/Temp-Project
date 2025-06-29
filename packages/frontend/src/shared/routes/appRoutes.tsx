import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
<<<<<<< HEAD
import InterviewMaterialsHub from "../../pages/InterviewMaterialsHub"
=======
import AdminUser from "../../pages/AdminUser"; 
import Dashboard from '../../pages/dashboard';
>>>>>>> c5a53020e0f4b61e85d00beade7884b0f66120e1

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<p>login</p>} />
<<<<<<< HEAD
            <Route path="/simulation" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Simulation</p></RoleProtectedRoute>} />
            <Route path="/dashboard" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Dashboard </p></RoleProtectedRoute>} />
            <Route path="/recordings" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Recordings</p></RoleProtectedRoute>} />
            <Route path="/shared" element={<RoleProtectedRoute allowedRoles={["student"]}><p>SharedRecordings</p></RoleProtectedRoute>} />
            <Route path="/resources" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Resources</p></RoleProtectedRoute>} />
            <Route path="/InterviewMaterialsHub" element={<RoleProtectedRoute allowedRoles={["student"]}><InterviewMaterialsHub /></RoleProtectedRoute>} />

=======
            <Route path="/simulation" element={
                <RoleProtectedRoute allowedRoles={["student"]}>
                    <p>Simulation</p>
                </RoleProtectedRoute>
            } />
            <Route path="/dashboard" element={
                <RoleProtectedRoute allowedRoles={["student"]}>
                    <Dashboard />
                </RoleProtectedRoute>
            } />
            <Route path="/recordings" element={
                <RoleProtectedRoute allowedRoles={["student"]}>
                    <p>Recordings</p>
                </RoleProtectedRoute>
            } />
            <Route path="/shared" element={
                <RoleProtectedRoute allowedRoles={["student"]}>
                    <p>SharedRecordings</p>
                </RoleProtectedRoute>
            } />
            <Route path="/resources" element={
                <RoleProtectedRoute allowedRoles={["student"]}>
                    <p>Resources</p>
                </RoleProtectedRoute>
            } />
>>>>>>> c5a53020e0f4b61e85d00beade7884b0f66120e1
            <Route path="/admin/questions" element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                    <p>AdminQuestions</p>
                </RoleProtectedRoute>
            } />
            <Route path="/admin/users" element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                    <AdminUser />
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