
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  GraduationCap, 
  MessageSquare, 
  BarChart3, 
  User,
  School,
  Settings,
  LogOut
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    roles: ["PROFESOR", "ADMINISTRATIVO"]
  },
  {
    title: "Estudiantes",
    url: "/students",
    icon: Users,
    roles: ["PROFESOR", "ADMINISTRATIVO"]
  },
  {
    title: "Materias",
    url: "/subjects",
    icon: BookOpen,
    roles: ["PROFESOR", "ADMINISTRATIVO"]
  },
  {
    title: "Asistencia",
    url: "/attendance",
    icon: ClipboardCheck,
    roles: ["PROFESOR", "ADMINISTRATIVO"]
  },
  {
    title: "Calificaciones",
    url: "/grades",
    icon: GraduationCap,
    roles: ["PROFESOR", "ADMINISTRATIVO"]
  },
  {
    title: "Participaciones",
    url: "/participations",
    icon: MessageSquare,
    roles: ["PROFESOR", "ADMINISTRATIVO"]
  },
  {
    title: "Reportes",
    url: "/reports",
    icon: BarChart3,
    roles: ["PROFESOR", "ADMINISTRATIVO"]
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: User,
    roles: ["ADMINISTRATIVO"]
  },
  {
    title: "Cursos",
    url: "/courses",
    icon: School,
    roles: ["ADMINISTRATIVO"]
  },
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
    roles: ["ADMINISTRATIVO"]
  }
]

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const filteredItems = items.filter(item => {
    if (user && (user.rol === "PROFESOR" || user.rol === "ADMINISTRATIVO")) {
      return item.roles.includes(user.rol)
    }
    return false
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-blue-600 mb-4">
            Aula Inteligente
          </SidebarGroupLabel>
          {user && (
            <div className="px-2 py-3 mb-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">
                {user.first_name} {user.last_name}
              </div>
              <div className="text-xs text-blue-600">{user.rol}</div>
            </div>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className="data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700"
                  >
                    <a href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
