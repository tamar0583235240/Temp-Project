import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
import ForgotPassword from "../../features/auth/components/ForgotPassword";
import SignupForm from "../../features/auth/components/SignupForm";
import Dashboard from '../../pages/dashboard';
import DashboardLayout from "../ui/DashboardLayout";
import ResetPassword from "../../features/auth/components/ResetPassword";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import AdminUser from "../../pages/AdminUser"; 
import ProfilePage from "../../pages/ProfilePage";
import SettingsPage from "../../pages/SettingsPage";
import InterviewMaterialsHub from "../../pages/InterviewMaterialsHub";
import InterviewMaterialPage from "../../features/knowledge-base/components/interviewMaterialPage";

export default function AppRoutes() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLogin = !!user;
  return (
    <div dir="rtl">
      <Routes>
        {/* Routes without sidebar */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password"
          element={
              <ResetPassword />
          }
        />
        {/* Routes with header */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/home"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <HomePage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <ProfilePage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <SettingsPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/simulation"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>Simulation</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                    <Dashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/recordings"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>Recordings</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/shared"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>SharedRecordings</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>Resources</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/interviewMaterialsHub"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <InterviewMaterialPage />
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
                    <AdminUser />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/manager/resources"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <p>AdminResources</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/manager/resources"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <p>AdminResources</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/manager/interview-materials"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <InterviewMaterialsHub />
              </RoleProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
