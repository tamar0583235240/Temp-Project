import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
import ForgotPassword from "../../features/auth/components/ForgotPassword";
import SignupForm from "../../features/auth/components/SignupForm";
import DashboardLayout from "../ui/DashboardLayout";
import ResetPassword from "../../features/auth/components/ResetPassword";
import LoginPage from "../../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute"; // 👈 יצטרך להיות אצלך
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import ProfilePage from "../../pages/ProfilePage";
import SettingsPage from "../../pages/SettingsPage";

export default function AppRoutes() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLogin = !!user;
  return (
    <div dir="rtl">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <ProfilePage/>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <SettingsPage/>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/simulation"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>סימולציה</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>דשבורד</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/recordings"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>הקלטות</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/shared"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>שיתוף הקלטות</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>משאבים</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/interviewMaterialsHub"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>InterviewMaterialsHub</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/questions"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <p>ניהול שאלות</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <p>ניהול משתמשים</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/resources"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <p>ניהול משאבים</p>
              </RoleProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
