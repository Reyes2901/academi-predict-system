
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import Subjects from "./pages/Subjects";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Participations from "./pages/Participations";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute >
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute allowedRoles={['PROFESOR', 'ADMINISTRATIVO']}>
                <Layout>
                  <Students />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/student/:id" element={
              <ProtectedRoute allowedRoles={['PROFESOR', 'ADMINISTRATIVO']}>
                <Layout>
                  <StudentDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/subjects" element={
              <ProtectedRoute allowedRoles={['PROFESOR', 'ADMINISTRATIVO']}>
                <Layout>
                  <Subjects />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/attendance" element={
              <ProtectedRoute allowedRoles={['PROFESOR', 'ADMINISTRATIVO']}>
                <Layout>
                  <Attendance />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/grades" element={
              <ProtectedRoute allowedRoles={['PROFESOR', 'ADMINISTRATIVO']}>
                <Layout>
                  <Grades />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/participations" element={
              <ProtectedRoute allowedRoles={['PROFESOR', 'ADMINISTRATIVO']}>
                <Layout>
                  <Participations />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={['PROFESOR', 'ADMINISTRATIVO']}>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute allowedRoles={['ADMINISTRATIVO']}>
                <Layout>
                  <div className="p-8 text-center text-gray-500">Gestión de Usuarios - En desarrollo</div>
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/courses" element={
              <ProtectedRoute allowedRoles={['ADMINISTRATIVO']}>
                <Layout>
                  <div className="p-8 text-center text-gray-500">Gestión de Cursos - En desarrollo</div>
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={['ADMINISTRATIVO']}>
                <Layout>
                  <div className="p-8 text-center text-gray-500">Configuración - En desarrollo</div>
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
