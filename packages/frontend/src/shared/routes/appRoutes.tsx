import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
import ForgotPassword from "../../features/auth/components/ForgotPassword";
import SignupForm from "../../features/auth/components/SignupForm";
import DashboardLayout from "../ui/DashboardLayout";
import ResetPassword from "../../features/auth/components/ResetPassword";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import ProfilePage from "../../pages/ProfilePage";
import SettingsPage from "../../pages/SettingsPage";
import InterviewMaterialsHub from "../../pages/InterviewMaterials";
import InterviewMaterialPage from "../../features/knowledge-base/components/interviewMaterialPage";

import InterviewMaterialsView from "../../features/knowledge-base/components/InterviewMaterialsView";
import ProjectsList from "../../features/profile/components/projects";
import { WorkExperienceTab } from "../../features/profile/components/WorkExperienceTab";

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
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Routes with header (DashboardLayout) */}
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
            path="/settings"
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
                <p>Dashboard</p>
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
                <InterviewMaterialsView />
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
                <p>AdminResources</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/manager/interview-materials"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <InterviewMaterialsView />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/personal-projects"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <ProjectsList userId={user?.id ?? ""} />
              </RoleProtectedRoute>
            }
          />
          {/* אם תרצי להוסיף נתיב ל-WorkExperienceTab, הוסיפי כאן */}
          {/* <Route
            path="/work-experience"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <WorkExperienceTab />
              </RoleProtectedRoute>
            }
          /> */}
        </Route>
      </Routes>
    </div>
  );
}
