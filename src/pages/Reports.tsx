
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { FileText, Download, TrendingUp, Users, BookOpen, Calendar } from "lucide-react";

const gradeData = [
  { month: "Ene", promedio: 78 },
  { month: "Feb", promedio: 82 },
  { month: "Mar", promedio: 85 },
  { month: "Abr", promedio: 79 },
  { month: "May", promedio: 88 },
  { month: "Jun", promedio: 91 }
];

const subjectData = [
  { subject: "Matemáticas", average: 85 },
  { subject: "Lenguaje", average: 88 },
  { subject: "Ciencias", average: 82 },
  { subject: "Historia", average: 79 },
  { subject: "Arte", average: 92 }
];

const attendanceData = [
  { name: "Presente", value: 85, color: "#22c55e" },
  { name: "Ausente", value: 10, color: "#ef4444" },
  { name: "Tardanza", value: 5, color: "#f59e0b" }
];

const participationData = [
  { type: "Voluntaria", count: 45 },
  { type: "Solicitada", count: 32 },
  { type: "Ejercicio", count: 28 },
  { type: "Pregunta", count: 15 }
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes Académicos</h1>
          <p className="text-gray-600">Análisis estadístico del rendimiento estudiantil</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <FileText className="w-4 h-4 mr-2" />
            Generar Reporte
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Seleccionar periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1er Trimestre</SelectItem>
            <SelectItem value="2">2do Trimestre</SelectItem>
            <SelectItem value="3">3er Trimestre</SelectItem>
            <SelectItem value="anual">Anual</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Todas las materias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="matematicas">Matemáticas</SelectItem>
            <SelectItem value="lenguaje">Lenguaje</SelectItem>
            <SelectItem value="ciencias">Ciencias</SelectItem>
            <SelectItem value="historia">Historia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Promedio General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">84.2</div>
            </div>
            <Badge className="bg-green-100 text-green-800 mt-2">+2.3% vs mes anterior</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Estudiantes Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold text-green-600">156</div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 mt-2">92% asistencia</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Materias Evaluadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">8</div>
            </div>
            <Badge className="bg-purple-100 text-purple-800 mt-2">5 profesores</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Días Lectivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">45</div>
            </div>
            <Badge className="bg-orange-100 text-orange-800 mt-2">de 60 totales</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolución de Promedios</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 95]} />
                <Tooltip />
                <Line type="monotone" dataKey="promedio" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rendimiento por Materia</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[70, 95]} />
                <YAxis dataKey="subject" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="average" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participaciones por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen de Indicadores Clave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Rendimiento Académico</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estudiantes con promedio ≥85:</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estudiantes en riesgo (&lt;70):</span>
                  <span className="font-medium text-red-600">12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasa de aprobación:</span>
                  <span className="font-medium text-green-600">88%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Asistencia</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Asistencia promedio:</span>
                  <span className="font-medium">92.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estudiantes con &gt;95% asistencia:</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Casos de ausentismo crónico:</span>
                  <span className="font-medium text-red-600">3</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Participación</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Participaciones totales:</span>
                  <span className="font-medium">320</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Promedio por estudiante:</span>
                  <span className="font-medium">2.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Calidad promedio:</span>
                  <span className="font-medium text-green-600">Buena</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
