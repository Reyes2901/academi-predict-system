
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
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
  Settings
} from "lucide-react"
import { useLocation } from "react-router-dom"

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
  // Simulating user role - in real app this would come from auth context
  const userRole = "PROFESOR" // This should come from your auth system
  
  const filteredItems = items.filter(item => {
    if (userRole === "PROFESOR" || userRole === "ADMINISTRATIVO") {
      return item.roles.includes(userRole)
    }
    return false
  })

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-blue-600 mb-4">
            Aula Inteligente
          </SidebarGroupLabel>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
