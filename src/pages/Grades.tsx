
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calculator, TrendingUp, Award } from "lucide-react";

interface Grade {
  id: string;
  studentName: string;
  studentId: string;
  subject: string;
  period: string;
  ser: number;
  saber: number;
  hacer: number;
  decidir: number;
  average: number;
  status: "aprobado" | "reprobado" | "regular";
}

const mockGrades: Grade[] = [
  {
    id: "1",
    studentName: "Ana Martínez",
    studentId: "2023001",
    subject: "Matemáticas",
    period: "1er Trimestre",
    ser: 85,
    saber: 88,
    hacer: 82,
    decidir: 90,
    average: 86.3,
    status: "aprobado"
  },
  {
    id: "2",
    studentName: "Carlos López",
    studentId: "2023002",
    subject: "Matemáticas",
    period: "1er Trimestre",
    ser: 70,
    saber: 65,
    hacer: 72,
    decidir: 68,
    average: 68.8,
    status: "regular"
  },
  {
    id: "3",
    studentName: "María González",
    studentId: "2023003",
    subject: "Lenguaje",
    period: "1er Trimestre",
    ser: 95,
    saber: 92,
    hacer: 94,
    decidir: 96,
    average: 94.3,
    status: "aprobado"
  },
  {
    id: "4",
    studentName: "Pedro Ramírez",
    studentId: "2023004",
    subject: "Ciencias",
    period: "1er Trimestre",
    ser: 55,
    saber: 58,
    hacer: 52,
    decidir: 60,
    average: 56.3,
    status: "reprobado"
  }
];

export default function Grades() {
  const [grades] = useState<Grade[]>(mockGrades);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprobado":
        return "bg-green-100 text-green-800";
      case "reprobado":
        return "bg-red-100 text-red-800";
      case "regular":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 85) return "text-green-600";
    if (grade >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const approvedCount = grades.filter(g => g.status === "aprobado").length;
  const failedCount = grades.filter(g => g.status === "reprobado").length;
  const regularCount = grades.filter(g => g.status === "regular").length;
  const averageGrade = (grades.reduce((acc, g) => acc + g.average, 0) / grades.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Notas</h1>
          <p className="text-gray-600">Registra y administra las calificaciones estudiantiles</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calculator className="w-4 h-4 mr-2" />
          Registrar Notas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Aprobados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Reprobados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <div className="text-2xl font-bold text-red-600">{failedCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Regulares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-yellow-600" />
              <div className="text-2xl font-bold text-yellow-600">{regularCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Promedio General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{averageGrade}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registro de Calificaciones</CardTitle>
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
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1er Trimestre</SelectItem>
                  <SelectItem value="2">2do Trimestre</SelectItem>
                  <SelectItem value="3">3er Trimestre</SelectItem>
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
                <TableHead>Ser</TableHead>
                <TableHead>Saber</TableHead>
                <TableHead>Hacer</TableHead>
                <TableHead>Decidir</TableHead>
                <TableHead>Promedio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium text-gray-900">
                    {grade.studentName}
                  </TableCell>
                  <TableCell className="text-gray-600">{grade.studentId}</TableCell>
                  <TableCell className="text-gray-600">{grade.subject}</TableCell>
                  <TableCell className={getGradeColor(grade.ser)}>{grade.ser}</TableCell>
                  <TableCell className={getGradeColor(grade.saber)}>{grade.saber}</TableCell>
                  <TableCell className={getGradeColor(grade.hacer)}>{grade.hacer}</TableCell>
                  <TableCell className={getGradeColor(grade.decidir)}>{grade.decidir}</TableCell>
                  <TableCell>
                    <div className={`font-semibold ${getGradeColor(grade.average)}`}>
                      {grade.average.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(grade.status)}>
                      {grade.status}
                    </Badge>
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
