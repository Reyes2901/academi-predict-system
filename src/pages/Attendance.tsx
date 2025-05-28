
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface AttendanceRecord {
  id: string;
  studentName: string;
  studentId: string;
  subject: string;
  date: string;
  status: "presente" | "ausente" | "tardanza";
  time: string;
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: "1",
    studentName: "Ana Martínez",
    studentId: "2023001",
    subject: "Matemáticas",
    date: "2024-01-15",
    status: "presente",
    time: "08:00"
  },
  {
    id: "2",
    studentName: "Carlos López",
    studentId: "2023002",
    subject: "Matemáticas",
    date: "2024-01-15",
    status: "tardanza",
    time: "08:15"
  },
  {
    id: "3",
    studentName: "María González",
    studentId: "2023003",
    subject: "Matemáticas",
    date: "2024-01-15",
    status: "ausente",
    time: "-"
  },
  {
    id: "4",
    studentName: "Pedro Ramírez",
    studentId: "2023004",
    subject: "Lenguaje",
    date: "2024-01-15",
    status: "presente",
    time: "09:00"
  }
];

export default function Attendance() {
  const [attendance] = useState<AttendanceRecord[]>(mockAttendance);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "presente":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "ausente":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "tardanza":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "presente":
        return "bg-green-100 text-green-800";
      case "ausente":
        return "bg-red-100 text-red-800";
      case "tardanza":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const presentCount = attendance.filter(a => a.status === "presente").length;
  const absentCount = attendance.filter(a => a.status === "ausente").length;
  const lateCount = attendance.filter(a => a.status === "tardanza").length;
  const attendanceRate = ((presentCount + lateCount) / attendance.length * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control de Asistencia</h1>
          <p className="text-gray-600">Registra y gestiona la asistencia de estudiantes</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-4 h-4 mr-2" />
          Pasar Lista
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Presentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{presentCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Ausentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div className="text-2xl font-bold text-red-600">{absentCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tardanzas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div className="text-2xl font-bold text-yellow-600">{lateCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">% Asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{attendanceRate}%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registro de Asistencia</CardTitle>
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
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40"
              />
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
                <TableHead>Hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium text-gray-900">
                    {record.studentName}
                  </TableCell>
                  <TableCell className="text-gray-600">{record.studentId}</TableCell>
                  <TableCell className="text-gray-600">{record.subject}</TableCell>
                  <TableCell className="text-gray-600">{record.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {record.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(record.status)}
                        {record.status}
                      </div>
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
