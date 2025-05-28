
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, AlertTriangle, BarChart3, Calendar, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const performanceData = [
  { name: "Matemáticas", promedio: 85, asistencia: 92 },
  { name: "Ciencias", promedio: 78, asistencia: 88 },
  { name: "Historia", promedio: 92, asistencia: 95 },
  { name: "Inglés", promedio: 76, asistencia: 85 },
  { name: "Educación Física", promedio: 89, asistencia: 98 },
];

const riskDistribution = [
  { name: "Bajo Riesgo", value: 65, color: "#10b981" },
  { name: "Riesgo Medio", value: 25, color: "#f59e0b" },
  { name: "Alto Riesgo", value: 10, color: "#ef4444" },
];

const attendanceTrend = [
  { mes: "Ene", asistencia: 92 },
  { mes: "Feb", asistencia: 89 },
  { mes: "Mar", asistencia: 94 },
  { mes: "Abr", asistencia: 91 },
  { mes: "May", asistencia: 93 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard - Aula Inteligente</h1>
          <p className="text-gray-600">Panel de control académico con predicciones IA</p>
        </div>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          Última actualización: Hoy, 10:30 AM
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Estudiantes"
          value="348"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Promedio General"
          value="84.2%"
          icon={TrendingUp}
          trend={{ value: 2.1, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Asistencia Promedio"
          value="92.5%"
          icon={Calendar}
          trend={{ value: -1.2, isPositive: false }}
          color="yellow"
        />
        <StatCard
          title="Predicciones Críticas"
          value="18"
          icon={AlertTriangle}
          trend={{ value: -8, isPositive: true }}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rendimiento por materia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Rendimiento Académico por Materia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="promedio" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tendencia de asistencia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Tendencia de Asistencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="asistencia" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predicciones IA */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Predicciones IA - Rendimiento Académico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Predicción Positiva (78% estudiantes)
              </h4>
              <p className="text-sm text-green-700 mt-2">
                Basado en análisis de asistencia (92%), participación activa y notas anteriores. 
                Se predice mejora o mantenimiento del rendimiento actual.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Atención Requerida (15 estudiantes)
              </h4>
              <p className="text-sm text-yellow-700 mt-2">
                Patrones detectados: baja en asistencia (menor a 85%) y participación decreciente. 
                Recomendación: tutoría personalizada.
              </p>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Riesgo Alto (8 estudiantes)
              </h4>
              <p className="text-sm text-red-700 mt-2">
                Factores críticos: asistencia inferior a 75%, notas en declive por 2+ periodos. 
                Acción inmediata requerida.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Distribución de riesgo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Distribución de Riesgo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas para profesores */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas del Profesor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              <div className="flex items-center gap-2 font-medium text-blue-900 mb-2">
                <FileText className="w-4 h-4" />
                Registrar Notas
              </div>
              <div className="text-sm text-blue-700">Capturar calificaciones del día</div>
            </button>
            <button className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
              <div className="flex items-center gap-2 font-medium text-green-900 mb-2">
                <Calendar className="w-4 h-4" />
                Tomar Asistencia
              </div>
              <div className="text-sm text-green-700">Pasar lista de clases</div>
            </button>
            <button className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
              <div className="flex items-center gap-2 font-medium text-purple-900 mb-2">
                <Users className="w-4 h-4" />
                Registrar Participación
              </div>
              <div className="text-sm text-purple-700">Evaluar participaciones</div>
            </button>
            <button className="p-4 text-left bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors">
              <div className="flex items-center gap-2 font-medium text-orange-900 mb-2">
                <BarChart3 className="w-4 h-4" />
                Ver Predicciones
              </div>
              <div className="text-sm text-orange-700">Análisis predictivo IA</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
