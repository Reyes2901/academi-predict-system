
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, TrendingUp, User, BookOpen, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const mockStudentDetail = {
  id: "1",
  name: "Ana García Martínez",
  email: "ana.garcia@escuela.edu",
  studentId: "2024-001",
  grade: "10º Grado",
  section: "A",
  enrollmentDate: "2024-02-01",
  average: 88,
  attendance: 95,
  participation: 85,
  prediction: "alto" as const,
  phone: "+1 234-567-8900",
  parentContact: "Carmen Martínez - +1 234-567-8901"
};

const performanceHistory = [
  { month: "Ene", promedio: 82, asistencia: 92, participacion: 78 },
  { month: "Feb", promedio: 85, asistencia: 94, participacion: 82 },
  { month: "Mar", promedio: 87, asistencia: 96, participacion: 85 },
  { month: "Abr", promedio: 88, asistencia: 95, participacion: 85 },
  { month: "May", promedio: 90, asistencia: 97, participacion: 88 },
];

const subjectGrades = [
  { subject: "Matemáticas", grade: 92, trend: "up" },
  { subject: "Ciencias", grade: 85, trend: "stable" },
  { subject: "Historia", grade: 90, trend: "up" },
  { subject: "Inglés", grade: 86, trend: "down" },
  { subject: "Ed. Física", grade: 88, trend: "up" },
];

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "alto": return "bg-green-100 text-green-800";
      case "medio": return "bg-yellow-100 text-yellow-800";
      case "bajo": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "📈";
      case "down": return "📉";
      default: return "➡️";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/students")}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Estudiantes
        </Button>
      </div>

      {/* Header del estudiante */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{mockStudentDetail.name}</h1>
                <Badge className={getPredictionColor(mockStudentDetail.prediction)}>
                  Riesgo {mockStudentDetail.prediction}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">ID Estudiante:</span>
                  <div>{mockStudentDetail.studentId}</div>
                </div>
                <div>
                  <span className="font-medium">Grado:</span>
                  <div>{mockStudentDetail.grade} - Sección {mockStudentDetail.section}</div>
                </div>
                <div>
                  <span className="font-medium">Email:</span>
                  <div>{mockStudentDetail.email}</div>
                </div>
                <div>
                  <span className="font-medium">Fecha de ingreso:</span>
                  <div>{new Date(mockStudentDetail.enrollmentDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Promedio General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{mockStudentDetail.average}%</div>
            <p className="text-sm text-gray-500">Excelente rendimiento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{mockStudentDetail.attendance}%</div>
            <p className="text-sm text-gray-500">Muy buena asistencia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Participación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{mockStudentDetail.participation}%</div>
            <p className="text-sm text-gray-500">Participación activa</p>
          </CardContent>
        </Card>
      </div>

      {/* Pestañas de navegación */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "overview" 
              ? "bg-white text-gray-900 shadow-sm" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Resumen
        </button>
        <button
          onClick={() => setActiveTab("performance")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "performance" 
              ? "bg-white text-gray-900 shadow-sm" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Rendimiento
        </button>
        <button
          onClick={() => setActiveTab("predictions")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "predictions" 
              ? "bg-white text-gray-900 shadow-sm" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Predicciones IA
        </button>
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Historial de Rendimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="promedio" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="asistencia" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="participacion" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Calificaciones por Materia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectGrades.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{subject.subject}</span>
                      <span className="text-lg">{getTrendIcon(subject.trend)}</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{subject.grade}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "performance" && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis Detallado de Rendimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={subjectGrades}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="grade" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {activeTab === "predictions" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Predicción de Rendimiento Académico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Pronóstico General: Excelente</h4>
                <p className="text-sm text-green-700">
                  Basado en el análisis de datos históricos, Ana tiene un 92% de probabilidad de mantener o mejorar 
                  su rendimiento académico en los próximos 3 meses.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-medium text-blue-800">Factores Positivos</h5>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Asistencia consistentemente alta (95%+)</li>
                    <li>• Participación activa en clase</li>
                    <li>• Tendencia de mejora en los últimos 3 meses</li>
                    <li>• Fortaleza en materias STEM</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h5 className="font-medium text-yellow-800">Áreas de Atención</h5>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• Leve declive en Inglés (-2 puntos)</li>
                    <li>• Puede beneficiarse de apoyo adicional</li>
                    <li>• Monitorear carga de trabajo</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h5 className="font-medium text-purple-800 mb-2">Recomendaciones IA</h5>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>1. <strong>Continuar estrategias actuales</strong> - El enfoque actual está funcionando bien</li>
                  <li>2. <strong>Refuerzo en Inglés</strong> - Considerar sesiones de apoyo adicionales</li>
                  <li>3. <strong>Desafíos adicionales</strong> - Ana podría beneficiarse de proyectos más complejos</li>
                  <li>4. <strong>Próxima evaluación</strong> - Revisar en 2 semanas para ajustar estrategias</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Acciones rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-4 h-4 mr-2" />
              Tomar Asistencia
            </Button>
            <Button variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Registrar Notas
            </Button>
            <Button variant="outline">
              <User className="w-4 h-4 mr-2" />
              Contactar Padres
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Generar Reporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
