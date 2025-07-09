import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
import AdminUser from "../../pages/AdminUser"; 
import Dashboard from '../../pages/dashboard';
import Activity_Monitoring from "../../pages/Activity_Monitoring";
import States from "../../features/activity-Monitoring/hooks/States";
import StatsDashboard from "../../pages/StatsDashboard";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<p>login</p>} />
            <Route path="/simulation" element={
                <RoleProtectedRoute allowedRoles={["student"]}>
                    <p>Simulation</p>
                </RoleProtectedRoute>
            } />
            <Route path="/dashboard" element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
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
               <Route path="/admin/monitoring" element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                {/* {<Activity_Monitoring />} */}
                {<StatsDashboard/>}
                </RoleProtectedRoute>
            } />
        </Routes>
    );
}