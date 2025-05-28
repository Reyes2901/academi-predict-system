
import { useState } from "react";
import { StudentCard } from "@/components/StudentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockStudents = [
  {
    id: "1",
    name: "Ana García Martínez",
    email: "ana.garcia@escuela.edu",
    average: 88,
    attendance: 95,
    participation: 85,
    prediction: "alto" as const,
    lastActivity: "Hace 2 horas"
  },
  {
    id: "2",
    name: "Carlos Rodríguez López",
    email: "carlos.rodriguez@escuela.edu",
    average: 72,
    attendance: 78,
    participation: 65,
    prediction: "medio" as const,
    lastActivity: "Ayer"
  },
  {
    id: "3",
    name: "María Fernández Ruiz",
    email: "maria.fernandez@escuela.edu",
    average: 95,
    attendance: 98,
    participation: 92,
    prediction: "alto" as const,
    lastActivity: "Hace 1 hora"
  },
  {
    id: "4",
    name: "Diego Morales Castro",
    email: "diego.morales@escuela.edu",
    average: 58,
    attendance: 65,
    participation: 45,
    prediction: "bajo" as const,
    lastActivity: "Hace 3 días"
  },
  {
    id: "5",
    name: "Sofia Herrera Vega",
    email: "sofia.herrera@escuela.edu",
    average: 76,
    attendance: 82,
    participation: 78,
    prediction: "medio" as const,
    lastActivity: "Hace 5 horas"
  },
  {
    id: "6",
    name: "Andrés Jiménez Peña",
    email: "andres.jimenez@escuela.edu",
    average: 91,
    attendance: 93,
    participation: 89,
    prediction: "alto" as const,
    lastActivity: "Hace 30 min"
  }
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState("todos");
  const navigate = useNavigate();

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRisk === "todos" || student.prediction === filterRisk;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Estudiantes</h1>
          <p className="text-gray-600">Administra y monitorea el progreso académico</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Estudiante
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterRisk} onValueChange={setFilterRisk}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por riesgo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los niveles</SelectItem>
            <SelectItem value="bajo">Riesgo Bajo</SelectItem>
            <SelectItem value="medio">Riesgo Medio</SelectItem>
            <SelectItem value="alto">Riesgo Alto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-900">{filteredStudents.length}</div>
          <div className="text-sm text-gray-500">Estudiantes mostrados</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {filteredStudents.filter(s => s.prediction === "alto").length}
          </div>
          <div className="text-sm text-gray-500">Bajo riesgo</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {filteredStudents.filter(s => s.prediction === "medio").length}
          </div>
          <div className="text-sm text-gray-500">Riesgo medio</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-red-600">
            {filteredStudents.filter(s => s.prediction === "bajo").length}
          </div>
          <div className="text-sm text-gray-500">Alto riesgo</div>
        </div>
      </div>

      {/* Lista de estudiantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No se encontraron estudiantes</div>
          <div className="text-gray-500">Intenta ajustar los filtros de búsqueda</div>
        </div>
      )}
    </div>
  );
}
