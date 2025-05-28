
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, HandRaised, Target, Plus } from "lucide-react";

interface Participation {
  id: string;
  studentName: string;
  studentId: string;
  subject: string;
  date: string;
  type: "voluntaria" | "solicitada" | "ejercicio" | "pregunta";
  quality: "excelente" | "buena" | "regular" | "deficiente";
  description: string;
  points: number;
}

const mockParticipations: Participation[] = [
  {
    id: "1",
    studentName: "Ana Martínez",
    studentId: "2023001",
    subject: "Matemáticas",
    date: "2024-01-15",
    type: "voluntaria",
    quality: "excelente",
    description: "Resolvió ejercicio de álgebra en la pizarra",
    points: 10
  },
  {
    id: "2",
    studentName: "Carlos López",
    studentId: "2023002",
    subject: "Lenguaje",
    date: "2024-01-15",
    type: "solicitada",
    quality: "buena",
    description: "Leyó párrafo con buena entonación",
    points: 8
  },
  {
    id: "3",
    studentName: "María González",
    studentId: "2023003",
    subject: "Ciencias",
    date: "2024-01-14",
    type: "pregunta",
    quality: "regular",
    description: "Respondió pregunta sobre el sistema solar",
    points: 6
  },
  {
    id: "4",
    studentName: "Pedro Ramírez",
    studentId: "2023004",
    subject: "Historia",
    date: "2024-01-14",
    type: "ejercicio",
    quality: "excelente",
    description: "Presentó línea de tiempo detallada",
    points: 10
  }
];

export default function Participations() {
  const [participations] = useState<Participation[]>(mockParticipations);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "voluntaria":
        return <HandRaised className="w-4 h-4 text-green-600" />;
      case "solicitada":
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case "ejercicio":
        return <Target className="w-4 h-4 text-purple-600" />;
      case "pregunta":
        return <MessageSquare className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excelente":
        return "bg-green-100 text-green-800";
      case "buena":
        return "bg-blue-100 text-blue-800";
      case "regular":
        return "bg-yellow-100 text-yellow-800";
      case "deficiente":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "voluntaria":
        return "bg-green-100 text-green-800";
      case "solicitada":
        return "bg-blue-100 text-blue-800";
      case "ejercicio":
        return "bg-purple-100 text-purple-800";
      case "pregunta":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const voluntaryCount = participations.filter(p => p.type === "voluntaria").length;
  const requestedCount = participations.filter(p => p.type === "solicitada").length;
  const exerciseCount = participations.filter(p => p.type === "ejercicio").length;
  const averagePoints = (participations.reduce((acc, p) => acc + p.points, 0) / participations.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Registro de Participaciones</h1>
          <p className="text-gray-600">Gestiona las participaciones de estudiantes en clase</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Participación
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Voluntarias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <HandRaised className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{voluntaryCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Solicitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{requestedCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Ejercicios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{exerciseCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Promedio Puntos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div className="text-2xl font-bold text-yellow-600">{averagePoints}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registro de Participaciones</CardTitle>
            <div className="flex items-center gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Seleccionar materia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matematicas">Matemáticas</SelectItem>
                  <SelectItem value="lenguaje">Lenguaje</SelectItem>
                  <SelectItem value="ciencias">Ciencias</SelectItem>
                  <SelectItem value="historia">Historia</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="voluntaria">Voluntaria</SelectItem>
                  <SelectItem value="solicitada">Solicitada</SelectItem>
                  <SelectItem value="ejercicio">Ejercicio</SelectItem>
                  <SelectItem value="pregunta">Pregunta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Materia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Calidad</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Puntos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participations.map((participation) => (
                <TableRow key={participation.id}>
                  <TableCell className="font-medium text-gray-900">
                    {participation.studentName}
                  </TableCell>
                  <TableCell className="text-gray-600">{participation.studentId}</TableCell>
                  <TableCell className="text-gray-600">{participation.subject}</TableCell>
                  <TableCell className="text-gray-600">{participation.date}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(participation.type)}>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(participation.type)}
                        {participation.type}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getQualityColor(participation.quality)}>
                      {participation.quality}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {participation.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {participation.points}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
