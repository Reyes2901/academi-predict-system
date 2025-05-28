import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import Subjects from "./pages/Subjects";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Participations from "./pages/Participations";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/student/:id" element={<StudentDetail />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/participations" element={<Participations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<div className="p-8 text-center text-gray-500">Gestión de Usuarios - En desarrollo</div>} />
            <Route path="/courses" element={<div className="p-8 text-center text-gray-500">Gestión de Cursos - En desarrollo</div>} />
            <Route path="/settings" element={<div className="p-8 text-center text-gray-500">Configuración - En desarrollo</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
