import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
import LoginForm from "../../features/auth/components/LoginForm";
import SignupForm from "../../features/auth/components/SignupForm";
import AuthRedirect from "../../features/auth/components/AuthRedirect";
import AuthRedirectPage from "../../pages/AuthRedirectPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<AuthRedirectPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/simulation" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Simulation</p></RoleProtectedRoute>} />
            <Route path="/dashboard" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Dashboard </p></RoleProtectedRoute>} />
            <Route path="/recordings" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Recordings</p></RoleProtectedRoute>} />
            <Route path="/shared" element={<RoleProtectedRoute allowedRoles={["student"]}><p>SharedRecordings</p></RoleProtectedRoute>} />
            <Route path="/resources" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Resources</p></RoleProtectedRoute>} />
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
