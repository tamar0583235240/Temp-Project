import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
import ForgotPassword from "../../features/auth/components/ForgotPassword";
import LoginForm from "../../features/auth/components/LoginForm";
import SignupForm from "../../features/auth/components/SignupForm";
import DashboardLayout from "../ui/DashboardLayout";
import ResetPassword from "../../features/auth/components/ResetPassword";
import LandingPage from "../../pages/LandingPage";

export default function AppRoutes() {
  return (
    <div dir="rtl">
      <Routes>
        {/* Routes without sidebar */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={
          <RoleProtectedRoute allowedRoles={['student', 'manager']}>
            <ResetPassword />
          </RoleProtectedRoute>} />
        {/* Routes with header */}
        <Route path="/home" element={<HomePage />} />
        <Route element={<DashboardLayout />}>
          <Route
            path="/simulation"
            element={
              <RoleProtectedRoute allowedRoles={['student', 'manager']}>
                <p>Simulation</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['student', 'manager']}>
                <p>Dashboard</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/recordings"
            element={
              <RoleProtectedRoute allowedRoles={['student', 'manager']}>
                <p>Recordings</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/shared"
            element={
              <RoleProtectedRoute allowedRoles={['student', 'manager']}>
                <p>SharedRecordings</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <RoleProtectedRoute allowedRoles={['student', 'manager']}>
                <p>Resources</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/interviewMaterialsHub"
            element={
              <RoleProtectedRoute allowedRoles={['student', 'manager']}>
                <p>InterviewMaterialsHub</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/questions"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <p>AdminQuestions</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <p>AdminUsers</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/resources"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <p>AdminResources</p>
              </RoleProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}