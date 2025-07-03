import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
import ForgotPassword from "../../features/auth/components/ForgotPassword";
import LoginForm from "../../features/auth/components/LoginForm";
import SignupForm from "../../features/auth/components/SignupForm";
import DashboardLayout from "../ui/DashboardLayout";
import ResetPassword from "../../features/auth/components/ResetPassword";
import { CreateInterviewMaterialsSubForm } from "../../features/knowledge-base/components/CreateInterviewMaterialsSubForm";
import InterviewMaterialPage from "../../features/knowledge-base/components/InterviewMaterialPage";
import LoginPage from "../../pages/LoginPage";

export default function AppRoutes() {
  return (
  <div dir="rtl">
    <Routes>
      {/* Routes without sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Routes with sidebar */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/simulation"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <p>Simulation</p>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <p>Dashboard</p>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/recordings"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <p>Recordings</p>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/shared"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <p>SharedRecordings</p>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <p>Resources</p>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/interviewMaterialsHub"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <p>InterviewMaterialsHub</p>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/manager/questions"
          element={
            <RoleProtectedRoute allowedRoles={["manager"]}>
              <p>AdminQuestions</p>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/manager/users"
          element={
            <RoleProtectedRoute allowedRoles={["manager"]}>
              <p>AdminUsers</p>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/manager/resources"
          element={
            <RoleProtectedRoute allowedRoles={["manager"]}>
              {/* <p>AdminResources</p> */}
              <InterviewMaterialPage />
            </RoleProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </div>
  );
}
