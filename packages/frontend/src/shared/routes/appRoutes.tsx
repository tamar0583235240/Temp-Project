import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
import AuthRedirect from "../../features/auth/components/AuthRedirect";
import AuthRedirectPage from "../../pages/AuthRedirectPage";
import ForgotPassword from "../../features/auth/components/ForgotPassword";
import ResetPassword from "../../features/auth/components/ResetPassword";
import LoginForm from "../../features/auth/components/LoginForm";
import InterviewMaterialPage from "../../features/knowledge-base/components/interviewMaterialPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<AuthRedirectPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/simulation" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Simulation</p></RoleProtectedRoute>} />
            <Route path="/dashboard" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Dashboard </p></RoleProtectedRoute>} />
            <Route path="/recordings" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Recordings</p></RoleProtectedRoute>} />
            <Route path="/shared" element={<RoleProtectedRoute allowedRoles={["student"]}><p>SharedRecordings</p></RoleProtectedRoute>} />
            <Route path="/resources" element={<RoleProtectedRoute allowedRoles={["student"]}><InterviewMaterialPage /></RoleProtectedRoute>} />
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
